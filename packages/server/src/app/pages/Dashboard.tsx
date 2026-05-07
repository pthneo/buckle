import { Card, CardContent, CardHeader, CardTitle } from "@app/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ICONS, LABELS, metadataQueries } from "@/app/data";
import { Spinner } from "../components/ui/spinner";

export default function Dashboard() {
  const { data, isPending, error } = useQuery(metadataQueries.all());

  if (isPending) {
    return <Spinner />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-foreground text-xl tracking-tight">Dashboard</h1>
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
            <p className="font-bold text-2xl text-foreground">{data?.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-medium text-muted-foreground text-xs">Online</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl text-chart-2">{data?.healthy}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-medium text-muted-foreground text-xs">Offline</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl text-destructive">{data?.unhealthy}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-medium text-muted-foreground text-xs">Unknown</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl text-muted-foreground">{data?.unknown}</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="mb-3 font-medium text-muted-foreground text-sm">By Type</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-7">
          {(Object.entries(ICONS) as [Category, React.ElementType][]).map(([type, Icon]) => (
            <Link key={type} to={`/${type}`}>
              <Card className="transition-colors hover:bg-accent/40">
                <CardContent className="flex items-center gap-3 p-4">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-bold text-foreground text-lg">
                      {data?.categories[type] || 0}
                    </p>
                    <p className="text-muted-foreground text-xs capitalize">{LABELS[type]}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {data?.total === 0 && (
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
