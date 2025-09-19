"use client";

import { createAdnin } from "@/app/actions/creaateAdminActionts";
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
import { adminUserSchema } from "@/lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useActionState } from "react";

const CreateAdminPage = () => {
  const [lastStatus, action, isPending] = useActionState(
    createAdnin,
    undefined
  );
  const [form, fields] = useForm({
    lastResult: lastStatus,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: adminUserSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex  items-center  gap-4">
        <Button variant={"ghost"} size={"icon"}>
          <Link href={"/admin/dashboard/admins"}>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">New Admin User</h1>
      </div>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Admin Details</CardTitle>
          <CardDescription>
            In this form you can create your new admin user
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
                defaultValue={fields.name.initialValue}
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
                defaultValue={fields.email.initialValue}
              />
              <p className="text-red-500 font-semibold">
                {fields.email.errors}
              </p>
            </div>
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
                defaultValue={fields.phone.initialValue}
              />
              <p className="text-red-500 font-semibold">
                {fields.phone.errors}
              </p>
            </div>
            <div className="flex flex-col my-2 gap-3">
              <Label>Password</Label>
              <Input
                type="text"
                placeholder="admin123"
                className="w-full"
                key={fields.password.key}
                name={fields.password.name}
                defaultValue={fields.password.initialValue}
              />
              <p className="text-red-500 font-semibold">
                {fields.password.errors}
              </p>
            </div>
            <div className="flex flex-col my-2 gap-3">
              <Label> Confirm Password</Label>
              <Input
                type="text"
                placeholder="admin123"
                className="w-full"
                key={fields.confirmPassword.key}
                name={fields.confirmPassword.name}
                defaultValue={fields.confirmPassword.initialValue}
              />
              <p className="text-red-500 font-semibold">
                {fields.confirmPassword.errors}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className=" animate-spin" />
                <span>Creating...</span>
              </>
            ) : (
              "Create Admin"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default CreateAdminPage;
