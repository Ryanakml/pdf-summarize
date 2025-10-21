"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { deleteSummary } from "@/actions/summary-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  summaryId: string;
}

export default function DeleteButton({ summaryId }: DeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const result = await deleteSummary({ summaryId });
      if (result?.success) {
        toast.success("Summary deleted");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error("Failed to delete summary");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 bg-gray-50 border border-gray-200 hover:bg-purple-400 hover:text-gray-50 transition-colors duration-200"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="transition-transform duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out"
      >
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>
          <DialogDescription>
            Are you sure to delete this summary? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="ghost"
            className="text-gray-400 bg-gray-50 border border-gray-200 hover:bg-purple-400 hover:text-gray-50 transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="bg-purple-500 text-white hover:bg-purple-600 transition-colors duration-200"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}