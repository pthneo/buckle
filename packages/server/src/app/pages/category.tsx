import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { categoryQueries, isCategory, LABELS } from "@/app/data";
import { cn } from "@/app/lib/utils";
import NotFound from "@/app/pages/not-found";
import Fallback from "../components/fallback";

const statusTone: Record<ServiceResult["status"], string> = {
  healthy: "text-chart-2",
  unhealthy: "text-destructive",
  unknown: "text-muted-foreground",
};

function CategoryBrowse({ category }: { category: Category }) {
  const { data, isPending, error, refetch } = useQuery(categoryQueries.list(category));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-foreground text-xl tracking-tight">{LABELS[category]}</h1>
          <p className="mt-1 text-muted-foreground text-sm">
            Select a service to view details and logs.
          </p>
        </div>
      </div>

      {isPending ? (
        <Fallback status="loading" />
      ) : error ? (
        <Fallback errorMessage={error?.message} retry={refetch} status="error" />
      ) : data.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground text-sm">No services in this category.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((service) => (
            <Link className="group block" key={service.id} to={`/${category}/${service.id}`}>
              <Card
                className={cn(
                  "h-full transition-colors",
                  "hover:border-border hover:bg-accent/40",
                  "group-focus-visible:ring-2 group-focus-visible:ring-ring"
                )}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="font-medium text-base">{service.name}</CardTitle>
                  <p className="font-mono text-muted-foreground text-xs">{service.type}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <span className={`font-medium text-xs uppercase ${statusTone[service.status]}`}>
                    {service.status}
                  </span>
                  {service.description ? (
                    <p className="mt-2 line-clamp-2 text-muted-foreground text-xs leading-relaxed">
                      {service.description}
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CategoryPage() {
  const { category: slug } = useParams<{ category: string }>();

  if (!(slug && isCategory(slug))) {
    return <NotFound />;
  }

  return <CategoryBrowse category={slug} />;
}
