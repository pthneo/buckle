import { Button } from "@app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@app/components/ui/card";
import type { Service, ServiceType } from "@app/types/services";
import { SERVICE_TYPE_LABELS } from "@app/types/services";
import { Cog, Database, Globe, HardDrive, Search, Settings, Trash2, Zap } from "lucide-react";
import { StatusBadge } from "@/app/components/status-badge";

const iconMap: Record<ServiceType, React.ElementType> = {
  app: Globe,
  database: Database,
  cache: Zap,
  search: Search,
  objectstore: HardDrive,
  worker: Cog
};

interface ServiceCardProps {
  onRemove: (id: string) => void;
  service: Service;
}

function getServiceDetail(service: Service): string {
  switch (service.type) {
    case "app":
      return `${service.url}:${service.port}`;
    case "database":
      return `${service.engine} @ ${service.host}:${service.port}/${service.database}`;
    case "cache":
      return `${service.engine} @ ${service.host}:${service.port}`;
    case "search":
      return `${service.engine} @ ${service.host}:${service.port}`;
    case "objectstore":
      return `${service.endpoint} / ${service.bucket}`;
    case "worker":
      return service.endpoint;
    default:
      return "";
  }
}

export function ServiceCard({ service, onRemove }: ServiceCardProps) {
  const Icon = iconMap[service.type];

  return (
    <Card className="transition-colors hover:border-foreground/20">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="font-medium text-foreground text-sm">{service.name}</CardTitle>
          </div>
          <StatusBadge status={service.status} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-1 text-muted-foreground text-xs">{SERVICE_TYPE_LABELS[service.type]}</p>
        <p className="truncate font-mono text-secondary-foreground text-xs">
          {getServiceDetail(service)}
        </p>
        <div className="mt-3 flex gap-1">
          <Button
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            size="icon"
            variant="ghost"
          >
            <Settings className="h-3.5 w-3.5" />
          </Button>
          <Button
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
            onClick={() => onRemove(service.id)}
            size="icon"
            variant="ghost"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
