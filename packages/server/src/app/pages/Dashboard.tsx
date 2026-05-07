import { Card, CardContent, CardHeader, CardTitle } from "@app/components/ui/card";
import { useServices } from "@app/store/services";
import type { ServiceType } from "@app/types/services";
import { Cog, Database, HardDrive, Search, Server, Zap } from "lucide-react";

const typeIcons: Record<ServiceType, React.ElementType> = {
  app: Server,
  database: Database,
  cache: Zap,
  search: Search,
  objectstore: HardDrive,
  worker: Cog
};

export default function Dashboard() {
  const { services } = useServices();

  const counts = services.reduce(
    (acc, s) => {
      acc[s.type] = (acc[s.type] || 0) + 1;
      return acc;
    },
    {} as Record<ServiceType, number>
  );

  const online = services.filter((s) => s.status === "online").length;
  const offline = services.filter((s) => s.status === "offline").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-foreground text-xl tracking-tight">Dashboard</h1>
        <p className="mt-1 text-muted-foreground text-sm">
          An overview of your local infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-medium text-muted-foreground text-xs">
              Total Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl text-foreground">{services.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-medium text-muted-foreground text-xs">Online</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl text-chart-2">{online}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-medium text-muted-foreground text-xs">Offline</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl text-destructive">{offline}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-medium text-muted-foreground text-xs">Unknown</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl text-muted-foreground">
              {services.length - online - offline}
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="mb-3 font-medium text-muted-foreground text-sm">By Type</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {(Object.entries(typeIcons) as [ServiceType, React.ElementType][]).map(([type, Icon]) => (
            <Card key={type}>
              <CardContent className="flex items-center gap-3 p-4">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-bold text-foreground text-lg">{counts[type] || 0}</p>
                  <p className="text-muted-foreground text-xs capitalize">
                    {type === "objectstore" ? "Storage" : type}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {services.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground text-sm">No services registered yet.</p>
            <p className="mt-1 text-muted-foreground text-xs">
              Go to <span className="font-medium text-foreground">Services</span> to add your first
              service or import a YAML config.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
