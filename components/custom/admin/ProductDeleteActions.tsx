"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteProductDialog({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    setOpen(false);
    try {
      const res = await fetch("/api/products/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId, // 👈 your product ID here
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      toast.success("Product deleted successfully!");
      // Optionally refetch data or redirect
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete product.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Delete
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className=" w-full">
        <DialogHeader className="flex flex-col items-center text-center gap-2">
          <AlertTriangle className="text-red-500 w-10 h-10" />
          <DialogTitle className="text-lg">
            Delete &quot;{productName}&quot;?
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground text-center">
            This action cannot be undone. This will permanently delete the
            product and its image from the server.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 w-full">
          <div className="flex justify-between w-full">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Confirm Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
