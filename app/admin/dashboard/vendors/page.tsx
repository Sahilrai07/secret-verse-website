import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal, UserX, UserX2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import VendorDeleteDialog from "@/components/custom/admin/VendorDeleteDialog";

const getVendorData = async () => {
  const data = await prisma?.vendor.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
};

const AdminDashboardVendorsPage = async () => {
  const vendorData = await getVendorData();

  return (
    <>
      <div className="flex items-center justify-end mb-4">
        <Button asChild className="flex items-center gap-x-2">
          <Link href={"/admin/dashboard/vendors/create"}>
            <PlusCircle className="w-4 h-4" />
            <span className="font-semibold">Create Vendor</span>
          </Link>
        </Button>
      </div>

      {vendorData.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Vendor Users</CardTitle>
            <CardDescription>
              Manage your vendor users and view their details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone No.</TableHead>
                  <TableHead>Total Tickets</TableHead>
                  <TableHead className="text-end">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendorData.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell>{vendor.id}</TableCell>
                    <TableCell>{vendor.name}</TableCell>
                    <TableCell>{vendor.email}</TableCell>
                    <TableCell>{vendor.phone}</TableCell>
                    <TableCell>{vendor.totalTickets ?? 0}</TableCell>
                    <TableCell className="text-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/admin/dashboard/vendors/${vendor.id}`}
                            >
                              Edit
                            </Link>
                          </DropdownMenuItem>

                          <VendorDeleteDialog
                            vendorId={vendor.id}
                            vendorName={vendor.name}
                          />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card className="mt-10">
          <CardContent className="flex flex-col items-center justify-center py-24 text-center">
            <UserX2 className="w-12 h-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold">No vendors found</h2>
            <p className="text-muted-foreground mb-6">
              You haven’t added any vendors yet. Get started by creating one.
            </p>
            <Button asChild>
              <Link href={"/admin/dashboard/vendors/create"}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Vendor
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AdminDashboardVendorsPage;
