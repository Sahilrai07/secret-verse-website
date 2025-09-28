"use client";

import { editContestById } from "@/actions/admin/productActions";
import { Button } from "@/components/ui/button";
import { ContestStatus, ContestTimeType } from "@/lib/generated/prisma";
import {
  contestSchema,
  ContestStatusEnum,
  ContestTimeTypeEnum,
} from "@/lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronDownIcon, ChevronLeft } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import React, { useActionState, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import ProductImageUploader from "./ProductImageUploader";

interface IEditPropsContest {
  data: {
    id:string
    title: string;
    description: string;
    longDescription: string;
    image: string;
    prizePool: number;
    ticketPrice: number;
    totalTickets: number;
    drawDate: Date | null;
    category: ContestTimeType;
    status: ContestStatus;
    rules?: string[];
    terms?: string[];
    showTicketsSoldBar?: boolean;
    isFeatured?: boolean;
  };
}
const ContestEditForm = ({ data }: IEditPropsContest) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    data.drawDate ?? undefined
  );
  const [showUploader, setShowUploader] = useState(false);
  const [category, setCategory] = useState<string>(data.category);
  const [status, setStatus] = useState<string>(data.status);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(data.image);
  const [imageValue, setImageValue] = useState<string>(data.image); // ✅
  const [lastStatus, action, isPending] = useActionState(
    // createContest,
    editContestById,
    undefined
  );
  const [form, fields] = useForm({
    lastResult: lastStatus,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: contestSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <input type="hidden" name="contestId" value={data.id} />
      <div className="flex items-center gap-4">
        <Button variant={"ghost"} size={"icon"}>
          <Link href={"/admin/dashboard/contests"}>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">Edit Contest</h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Content Details</CardTitle>
          <CardDescription>
            In this form you can create your content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label htmlFor={fields.title.name}>Title</Label>
              <Input
                type="text"
                key={fields.title.key}
                name={fields.title.name}
                defaultValue={data.title}
                placeholder="Win a brand new iPhone 15!"
              />
              <p className="text-sm text-red-500">{fields.title.errors}</p>
            </div>
            {/* Description */}
            <div className="flex flex-col gap-3 w-full">
              <Label htmlFor={fields.description.name}>Description</Label>
              <Textarea
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={data.description}
                placeholder="A quick overview of the contest—what users can win, and how."
              />
              <p className="text-sm text-red-500">
                {fields.description.errors}
              </p>
            </div>

            {/* Long Description */}
            <div className="flex flex-col gap-3 w-full">
              <Label htmlFor={fields.longDescription.name}>
                Long Description
              </Label>
              <Textarea
                key={fields.longDescription.key}
                name={fields.longDescription.name}
                defaultValue={data.longDescription}
                rows={5}
                placeholder="Provide detailed information about how to participate, eligibility criteria, prize distribution, and any additional terms."
              />
              <p className="text-sm text-red-500">
                {fields.longDescription.errors}
              </p>
            </div>

            <div className="flex w-full items-center justify-center gap-6 flex-col">
              {/* Prize Pool */}
              <div className="flex flex-col gap-3 w-full">
                <Label htmlFor={fields.prizePool.name}>Prize Pool</Label>
                <Input
                  type="number"
                  key={fields.prizePool.key}
                  name={fields.prizePool.name}
                  defaultValue={data.prizePool}
                  placeholder="₹10000"
                />
                <p className="text-sm text-red-500">
                  {fields.prizePool.errors}
                </p>
              </div>

              {/* Ticket Price */}
              <div className="flex flex-col gap-3 w-full">
                <Label htmlFor={fields.ticketPrice.name}>Ticket Price</Label>
                <Input
                  type="number"
                  key={fields.ticketPrice.key}
                  name={fields.ticketPrice.name}
                  defaultValue={data.ticketPrice}
                  placeholder="₹100"
                />
                <p className="text-sm text-red-500">
                  {fields.ticketPrice.errors}
                </p>
              </div>

              {/* Total Tickets */}
              <div className="flex flex-col gap-3 w-full">
                <Label htmlFor={fields.totalTickets.name}>Total Tickets</Label>
                <Input
                  type="number"
                  key={fields.totalTickets.key}
                  name={fields.totalTickets.name}
                  defaultValue={data.totalTickets}
                  placeholder="1000"
                />
                <p className="text-sm text-red-500">
                  {fields.totalTickets.errors}
                </p>
              </div>
            </div>
            <div className="flex w-full items-center justify-center gap-6 flex-col md:flex-row">
              {/* Draw Date */}
              <div className="flex flex-col my-2 gap-3 w-full">
                <Label htmlFor="drawDate" className="px-1">
                  Draw Date
                </Label>

                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="drawDate"
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
                      onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        setOpen(false);
                      }}
                      // ✅ Show dropdowns for month and year
                      captionLayout="dropdown"
                      fromYear={today.getFullYear()}
                      toYear={today.getFullYear() + 10}
                      disabled={(d) => d < today}
                    />
                  </PopoverContent>
                </Popover>

                {/* Hidden input for form submission */}
                <input
                  type="hidden"
                  name={fields.drawDate.name}
                  value={date ? date.toISOString().split("T")[0] : ""}
                  key={fields.drawDate.key}
                />

                <p className="text-red-500 font-semibold">
                  {fields.drawDate.errors}
                </p>
              </div>

              {/* Category */}
              <div className="flex flex-col my-2 gap-3 w-full">
                <Label htmlFor={fields.category.name}>Category</Label>
                <Select
                  value={category}
                  onValueChange={(value) => {
                    setCategory(value);
                    const input = document.querySelector(
                      `input[name="${fields.category.name}"]`
                    ) as HTMLInputElement;
                    if (input) input.value = value;
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {ContestTimeTypeEnum.options.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input
                  type="text"
                  key={fields.category.key}
                  name={fields.category.name}
                  defaultValue={data.category}
                  className="hidden"
                />
                <p className="text-sm text-red-500">{fields.category.errors}</p>
              </div>

              {/* Status */}
              <div className="flex flex-col my-2 gap-3 w-full">
                <Label htmlFor={fields.status.name}>Status</Label>
                <Select
                  value={status}
                  onValueChange={(value) => {
                    setStatus(value);
                    const input = document.querySelector(
                      `input[name="${fields.status.name}"]`
                    ) as HTMLInputElement;
                    if (input) input.value = value;
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {ContestStatusEnum.options.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input
                  type="text"
                  key={fields.status.key}
                  name={fields.status.name}
                  defaultValue={data.status}
                  className="hidden"
                />
                <p className="text-sm text-red-500">{fields.status.errors}</p>
              </div>
            </div>
            {/* Rules */}
            <div className="flex flex-col gap-3">
              <Label>Rules</Label>
              <Textarea
                name={fields.rules.name}
                defaultValue={
                  Array.isArray(fields.rules.initialValue)
                    ? fields.rules.initialValue.join("\n")
                    : typeof fields.rules.initialValue === "string"
                    ? fields.rules.initialValue
                    : ""
                }
                placeholder="Enter each rule on a new line"
                rows={4}
              />
              <p className="text-sm text-red-500">{fields.rules.errors}</p>
            </div>

            {/* Terms */}
            <div className="flex flex-col gap-3">
              <Label>Terms</Label>
              <Textarea
                name={fields.terms.name}
                defaultValue={
                  Array.isArray(fields.terms.initialValue)
                    ? fields.terms.initialValue.join("\n")
                    : typeof fields.terms.initialValue === "string"
                    ? fields.terms.initialValue
                    : ""
                }
                placeholder="Enter each term on a new line"
                rows={4}
              />
              <p className="text-sm text-red-500">{fields.terms.errors}</p>
            </div>

            {/* Show Tickets Sold Bar */}
            <div className="flex  flex-col gap-2">
              <div className="flex items-center gap-2">
                <Switch
                  key={fields.showTicketsSoldBar.key}
                  name={fields.showTicketsSoldBar.name}
                  defaultChecked={data.showTicketsSoldBar ?? false}
                />
                <Label htmlFor={fields.showTicketsSoldBar.name}>
                  Show tickets sold bar (Optional)
                </Label>
              </div>
              <p className="text-xs text-muted-foreground">
                This will show the how much tickets are sold on each contests
              </p>
            </div>
            <div className="flex  flex-col gap-2">
              <div className="flex items-center gap-2">
                <Switch
                  name={fields.isFeatured.name}
                  defaultChecked={data.isFeatured ?? false}
                />
                <Label htmlFor={fields.isFeatured.name}>
                  Mark as featured (Optional)
                </Label>
              </div>
              <p className="text-xs text-muted-foreground">
                This will add the product on the home page
              </p>
            </div>

            {/* Image Upload */}
            <div className="flex flex-col gap-3">
              <Label className="mb-4">Upload Image</Label>
              {!showUploader && imageValue ? (
                <div className="flex flex-col items-start gap-2">
                  <img
                    src={imagePreviewUrl || imageValue}
                    alt="Uploaded product"
                    className="w-80 h-80 object-cover rounded-md border"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setShowUploader(true)}
                  >
                    Change Image
                  </Button>
                </div>
              ) : (
                <ProductImageUploader
                  onUploadSuccess={({ previewUrl, uploadedUrlOrKey }) => {
                    setImagePreviewUrl(previewUrl);
                    setImageValue(uploadedUrlOrKey);
                    setShowUploader(false); // hide uploader again
                  }}
                />
              )}
              <input
                type="hidden"
                name={fields.image.name}
                value={imageValue}
              />
              <p className="text-sm text-red-500">{fields.image.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full border-2 border-black border-t-transparent h-4 w-4" />
                Editing...
              </div>
            ) : (
              "Edit Contest"
            )}
          </Button>
          {/* <Button type="submit">Create</Button> */}
        </CardFooter>
      </Card>
    </form>
  );
};

export default ContestEditForm;
