import { Rocket, TrendingUp, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const icons = [
  <Rocket key="launch" className="size-8" />,
  <TrendingUp key="invest" className="size-8" />,
  <Layers key="build" className="size-8" />,
];

export function FeaturesBento() {
  const [first, second, third] = site.approach;

  return (
    <section id="approach" className="scroll-mt-20 bg-gray-50 px-6 py-16 md:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            How we work
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Our approach
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">{site.description}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Launch — wide card */}
          <Card className="cursor-pointer transition-all hover:shadow-md lg:col-span-2">
            <CardContent className="p-8">
              <div className="text-primary">{icons[0]}</div>
              <h3 className="mt-4 text-xl font-semibold">{first.title}</h3>
              <p className="mt-2 text-muted-foreground">{first.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {site.focus.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Invest */}
          <Card className="cursor-pointer transition-all hover:shadow-md">
            <CardContent className="p-8">
              <div className="text-primary">{icons[1]}</div>
              <h3 className="mt-4 text-xl font-semibold">{second.title}</h3>
              <p className="mt-2 text-muted-foreground">{second.description}</p>
            </CardContent>
          </Card>

          {/* Build */}
          <Card className="cursor-pointer transition-all hover:shadow-md">
            <CardContent className="p-8">
              <div className="text-primary">{icons[2]}</div>
              <h3 className="mt-4 text-xl font-semibold">{third.title}</h3>
              <p className="mt-2 text-muted-foreground">{third.description}</p>
            </CardContent>
          </Card>

          {/* Focus areas — wide card */}
          <Card className="cursor-pointer transition-all hover:shadow-md lg:col-span-2">
            <CardContent className="p-8">
              <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                Focus areas
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {site.focus.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{site.tagline}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
