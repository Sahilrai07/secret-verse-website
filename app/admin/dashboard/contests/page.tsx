import ContestDeleteDialog from "@/components/custom/admin/ContestDeleteDialog";
import { Button } from "@/components/ui/button";
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
import { Box, MoreHorizontal, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const getProductData = async () => {
  const data = await prisma.contest.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
};

const AdminDashboardContestsPage = async () => {
  const contests = await getProductData();

  return (
    <>
      {contests.length > 0 && (
        <div>
          <div className="flex items-center justify-end">
            <Button asChild className="flex items-center gap-x-2">
              <Link href={"/admin/dashboard/contests/create"}>
                <PlusCircle className="w-3.5 h-3.5" />
                <span className="font-bold">Add Contents</span>
              </Link>
            </Button>
          </div>
        </div>
      )}

      {contests.length > 0 ? (
        <Card className="mt-5">
          <CardHeader>
            <CardTitle>Contests</CardTitle>
            <CardDescription>
              Manage your contests and view their sales performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Stautus</TableHead>
                  <TableHead>category</TableHead>
                  <TableHead>Price Pool</TableHead>
                  <TableHead>Ticket Price</TableHead>
                  <TableHead className="text-end">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contests.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="">
                      <Image
                        alt="product image"
                        src={item.image}
                        height={64}
                        width={64}
                        className="rounded-md object-cover h-16 w-16"
                      />
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>₹{item.prizePool}</TableCell>
                    <TableCell>₹{item.ticketPrice}</TableCell>
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
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/dashboard/contests/${item.id}`}>
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <ContestDeleteDialog
                            contestId={item.id}
                            contestName={item.title}
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
        <div className="flex flex-col items-center  justify-center gap-4 mt-10 text-center text-muted-foreground">
          <Box className="w-12 h-12 text-yellow-500" />
          <h3 className="text-lg font-semibold text-white">No Contest Found</h3>
          <p className="text-sm">
            You haven’t added any contest yet. Start by creating one.
          </p>
          <Button asChild className="mt-4">
            <Link href="/admin/dashboard/contests/create">
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Contest
            </Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default AdminDashboardContestsPage;
