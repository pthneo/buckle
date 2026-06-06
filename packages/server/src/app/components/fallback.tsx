import { FileX, RefreshCcwIcon } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/app/components/ui/empty";
import { Spinner } from "./ui/spinner";

type FallbackStatus = "error" | "loading";

const LOADING_MESSAGES = [
  "Counting sheep...",
  "Allocating more RAM than necessary...",
  "Convincing the servers to cooperate...",
  "Negotiating with the cloud...",
  "Teaching packets where to go...",
  "Compressing uncompressed thoughts...",
  "Asking DNS nicely...",
  "Feeding the hamsters...",
  "Performing advanced hand waving...",
  "Applying duct tape...",
];

export default function Fallback({
  status,
  retry,
  errorMessage,
}: {
  status: FallbackStatus;
  errorMessage?: string;
  retry?: () => void;
}) {
  switch (status) {
    case "loading":
      return (
        <Empty className="pt-32">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Spinner />
            </EmptyMedia>
            <EmptyTitle>Loading</EmptyTitle>
            <EmptyDescription className="max-w-xs text-pretty">
              {LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      );
    default:
      return (
        <Empty className="pt-32">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileX />
            </EmptyMedia>
            <EmptyTitle>Error</EmptyTitle>
            <EmptyDescription className="max-w-xs text-pretty">
              {errorMessage
                ? `An error occurred: ${errorMessage}`
                : "An unknown error occurred. Please try again."}
            </EmptyDescription>
          </EmptyHeader>
          {retry && (
            <EmptyContent>
              <Button onClick={retry} variant="outline">
                <RefreshCcwIcon data-icon="inline-start" />
                Retry
              </Button>
            </EmptyContent>
          )}
        </Empty>
      );
  }
}
