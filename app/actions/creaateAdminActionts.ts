"use server";

import { getCurrentUser } from "@/lib/getCurrentUser";
import { adminUserSchema, adminVendorSchema } from "@/lib/zodSchemas";
// Make sure adminUserSchema includes 'address' and 'city' fields
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";

export const createAdnin = async (prevState: unknown, formData: FormData) => {
  const user = await getCurrentUser();

  const isAdmin = user?.role === "ADMIN";
  const isSuperAdmin = user?.role === "SUPERADMIN";

  if (!user || (!isAdmin && !isSuperAdmin)) {
    return redirect("/login");
  }

  const submission = parseWithZod(formData, {
    schema: adminUserSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const hashedPassword = await hashPassword(submission.value.password);

  await prisma.admin.create({
    data: {
      name: submission.value.name,
      email: submission.value.email,
      phone: Number(submission.value.phone),
      password: hashedPassword,
      lastLogin: new Date(),
      //   role: "SUPERADMIN",
    },
  });

  //   toast.success("Admin User is Created!");

  redirect("/admin/dashboard/admins");
};

export const createAdminVendor = async (
  prevState: unknown,
  formData: FormData
) => {
  const user = await getCurrentUser();

  const isAdmin = user?.role === "ADMIN";
  const isSuperAdmin = user?.role === "SUPERADMIN";

  if (!user || (!isAdmin && !isSuperAdmin)) {
    return redirect("/login");
  }

  const submission = parseWithZod(formData, {
    schema: adminVendorSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const hashedPassword = await hashPassword(submission.value.password);

  await prisma.vendor.create({
    data: {
      name: submission.value.name,
      email: submission.value.email,
      phone: Number(submission.value.phone),
      password: hashedPassword,
      address: submission.value.address,
      city: submission.value.city,
      state: submission.value.state,
      country: submission.value.country,
      dateOfBirth: submission.value.dateOfBirth,
    },
  });

  redirect("/admin/dashboard/vendors");
};

export const editVendorById = async (
  prevState: unknown,
  formData: FormData
) => {
  const user = await getCurrentUser();

  const isAdmin = user?.role === "ADMIN";
  const isSuperAdmin = user?.role === "SUPERADMIN";

  if (!user || (!isAdmin && !isSuperAdmin)) {
    return redirect("/login");
  }

  const submission = parseWithZod(formData, {
    schema: adminVendorSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const vendorId = formData.get("vendorId") as string;

  await prisma.vendor.update({
    where: {
      id: vendorId,
    },
    data: {
      name: submission.value.name,
      email: submission.value.email,
      phone: Number(submission.value.phone),
      address: submission.value.address,
      dateOfBirth: submission.value.dateOfBirth,
      city: submission.value.city,
      state: submission.value.state,
      country: submission.value.country,
    },
  });

  redirect("/admin/dashboard/vendors");
};
