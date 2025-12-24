"use client";

import { Button } from "@/components/ui/button";
import { IconThumbUp, IconThumbDown } from "@tabler/icons-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface MessageFeedbackProps {
  className?: string;
}

export function MessageFeedback({ className }: MessageFeedbackProps) {
  const [feedback, setFeedback] = useState<"like" | "dislike" | null>(null);

  return (
    <div className={cn("flex items-center gap-2 mt-2", className)}>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-7 px-2 text-muted-foreground hover:text-foreground hover:bg-transparent font-thin text-xs gap-1.5 transition-colors",
          feedback === "like" && "text-primary hover:text-primary"
        )}
        onClick={() => setFeedback(feedback === "like" ? null : "like")}
        aria-label="Like"
      >
        <IconThumbUp
          className={cn("h-4 w-4", feedback === "like" && "fill-current")}
          stroke={1.5}
        />
        <span>Good</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-7 px-2 text-muted-foreground hover:text-foreground hover:bg-transparent font-thin text-xs gap-1.5 transition-colors",
          feedback === "dislike" && "text-destructive hover:text-destructive"
        )}
        onClick={() => setFeedback(feedback === "dislike" ? null : "dislike")}
        aria-label="Dislike"
      >
        <IconThumbDown
          className={cn("h-4 w-4", feedback === "dislike" && "fill-current")}
          stroke={1.5}
        />
        <span>Bad</span>
      </Button>
    </div>
  );
}
