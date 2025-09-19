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
import DeleteProductDialog from "@/components/custom/admin/ProductDeleteActions";

const getProductData = async () => {
  const data = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
};

const AdminDashboardProductsPage = async () => {
  const products = await getProductData();
  // console.log(products);
  return (
    <>
      {products.length > 0 && (
        <div className="flex items-center justify-end">
          <Button asChild className="flex items-center gap-x-2">
            <Link href={"/admin/dashboard/products/create"}>
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="font-bold">Add Product</span>
            </Link>
          </Button>
        </div>
      )}
      {products.length > 0 ? (
        <Card className="mt-5">
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>
              Manage your products and view their sales performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  {/* <TableHead>Stautus</TableHead> */}
                  <TableHead>Price</TableHead>
                  <TableHead>Coins</TableHead>
                  <TableHead className="text-end">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((item) => (
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
                    <TableCell>{item.name}</TableCell>
                    <TableCell>₹{item.price}</TableCell>
                    <TableCell>{item.coinPrice}</TableCell>
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
                            <Link href={`/admin/dashboard/products/${item.id}`}>
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DeleteProductDialog
                            productId={item.id}
                            productName={item.name}
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
          <h3 className="text-lg font-semibold text-white">
            No Products Found
          </h3>
          <p className="text-sm">
            You haven’t added any products yet. Start by creating one.
          </p>
          <Button asChild className="mt-4">
            <Link href="/admin/dashboard/products/create">
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Product
            </Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default AdminDashboardProductsPage;
