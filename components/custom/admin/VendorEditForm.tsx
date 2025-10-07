"use client";

import { useActionState, useState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { adminVendorSchema } from "@/lib/zodSchemas";
import { editVendorById } from "@/actions/admin/creaateAdminActionts";

import { Vendor } from "@prisma/client";
import Link from "next/link";
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Loader2 } from "lucide-react";

interface IEditProps {
  data: Vendor;
}

const VendorEditForm = ({ data }: IEditProps) => {
  const [lastStatus, action, isPending] = useActionState(
    editVendorById,
    undefined
  );

  const [form, fields] = useForm({
    lastResult: lastStatus,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: adminVendorSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <input type="hidden" name={"vendorId"} value={data.id} />

      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant={"ghost"} size={"icon"}>
          <Link href={"/admin/dashboard/vendor"}>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">
          Edit Vendor User
        </h1>
      </div>

      {/* Card */}
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Vendor Details</CardTitle>
          <CardDescription>
            Update the vendor information below.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col">
            {/* Name */}
            <div className="flex flex-col my-2 gap-3">
              <Label>Name</Label>
              <Input
                type="text"
                placeholder="Vendor Name"
                className="w-full"
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={data.name}
              />
              <p className="text-red-500 font-semibold">{fields.name.errors}</p>
            </div>

            {/* Email */}
            <div className="flex flex-col my-2 gap-3">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="vendor@example.com"
                className="w-full"
                key={fields.email.key}
                name={fields.email.name}
                defaultValue={data.email}
              />
              <p className="text-red-500 font-semibold">
                {fields.email.errors}
              </p>
            </div>

            {/* Phone */}
            <div className="flex flex-col my-2 gap-3">
              <Label>Phone No.</Label>
              <Input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]{10}"
                placeholder="Phone Number"
                className="w-full"
                maxLength={10}
                key={fields.phone.key}
                name={fields.phone.name}
                defaultValue={data.phone ?? ""}
              />
              <p className="text-red-500 font-semibold">
                {fields.phone.errors}
              </p>
            </div>

            {/* Address */}
            <div className="flex flex-col my-2 gap-3">
              <Label>Address</Label>
              <Textarea
                placeholder="Vendor Address..."
                className="w-full"
                key={fields.address.key}
                name={fields.address.name}
                defaultValue={data.address ?? ""}
              />
              <p className="text-red-500 font-semibold">
                {fields.address.errors}
              </p>
            </div>

            {/* City / State / Country */}
            <div className="flex flex-col sm:flex-row w-full items-center gap-6">
              <div className="flex flex-col my-2 gap-3 w-full">
                <Label>City</Label>
                <Input
                  type="text"
                  placeholder="Enter City"
                  className="w-full"
                  key={fields.city.key}
                  name={fields.city.name}
                  defaultValue={data.city ?? ""}
                />
                <p className="text-red-500 font-semibold">
                  {fields.city.errors}
                </p>
              </div>
              <div className="flex flex-col my-2 gap-3 w-full">
                <Label>State</Label>
                <Input
                  type="text"
                  placeholder="Enter State"
                  className="w-full"
                  key={fields.state.key}
                  name={fields.state.name}
                  defaultValue={data.state ?? ""}
                />
                <p className="text-red-500 font-semibold">
                  {fields.state.errors}
                </p>
              </div>
              <div className="flex flex-col my-2 gap-3 w-full">
                <Label>Country</Label>
                <Input
                  type="text"
                  placeholder="Enter Country"
                  className="w-full"
                  key={fields.country.key}
                  name={fields.country.name}
                  defaultValue={data.country ?? ""}
                />
                <p className="text-red-500 font-semibold">
                  {fields.country.errors}
                </p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button className="" disabled={isPending} type="submit">
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin w-4 h-4" />
                Editing...
              </span>
            ) : (
              "Edit Vendor"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default VendorEditForm;
