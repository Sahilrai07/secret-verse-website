import React from 'react'
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import VendorEditForm from '@/components/custom/admin/VendorEditForm';

const getVendorDataById = async (vendorId: string) => {
  const data = await prisma.vendor.findUnique({
    where: {
      id: vendorId,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
};

const VendorEditRoute = async ({ params }: { params: { id: string } }) => {
    const vendorData = await getVendorDataById(params.id);
  return (
    <>
      <VendorEditForm data={vendorData} />
    </>
  );
}

export default VendorEditRoute