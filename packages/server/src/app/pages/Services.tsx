import { useServices } from "@app/store/services";
import { ServiceCard } from "@/app/components/service-card";

export default function Services() {
  const { services, removeService } = useServices();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-foreground text-xl tracking-tight">Services</h1>
          <p className="mt-1 text-muted-foreground text-sm">Manage your local infrastructure</p>
        </div>
      </div>

      {services.length === 0 ? (
        <div className="border border-border border-dashed p-12 text-center">
          <p className="text-muted-foreground text-sm">No services registered.</p>
          <p className="mt-1 text-muted-foreground text-xs">
            Click "Add Service" or import a YAML config to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} onRemove={removeService} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
