"use client";

import { createProduct } from "@/app/actions/productActions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { useActionState, useEffect, useState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/lib/zodSchemas";
import ProductImageUploader from "@/components/custom/admin/ProductImageUploader";
import { toast } from "sonner";
// import Image from "next/image";

const ProductCreatePage = () => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(""); // local preview
  const [imageValue, setImageValue] = useState<string>(""); // final image key or URL
  const [lastStatus, action, isPending] = useActionState(
    createProduct,
    undefined
  );
  const [form, fields] = useForm({
    lastResult: lastStatus,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  useEffect(() => {
    if (lastStatus?.status === "success") {
      toast.success("Product created successfully!");
    }
    if (lastStatus?.status === "error") {
      toast.error("Something went wrong. Please try again.");
    }
  }, [lastStatus]);

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-center gap-4">
        <Button variant={"ghost"} size={"icon"}>
          <Link href={"/admin/dashboard/products"}>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">New Product</h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            In this form you can create your product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Product Name</Label>
              <Input
                type="text"
                placeholder="Product 1"
                className="w-full"
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={fields.name.initialValue}
              />
              <p className="text-red-500 font-semibold">{fields.name.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Product Description</Label>
              <Textarea
                placeholder="Write your product description right here..."
                className="w-full"
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={fields.description.initialValue}
              />
              <p className="text-red-500 font-semibold">
                {fields.description.errors}
              </p>
            </div>
            <div className="flex w-full items-center gap-6">
              <div className="flex flex-col gap-3 w-full">
                <Label>Price</Label>
                <Input
                  type="number"
                  className="w-full"
                  placeholder="₹100"
                  key={fields.description.key}
                  name={fields.price.name}
                  defaultValue={fields.price.initialValue}
                />
                <p className="text-red-500 font-semibold">
                  {fields.price.errors}
                </p>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <Label>Sale Price (Optional)</Label>
                <Input
                  type="number"
                  className="w-full"
                  placeholder="₹80"
                  key={fields.salePrice.key}
                  name={fields.salePrice.name}
                  defaultValue={fields.salePrice.initialValue}
                />
                <p className="text-red-500 font-semibold">
                  {fields.salePrice.errors}
                </p>
              </div>
            </div>
            <div className="flex w-full items-center justify-center gap-6">
              <div className="flex flex-col gap-3 w-full">
                <Label>Coin Price </Label>
                <Input
                  type="number"
                  className="w-full"
                  placeholder="500 coins"
                  key={fields.coinPrice.key}
                  name={fields.coinPrice.name}
                  defaultValue={fields.coinPrice.initialValue}
                />
                <p className="text-red-500 font-semibold">
                  {fields.coinPrice.errors}
                </p>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <Label>Min coins to apply (Optional) </Label>
                <Input
                  type="number"
                  className="w-full"
                  placeholder="300 coins"
                  key={fields.minCoinse.key}
                  name={fields.minCoinse.name}
                  defaultValue={fields.minCoinse.initialValue}
                />
                <p className="text-red-500 font-semibold">
                  {fields.minCoinse.errors}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Label> Product Stock </Label>
              <Input
                type="number"
                className="w-full"
                placeholder="50"
                key={fields.stock.key}
                name={fields.stock.name}
                defaultValue={fields.stock.initialValue}
              />
              <p className="text-red-500 font-semibold">
                {fields.stock.errors}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Featured Product (Optional)</Label>
              <Switch
                key={fields.isFeatured.key}
                name={fields.isFeatured.name}
                defaultValue={fields.isFeatured.value}
              />
              <p className="text-xs text-muted-foreground">
                This will add the product on the home page
              </p>
              <p className="text-red-500 font-semibold">
                {fields.isFeatured.errors}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Image</Label>
              <input
                type="hidden"
                value={imageValue}
                key={fields.image.key}
                name={fields.image.name}
                defaultValue={fields.image.value}
              />

              <ProductImageUploader
                onUploadSuccess={({ previewUrl, uploadedUrlOrKey }) => {
                  setImagePreviewUrl(previewUrl); // used to show image
                  setImageValue(uploadedUrlOrKey); // submitted in form
                }}
              />
              <p className="text-red-500 font-semibold">
                {fields.image.errors}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full border-2 border-black border-t-transparent h-4 w-4" />
                Creating...
              </span>
            ) : (
              "Create Product"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ProductCreatePage;
