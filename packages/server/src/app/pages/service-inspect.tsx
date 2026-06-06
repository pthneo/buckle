// import { useQuery } from "@tanstack/react-query";
// import { Link, useParams } from "react-router-dom";
// import { LogStream } from "@/app/components/log-stream";
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
// import { Spinner } from "@/app/components/ui/spinner";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
// import { categoryQueries, ICONS, isCategory, LABELS } from "@/app/data";
// import NotFound from "@/app/pages/not-found";

// function statusTone(status: ServiceResult["status"]): string {
//   if (status === "healthy") {
//     return "text-chart-2";
//   }
//   if (status === "unhealthy") {
//     return "text-destructive";
//   }
//   return "text-muted-foreground";
// }

// function ServiceInspectInner({ category, serviceId }: { category: Category; serviceId: string }) {
//   const { data, isPending, error } = useQuery(categoryQueries.detail(category, serviceId));

//   const Icon = ICONS[category];

//   if (isPending) {
//     return <Spinner />;
//   }

//   if (error || !data) {
//     return (
//       <div className="space-y-4">
//         <Link
//           className="text-muted-foreground text-xs underline-offset-4 hover:text-foreground hover:underline"
//           to={`/${category}`}
//         >
//           ← Back to {LABELS[category]}
//         </Link>
//         <p className="text-destructive text-sm">{error?.message ?? "Service not found."}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <Link
//           className="text-muted-foreground text-xs underline-offset-4 hover:text-foreground hover:underline"
//           to={`/${category}`}
//         >
//           ← Back to {LABELS[category]}
//         </Link>
//         <div className="mt-3 flex items-center gap-3">
//           <Icon className="h-8 w-8 text-muted-foreground" />
//           <div>
//             <h1 className="text-foreground text-xl tracking-tight">{data.name}</h1>
//             <p className="mt-0.5 font-mono text-muted-foreground text-xs">{data.type}</p>
//           </div>
//         </div>
//       </div>

//       <Tabs defaultValue="logs">
//         <TabsList variant="line">
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="logs">Logs</TabsTrigger>
//         </TabsList>

//         <TabsContent className="space-y-4 pt-4" value="overview">
//           <Card>
//             <CardHeader className="pb-2">
//               <CardTitle className="font-medium text-muted-foreground text-sm">Details</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-2 text-sm">
//               <div className="flex justify-between gap-4 border-border border-b py-2">
//                 <span className="text-muted-foreground">Status</span>
//                 <span className={`font-medium uppercase ${statusTone(data.status)}`}>
//                   {data.status}
//                 </span>
//               </div>
//               <div className="flex justify-between gap-4 border-border border-b py-2">
//                 <span className="text-muted-foreground">ID</span>
//                 <span className="font-mono text-xs">{data.id}</span>
//               </div>
//               {data.description ? (
//                 <div className="pt-2">
//                   <p className="text-muted-foreground text-xs">{data.description}</p>
//                 </div>
//               ) : null}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent className="pt-4" value="logs">
//           <LogStream serviceFilter={{ id: data.id, name: data.name }} variant="embedded" />
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

// export default function ServiceInspectPage() {
//   const { category: slug, serviceId } = useParams<{
//     category: string;
//     serviceId: string;
//   }>();

//   if (!(slug && serviceId && isCategory(slug))) {
//     return <NotFound />;
//   }

//   return <ServiceInspectInner category={slug} serviceId={serviceId} />;
// }

export default function ServiceInspectPage() {
  return null;
}
