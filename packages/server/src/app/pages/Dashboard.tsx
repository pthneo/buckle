import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { ICONS, LABELS, metadataQueries } from "@/app/data";
import Fallback from "../components/fallback";
import { Heading1 } from "../components/typography";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 8,
    scale: 0.98,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { data, isPending, error, refetch } = useQuery(metadataQueries.all());
  return (
    <div className="space-y-6">
      <div>
        <Heading1>Dashboard</Heading1>
        <p className="mt-1 text-muted-foreground text-sm">
          An overview of your local infrastructure.
        </p>
      </div>
      {isPending ? (
        <Fallback status="loading" />
      ) : error ? (
        <Fallback errorMessage={error?.message} retry={refetch} status="error" />
      ) : (
        <>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 md:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-light text-muted-foreground text-sm">Total</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl text-foreground">{data?.total}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-light text-muted-foreground text-sm">Online</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl text-green-500">{data?.healthy}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-light text-muted-foreground text-sm">Offline</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl text-destructive">{data?.unhealthy}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-light text-muted-foreground text-sm">Unknown</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl text-muted-foreground">{data?.unknown}</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="mb-3 text-muted-foreground text-sm tracking-widest">BY TYPE</h2>
            <motion.div
              animate="show"
              className="grid grid-cols-1 xs:grid-cols-2 gap-3 lg:grid-cols-4"
              initial="hidden"
              variants={container}
            >
              {(Object.entries(ICONS) as [Category, React.ElementType][])
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map(([type, Icon]) => (
                  <motion.div
                    aria-description={`Click to view ${LABELS[type]}`}
                    className="animate-in cursor-pointer duration-300"
                    key={type}
                    onClick={() => navigate(`/${type}`)}
                    variants={item}
                  >
                    <Card className="relative transition-all duration-300 hover:scale-102 hover:bg-zinc-950">
                      <CardHeader>
                        <CardTitle className="font-light text-muted-foreground text-sm">
                          {LABELS[type]}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-4xl">{data?.categories[type] || 0}</p>
                      </CardContent>
                      <Avatar className="absolute top-4.5 right-4 size-8 rounded-md after:rounded-md">
                        <AvatarFallback className="rounded-md bg-black">
                          <Icon className="size-4" />
                        </AvatarFallback>
                      </Avatar>
                    </Card>
                  </motion.div>
                ))}
            </motion.div>
          </div>
          {data?.total === 0 && (
            <Card className="border-dashed">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground text-sm">No services registered yet.</p>
                <p className="mt-1 text-muted-foreground text-xs">
                  Go to <span className="font-medium text-foreground">Services</span> to add your
                  first service or import a YAML config.
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
