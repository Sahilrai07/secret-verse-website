import EditForm from "@/components/custom/admin/EditForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

const getProductDataById = async (productId: string) => {
  const data = await prisma?.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
};

const EditRoute = async ({ params }: { params: { id: string } }) => {
  const productData = await getProductDataById(params.id);

  return (
    <>
      <EditForm data={productData} />
    </>
  );
};

export default EditRoute;
