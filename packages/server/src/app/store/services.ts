import type { Service } from "@app/types/services";
import yaml from "js-yaml";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "localhost-admin-services";

function loadServices(): Service[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveServices(services: Service[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
}

export function useServices() {
  const [services, setServices] = useState<Service[]>(loadServices);

  useEffect(() => {
    saveServices(services);
  }, [services]);

  const addService = useCallback((service: Service) => {
    setServices((prev) => [...prev, service]);
  }, []);

  const updateService = useCallback((id: string, updates: Partial<Service>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? ({ ...s, ...updates } as Service) : s)));
  }, []);

  const removeService = useCallback((id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const importYaml = useCallback((yamlString: string): { count: number; errors: string[] } => {
    try {
      const parsed = yaml.load(yamlString) as { services?: Partial<Service>[] };
      const errors: string[] = [];
      let count = 0;

      if (!(parsed?.services && Array.isArray(parsed.services))) {
        return { count: 0, errors: ['Invalid YAML: expected a "services" array at root'] };
      }

      const newServices: Service[] = [];
      for (const entry of parsed.services) {
        if (!(entry.name && entry.type)) {
          errors.push("Skipped entry missing name or type");
          continue;
        }
        const service: Service = {
          ...entry,
          id: crypto.randomUUID(),
          status: "unknown",
          createdAt: new Date().toISOString()
        } as Service;
        newServices.push(service);
        count++;
      }

      setServices((prev) => [...prev, ...newServices]);
      return { count, errors };
    } catch (e) {
      return {
        count: 0,
        errors: [`YAML parse error: ${e instanceof Error ? e.message : String(e)}`]
      };
    }
  }, []);

  const exportYaml = useCallback((): string => {
    const exportData = services.map(({ id, status, createdAt, ...rest }) => rest);
    return yaml.dump({ services: exportData }, { lineWidth: 120 });
  }, [services]);

  return { services, addService, updateService, removeService, importYaml, exportYaml };
}
