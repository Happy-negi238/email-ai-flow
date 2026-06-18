"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function RefreshButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = async () => {
    setIsLoading(true);
    router.refresh();
    setIsLoading(false);
  };

  return (
    <Button
      onClick={handleRefresh}
      disabled={isLoading}
      variant="outline"
      size="sm"
    >
      <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
      Refresh Calendar
    </Button>
  );
}
