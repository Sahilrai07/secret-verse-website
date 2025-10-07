import EditForm from "@/components/custom/admin/EditForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

const getProductDataById = async (productId: string) => {
  const data = await prisma?.product.findUnique({
    where: { id: productId },
  });

  if (!data) return notFound();
  return data;
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditRoute({ params }: PageProps) {
  const { id } = await params;
  const productData = await getProductDataById(id);

  return <EditForm data={productData} />;
}
