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
import { Button } from "@/components/ui/button";
import { Download, MoreHorizontal, PlusCircle, UserX2 } from "lucide-react";
import Link from "next/link";
import DownloadBtn from "@/components/custom/admin/DownloadBtn";
import UserDeleteDialog from "@/components/custom/admin/UserDeleteDialog";

const getUserData = async () => {
  const data = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
};

const AdminDashboardUsersPage = async () => {
  const userData = await getUserData();
  return (
    <>
      {userData.length > 0 && (
        <div className="flex items-center justify-end mb-4">
          <DownloadBtn />
        </div>
      )}

      {userData.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>
              Manage your users and view their details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone No.</TableHead>
                  <TableHead>Created By Vendors</TableHead>
                  <TableHead className="text-end">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone ?? "Not Provided"}</TableCell>
                    <TableCell className="text-center">
                      {user.vendorId ? "Yes" : "No"}
                    </TableCell>
                    <TableCell className="text-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/dashboard/users/${user.id}`}>
                              View Detail
                            </Link>
                          </DropdownMenuItem>
               
                            <UserDeleteDialog
                              userId={user.id}
                              userName={user.name}
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
            <h2 className="text-xl font-semibold">No users found</h2>
            <p className="text-muted-foreground mb-6">
              You haven’t added any users yet. Get started by creating one.
            </p>
            <Button asChild>
              <Link href={"/login"}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create User
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AdminDashboardUsersPage;
