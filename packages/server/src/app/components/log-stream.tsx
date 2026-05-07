import { Button } from "@app/components/ui/button";
import { Input } from "@app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@app/components/ui/select";
import { cn } from "@app/lib/utils";
import { Pause, Play } from "lucide-react";
import { useMemo, useState } from "react";

export type LogEntry = {
  id: string;
  serviceId: string;
  serviceName: string;
  level: "info" | "warn" | "error" | "debug";
  message: string;
  timestamp: string;
};

const GLOBAL_MOCK_LOGS: LogEntry[] = [
  {
    id: "1",
    serviceId: "x",
    serviceName: "api-server",
    level: "info",
    message: "Server started on port 3000",
    timestamp: new Date().toISOString()
  },
  {
    id: "2",
    serviceId: "x",
    serviceName: "postgres",
    level: "info",
    message: "Connection pool initialized (max: 20)",
    timestamp: new Date().toISOString()
  },
  {
    id: "3",
    serviceId: "x",
    serviceName: "redis",
    level: "warn",
    message: "Memory usage above 80% threshold",
    timestamp: new Date().toISOString()
  },
  {
    id: "4",
    serviceId: "x",
    serviceName: "api-server",
    level: "error",
    message: "ECONNREFUSED 127.0.0.1:5432 — retrying in 5s",
    timestamp: new Date().toISOString()
  },
  {
    id: "5",
    serviceId: "x",
    serviceName: "worker-1",
    level: "debug",
    message: "Processing job queue batch #1842",
    timestamp: new Date().toISOString()
  }
];

const levelColors: Record<string, string> = {
  info: "text-foreground",
  warn: "text-chart-5",
  error: "text-destructive",
  debug: "text-muted-foreground"
};

function mockLogsForService(serviceId: string, serviceName: string): LogEntry[] {
  const ts = new Date().toISOString();
  return [
    {
      id: `${serviceId}-a`,
      serviceId,
      serviceName,
      level: "info",
      message: "Adapter connected.",
      timestamp: ts
    },
    {
      id: `${serviceId}-b`,
      serviceId,
      serviceName,
      level: "info",
      message: "Health check completed successfully.",
      timestamp: ts
    },
    {
      id: `${serviceId}-c`,
      serviceId,
      serviceName,
      level: "debug",
      message: "Polling configuration (stub log stream).",
      timestamp: ts
    }
  ];
}

export type LogStreamProps = {
  /** When set, only sample lines for this service are shown. */
  serviceFilter?: { id: string; name: string };
  /** Full page chrome (title, padding intent) vs compact panel in inspect tab. */
  variant?: "page" | "embedded";
};

export function LogStream({ serviceFilter, variant = "page" }: LogStreamProps) {
  const [filter, setFilter] = useState("");
  const [level, setLevel] = useState<string | null>("all");
  const [paused, setPaused] = useState(false);

  const sourceLogs = useMemo(() => {
    if (serviceFilter) {
      return mockLogsForService(serviceFilter.id, serviceFilter.name);
    }
    return GLOBAL_MOCK_LOGS;
  }, [serviceFilter]);

  const logs = sourceLogs.filter((log) => {
    if (level !== "all" && log.level !== level) {
      return false;
    }
    if (
      filter &&
      !log.message.toLowerCase().includes(filter.toLowerCase()) &&
      !log.serviceName.toLowerCase().includes(filter.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className={cn("space-y-4", variant === "embedded" && "space-y-3")}>
      {variant === "page" && (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-foreground text-xl tracking-tight">Logs</h1>
            <p className="mt-1 text-muted-foreground text-sm">Unified log stream</p>
          </div>
          <Button
            className="gap-1.5 text-xs"
            onClick={() => setPaused(!paused)}
            size="sm"
            variant="outline"
          >
            {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            {paused ? "Resume" : "Pause"}
          </Button>
        </div>
      )}

      {variant === "embedded" && (
        <div className="flex justify-end">
          <Button
            className="gap-1.5 text-xs"
            onClick={() => setPaused(!paused)}
            size="sm"
            variant="outline"
          >
            {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            {paused ? "Resume" : "Pause"}
          </Button>
        </div>
      )}

      <div className="flex gap-2">
        <Input
          className="flex-1 text-sm"
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search logs..."
          value={filter}
        />
        <Select onValueChange={setLevel} value={level}>
          <SelectTrigger className="w-32 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="info">Info</SelectItem>
            <SelectItem value="warn">Warning</SelectItem>
            <SelectItem value="error">Error</SelectItem>
            <SelectItem value="debug">Debug</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div
        className={cn(
          "space-y-1 overflow-y-auto border border-border bg-card p-4 font-mono text-xs",
          variant === "page"
            ? "max-h-[600px] min-h-[400px]"
            : "max-h-[min(480px,55vh)] min-h-[240px]"
        )}
      >
        {logs.map((log) => (
          <div className="flex gap-3 px-2 py-0.5 hover:bg-accent/50" key={log.id}>
            <span className="shrink-0 text-muted-foreground">
              {new Date(log.timestamp).toLocaleTimeString()}
            </span>
            <span className={`w-12 shrink-0 font-bold uppercase ${levelColors[log.level]}`}>
              {log.level}
            </span>
            <span className="shrink-0 text-muted-foreground">[{log.serviceName}]</span>
            <span className="text-foreground">{log.message}</span>
          </div>
        ))}
        {logs.length === 0 && (
          <p className="py-8 text-center text-muted-foreground">No logs matching filters.</p>
        )}
        {!paused && <div className="animate-pulse text-foreground">▌</div>}
      </div>
    </div>
  );
}
