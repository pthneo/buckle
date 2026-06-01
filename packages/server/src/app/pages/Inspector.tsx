import { Database, HardDrive, Play, Search, Zap } from "lucide-react";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Textarea } from "@/app/components/ui/textarea";
import { useServices } from "@/app/store/services";

const MOCK_DB_RESULTS = [
  { id: 1, name: "users", email: "admin@localhost", role: "admin" },
  { id: 2, name: "alice", email: "alice@localhost", role: "user" },
  { id: 3, name: "bob", email: "bob@localhost", role: "user" },
];

const MOCK_REDIS_KEYS = [
  { key: "session:abc123", type: "string", ttl: 3600, value: '{"userId":"1","role":"admin"}' },
  { key: "cache:users:list", type: "hash", ttl: 300, value: "{...}" },
  { key: "queue:jobs", type: "list", ttl: -1, value: "[3 items]" },
];

export default function Inspector() {
  const { services } = useServices();
  const [selectedService, setSelectedService] = useState<string | null>("");
  const [sqlQuery, setSqlQuery] = useState("SELECT * FROM users LIMIT 10;");
  const [redisFilter, setRedisFilter] = useState("");

  const databases = services.filter((s) => s.type === "database");
  const caches = services.filter((s) => s.type === "cache");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-foreground text-xl tracking-tight">Inspector</h1>
        <p className="mt-1 text-muted-foreground text-sm">Browse and query your services</p>
      </div>

      <Tabs className="space-y-4" defaultValue="database">
        <TabsList>
          <TabsTrigger className="gap-1.5 text-xs" value="database">
            <Database className="h-3.5 w-3.5" /> Database
          </TabsTrigger>
          <TabsTrigger className="gap-1.5 text-xs" value="cache">
            <Zap className="h-3.5 w-3.5" /> Cache
          </TabsTrigger>
          <TabsTrigger className="gap-1.5 text-xs" value="search">
            <Search className="h-3.5 w-3.5" /> Search
          </TabsTrigger>
          <TabsTrigger className="gap-1.5 text-xs" value="objectstore">
            <HardDrive className="h-3.5 w-3.5" /> Object Store
          </TabsTrigger>
        </TabsList>

        <TabsContent className="space-y-4" value="database">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Select onValueChange={setSelectedService} value={selectedService}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select database..." />
                </SelectTrigger>
                <SelectContent>
                  {databases.length === 0 && (
                    <SelectItem disabled value="_">
                      No databases registered
                    </SelectItem>
                  )}
                  {databases.map((d) => (
                    <SelectItem key={d.id} value={d.id}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="font-medium text-muted-foreground text-sm">SQL Query</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                className="min-h-[80px] font-mono text-xs"
                onChange={(e) => setSqlQuery(e.target.value)}
                placeholder="SELECT * FROM ..."
                value={sqlQuery}
              />
              <Button className="gap-1.5 text-xs" size="sm">
                <Play className="h-3.5 w-3.5" /> Execute
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="font-medium text-muted-foreground text-sm">
                Results (sample)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">id</TableHead>
                    <TableHead className="text-xs">name</TableHead>
                    <TableHead className="text-xs">email</TableHead>
                    <TableHead className="text-xs">role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_DB_RESULTS.map((row) => (
                    <TableRow className="font-mono text-xs" key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent className="space-y-4" value="cache">
          <div className="flex gap-2">
            <Select onValueChange={setSelectedService} value={selectedService}>
              <SelectTrigger className="w-48 text-sm">
                <SelectValue placeholder="Select cache..." />
              </SelectTrigger>
              <SelectContent>
                {caches.length === 0 && (
                  <SelectItem disabled value="_">
                    No caches registered
                  </SelectItem>
                )}
                {caches.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              className="flex-1 font-mono text-sm"
              onChange={(e) => setRedisFilter(e.target.value)}
              placeholder="Filter keys..."
              value={redisFilter}
            />
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Key</TableHead>
                    <TableHead className="text-xs">Type</TableHead>
                    <TableHead className="text-xs">TTL</TableHead>
                    <TableHead className="text-xs">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_REDIS_KEYS.filter((k) => !redisFilter || k.key.includes(redisFilter)).map(
                    (k) => (
                      <TableRow className="font-mono text-xs" key={k.key}>
                        <TableCell className="font-medium text-foreground">{k.key}</TableCell>
                        <TableCell>{k.type}</TableCell>
                        <TableCell>{k.ttl === -1 ? "∞" : `${k.ttl}s`}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{k.value}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search">
          <Card className="border-dashed">
            <CardContent className="p-8 text-center">
              <Search className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">Search engine inspector</p>
              <p className="mt-1 text-muted-foreground text-xs">
                Register a search engine service to browse indices and run queries.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="objectstore">
          <Card className="border-dashed">
            <CardContent className="p-8 text-center">
              <HardDrive className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">Object store inspector</p>
              <p className="mt-1 text-muted-foreground text-xs">
                Register an S3-compatible object store to browse buckets and objects.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
