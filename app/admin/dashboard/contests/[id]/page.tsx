import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ContestEditForm from "@/components/custom/admin/ContestEditForm";


export default async function EditContestPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await prisma.contest.findUnique({
    where: { id },
  });

  if (!data) notFound();

  return (
    <ContestEditForm
      data={{
        ...data,
        description: data.description ?? "",
        longDescription: data.longDescription ?? "",
        rules: data.rules ?? [],
        terms: data.terms ?? [],
        isFeatured: data.isFeatured ?? false,
        showTicketsSoldBar: data.showTicketsSoldBar ?? false,
      }}
    />
  );
}
