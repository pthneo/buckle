import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
      <h1 className="mb-2 font-bold text-2xl tracking-tight">404</h1>
      <p className="mb-6 text-muted-foreground text-sm">Page not found.</p>
      <Link className="text-primary text-sm underline-offset-4 hover:underline" to="/">
        Return to Dashboard
      </Link>
    </div>
  );
}
