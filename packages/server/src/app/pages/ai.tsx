import { Card, CardContent } from "@/app/components/ui/card";

export default function BuckleAiPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-foreground text-xl tracking-tight">Buckle AI</h1>
        <p className="mt-1 text-muted-foreground text-sm">Coming soon.</p>
      </div>
      <Card className="border-dashed">
        <CardContent className="p-8 text-center text-muted-foreground text-sm">
          Local AI assistance for your Buckle stack will appear here.
        </CardContent>
      </Card>
    </div>
  );
}
