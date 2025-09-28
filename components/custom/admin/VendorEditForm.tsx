"use client";

import { UserRole } from "@/lib/generated/prisma";
import { adminVendorSchema } from "@/lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState, useState } from "react";
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
import Link from "next/link";
import { ChevronDownIcon, ChevronLeft, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { editVendorById } from "@/actions/admin/creaateAdminActionts";

interface IEditProps {
  data: {
    name: string;
    id: string;
    email: string;
    password: string;
    role: UserRole;
    phone: number | null;
    createdAt: Date;
    updatedAt: Date;
    address: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    dateOfBirth: Date | null;
    totalTickets: number;
    totalPayments: number;
    lastActive: Date | null;
  };
}

const VendorEditForm = async ({ data }: IEditProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    data.dateOfBirth ? new Date(data.dateOfBirth) : undefined
  );
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
      <div className="flex  items-center  gap-4">
        <Button variant={"ghost"} size={"icon"}>
          <Link href={"/admin/dashboard/vendor"}>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">
          Edit Vendor User
        </h1>
      </div>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Vendor Details</CardTitle>
          <CardDescription>
            In this form you can update your new vendor user
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div className="flex flex-col my-2 gap-3">
              <Label>Name</Label>
              <Input
                type="text"
                placeholder="Admin 1"
                className="w-full"
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={data.name}
              />
              <p className="text-red-500 font-semibold">{fields.name.errors}</p>
            </div>
            <div className="flex flex-col my-2 gap-3">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="admin@gamil.com"
                className="w-full"
                key={fields.email.key}
                name={fields.email.name}
                defaultValue={data.email}
              />
              <p className="text-red-500 font-semibold">
                {fields.email.errors}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row w-full items-center gap-6">
              <div className="flex flex-col my-2 gap-3 w-full">
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
                  defaultValue={data.phone?.toString() ?? ""}
                />
                <p className="text-red-500 font-semibold">
                  {fields.phone.errors}
                </p>
              </div>
              <div className="flex flex-col my-2 gap-3 w-full">
                <Label htmlFor="dateOfBirth" className="px-1">
                  Date of birth
                </Label>

                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="dateOfBirth"
                      type="button"
                      className="w-full justify-between font-normal"
                    >
                      {date ? date.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        setOpen(false);
                      }}
                      disabled={(d) => d > new Date()}
                    />
                  </PopoverContent>
                </Popover>

                {/* 🔥 Hidden input to submit selected date to the form */}
                <input
                  type="hidden"
                  name={fields.dateOfBirth.name}
                  value={date ? date.toISOString().split("T")[0] : ""}
                  key={fields.dateOfBirth.key}
                />

                <p className="text-red-500 font-semibold">
                  {fields.dateOfBirth.errors}
                </p>
              </div>
            </div>
            <div className="flex flex-col my-2 gap-3">
              <Label>Address</Label>
              <Textarea
                placeholder="Write your vendor address right here..."
                className="w-full"
                key={fields.address.key}
                name={fields.address.name}
                defaultValue={data.address ?? ""}
              />
              <p className="text-red-500 font-semibold">
                {fields.address.errors}
              </p>
            </div>
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
                  placeholder="Enter State"
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
                <span className="animate-spin rounded-full border-2 border-black border-t-transparent h-4 w-4" />
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
