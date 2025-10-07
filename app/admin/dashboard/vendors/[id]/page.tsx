import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import VendorEditForm from "@/components/custom/admin/VendorEditForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

const getVendorDataById = async (vendorId: string) => {
  const data = await prisma.vendor.findUnique({
    where: { id: vendorId },
  });

  if (!data) {
    return notFound();
  }

  return data;
};

const VendorEditRoute = async ({ params }: PageProps) => {
  const { id } = await params; // ✅ Await params first
  const vendorData = await getVendorDataById(id);

  return <VendorEditForm data={vendorData} />;
};

export default VendorEditRoute;
