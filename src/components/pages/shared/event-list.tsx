"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/server/client";
import { Pin } from "lucide-react";

export function EventList() {
  const { data, isLoading } = trpc.events.list.useQuery();

  if (isLoading) {
    return (
      <div>
        <Skeleton>
          <div className="mb-2 h-4 w-3/4 rounded" />
          <div className="h-4 w-1/2 rounded" />
        </Skeleton>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {data?.map((event) => (
        <Card key={event.id}>
          <CardHeader>
            <CardTitle className="font-semibold">{event.title}</CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              {new Date(event.startAt || "").toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {event.location && (
              <span className="flex items-center gap-2">
                <Pin />
                {event.location}
              </span>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
