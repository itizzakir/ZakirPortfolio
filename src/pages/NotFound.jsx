import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4 pt-28">
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase text-cyan-100/70">404</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-white">Signal lost.</h1>
        <p className="mt-4 text-muted-foreground">The route you opened does not exist in this portfolio interface.</p>
        <Button asChild className="mt-8">
          <Link to="/">Return Home</Link>
        </Button>
      </div>
    </main>
  );
}
