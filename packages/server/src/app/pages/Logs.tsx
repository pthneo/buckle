import { Button } from "@app/components/ui/button";
import { Input } from "@app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@app/components/ui/select";
import type { LogEntry } from "@app/types/services";
import { Pause, Play } from "lucide-react";
import { useState } from "react";

const MOCK_LOGS: LogEntry[] = [
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

export default function Logs() {
  const [filter, setFilter] = useState("");
  const [level, setLevel] = useState<string | null>("all");
  const [paused, setPaused] = useState(false);

  const logs = MOCK_LOGS.filter((log) => {
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
    <div className="space-y-4">
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

      <div className="max-h-[600px] min-h-[400px] space-y-1 overflow-y-auto border border-border bg-card p-4 font-mono text-xs">
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
