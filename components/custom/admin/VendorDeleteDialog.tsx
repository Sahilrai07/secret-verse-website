"use client";

import React, { useState } from "react";
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
import { toast } from "sonner";

const VendorDeleteDialog = ({
  vendorId,
  vendorName,
}: {
  vendorId: string;
  vendorName: string;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setOpen(false);
    setLoading(true);
    try {
      const res = await fetch("/api/vendor/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vendorId, // 👈 vendor ID here
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      toast.success(`Vendor "${vendorName}" deleted successfully.`);
      setOpen(false);
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error(`Failed to delete vendor "${vendorName}".`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault(); // prevent menu from closing the dialog
            setOpen(true);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader className="flex flex-col items-center text-center gap-2">
          <AlertTriangle className="text-red-500 w-10 h-10" />
          <DialogTitle className="text-lg">Delete "{vendorName}"?</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground text-center">
            This action cannot be undone. It will permanently delete the vendor
            and all associated data.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 w-full">
          <div className="flex justify-between w-full">
            <Button
              variant="secondary"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Confirm Delete"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VendorDeleteDialog;
