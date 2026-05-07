import { Card, CardContent, CardHeader, CardTitle } from "@app/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const requestData = [
  { name: "api-server", requests: 2400, errors: 24 },
  { name: "postgres", requests: 1800, errors: 5 },
  { name: "redis", requests: 5200, errors: 12 },
  { name: "worker-1", requests: 800, errors: 3 }
];

const timelineData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  latency: Math.floor(Math.random() * 100) + 10,
  throughput: Math.floor(Math.random() * 500) + 100
}));

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-foreground text-xl tracking-tight">Analytics</h1>
        <p className="mt-1 text-muted-foreground text-sm">Service metrics and performance</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-medium text-muted-foreground text-sm">
              Requests by Service
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer height={250} width="100%">
              <BarChart data={requestData}>
                <CartesianGrid stroke="hsl(0 0% 14.9%)" strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: "hsl(0 0% 63.9%)", fontSize: 11 }} />
                <YAxis tick={{ fill: "hsl(0 0% 63.9%)", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(0 0% 9%)",
                    border: "1px solid hsl(0 0% 14.9%)",
                    color: "hsl(0 0% 98%)",
                    fontSize: 12
                  }}
                />
                <Bar dataKey="requests" fill="hsl(38 92% 50%)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="errors" fill="hsl(0 62.8% 30.6%)" radius={[0, 0, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-medium text-muted-foreground text-sm">
              Latency (ms) — 24h
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer height={250} width="100%">
              <LineChart data={timelineData}>
                <CartesianGrid stroke="hsl(0 0% 14.9%)" strokeDasharray="3 3" />
                <XAxis dataKey="hour" tick={{ fill: "hsl(0 0% 63.9%)", fontSize: 11 }} />
                <YAxis tick={{ fill: "hsl(0 0% 63.9%)", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(0 0% 9%)",
                    border: "1px solid hsl(0 0% 14.9%)",
                    color: "hsl(0 0% 98%)",
                    fontSize: 12
                  }}
                />
                <Line
                  dataKey="latency"
                  dot={false}
                  stroke="hsl(38 92% 50%)"
                  strokeWidth={2}
                  type="monotone"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="font-medium text-muted-foreground text-sm">
            Throughput (req/min) — 24h
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer height={200} width="100%">
            <LineChart data={timelineData}>
              <CartesianGrid stroke="hsl(0 0% 14.9%)" strokeDasharray="3 3" />
              <XAxis dataKey="hour" tick={{ fill: "hsl(0 0% 63.9%)", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(0 0% 63.9%)", fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  background: "hsl(0 0% 9%)",
                  border: "1px solid hsl(0 0% 14.9%)",
                  color: "hsl(0 0% 98%)",
                  fontSize: 12
                }}
              />
              <Line
                dataKey="throughput"
                dot={false}
                stroke="hsl(0 0% 98%)"
                strokeWidth={2}
                type="monotone"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
