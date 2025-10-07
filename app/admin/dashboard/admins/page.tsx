import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { prisma } from "@/lib/prisma";
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

const getUsersData = async () => {
  const data = await prisma.admin.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      role: "ADMIN",
    },
  });
  return data;
};

const AdminDashboardAdminUserPage = async () => {
  const userData = await getUsersData();

  return (
    <>
      {userData.length > 0 && (
        <div className="flex items-center justify-end">
          <Button asChild className="flex items-center gap-x-2">
            <Link className="" href={"/admin/dashboard/admins/create"}>
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="font-bold">Create Admin</span>
            </Link>
          </Button>
        </div>
      )}

      {userData.length > 0 ? (
        <Card className="mt-5">
          <CardHeader>
            <CardTitle>Admin Users</CardTitle>
            <CardDescription>
              Manage your admin users and view their details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Admin ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone No.</TableHead>
                  <TableHead className="text-end">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell className="text-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size={"icon"}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
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
        <div className="flex flex-col items-center  justify-center gap-4 mt-10 text-center text-muted-foreground">
          <User className="w-12 h-12 text-yellow-500" />
          <h3 className="text-lg font-semibold text-white">
            No Admin User Found
          </h3>
          <p className="text-sm">
            You haven’t added any admin user yet. Start by creating one.
          </p>
          <Button asChild className="mt-4">
            <Link href="/admin/dashboard/admins/create">
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Admin
            </Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default AdminDashboardAdminUserPage;
