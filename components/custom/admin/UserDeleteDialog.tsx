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

const UserDeleteDialog = ({
  userId,
  userName,
}: {
  userId: string;
  userName: string;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setOpen(false);
    setLoading(true);
    try {
      const res = await fetch("/api/users/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId, // 👈 vendor ID here
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete product");
      }
      toast.success(`User "${userName}" deleted successfully.`);
      // Optionally refetch data or redirect
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error(`Failed to delete user "${userName}".`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault(); // prevent dropdown menu from closing the dialog
          }}
          onClick={() => setOpen(true)}
        >
          Delete
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className=" w-full">
        <DialogHeader className="flex flex-col items-center text-center gap-2">
          <AlertTriangle className="text-red-500 w-10 h-10" />
          <DialogTitle className="text-lg">Delete {userName} ?</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground text-center">
            This action cannot be undone. It will permanently delete the user
            and all their associated data.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 w-full">
          <div className="flex justify-between w-full">
            <Button variant="secondary" onClick={() => setOpen(false)}>
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

export default UserDeleteDialog;
