"use server";

import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import {
  contestSchema,
  productSchema,
  ContestStatusEnum,
  ContestTimeTypeEnum,
} from "@/lib/zodSchemas";
import { prisma } from "@/lib/prisma";
import { ContestStatus, ContestTimeType, Prisma } from "@/lib/generated/prisma";

export const createProduct = async (prevState: unknown, formData: FormData) => {
  const user = await getCurrentUser();

  if (!user || (user.role != "ADMIN" && user.role !== "SUPERADMIN")) {
    return redirect("/login");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.product.create({
    data: {
      name: submission.value.name,
      image: submission.value.image,
      description: submission.value.description,
      coinPrice: submission.value.coinPrice,
      price: submission.value.price,
      salePrice: submission.value.salePrice,
      stock: submission.value.stock,
      minCoins: submission.value.minCoinse,
      isFeatured: submission.value.isFeatured === true ? true : false,
    },
  });

  redirect("/admin/dashboard/products");
};

export const editProductById = async (prevState: any, formData: FormData) => {
  const user = await getCurrentUser();

  if (!user || (user.role != "ADMIN" && user.role !== "SUPERADMIN")) {
    return redirect("/login");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const productId = formData.get("productId") as string;

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: submission.value.name,
      image: submission.value.image,
      description: submission.value.description,
      coinPrice: submission.value.coinPrice,
      price: submission.value.price,
      salePrice: submission.value.salePrice,
      stock: submission.value.stock,
      minCoins: submission.value.minCoinse,
      isFeatured: submission.value.isFeatured === true ? true : false,
    },
  });

  redirect("/admin/dashboard/products");
};

// export const createContest = async (prevState: unknown, formData: FormData) => {
//   const user = await getCurrentUser();

//   if (!user || (user.role !== "ADMIN" && user.role !== "SUPERADMIN")) {
//     redirect("/login");
//   }

//   const submission = parseWithZod(formData, {
//     schema: contestSchema,
//   });

//   if (submission.status !== "success") {
//     return submission.reply();
//   }

//   const {
//     title,
//     description,
//     longDescription,
//     image,
//     prizePool,
//     ticketPrice,
//     totalTickets,
//     drawDate,
//     category,
//     status,
//     isFeatured,
//     rules,
//     terms,
//     showTicketsSoldBar,
//   } = submission.value;

//   try {
//     await prisma.contest.create({
//       data: {
//         title,
//         description,
//         longDescription,
//         image,
//         prizePool,
//         ticketPrice,
//         totalTickets,
//         drawDate,
//         category,
//         status,
//         isFeatured,
//         rules,
//         terms,
//         showTicketsSoldBar,
//       },
//     });

//     redirect("/admin/dashboard/contests");
//   } catch (err) {
//     return submission.reply({
//       formErrors: ["Failed to create contest. Please try again."],
//     });
//   }
// };

export const createContest = async (data: {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  prizePool: number;
  ticketPrice: number;
  totalTickets: number;
  drawDate: Date;
  category: string;
  status: string;
  isFeatured?: boolean; // ✅ optional
  rules?: string[]; // ✅ optional
  terms?: string[]; // ✅ optional
  showTicketsSoldBar?: boolean;
}) => {
  await prisma.contest.create({
    data: {
      ...data,
      category: data.category as ContestTimeType,
      status: data.status as ContestStatus,
    },
  });
  redirect("/admin/dashboard/contests");
};

export const editContestById = async (prevState: any, formData: FormData) => {
  const user = await getCurrentUser();

  if (!user || (user.role != "ADMIN" && user.role !== "SUPERADMIN")) {
    return redirect("/login");
  }

  const submission = parseWithZod(formData, {
    schema: contestSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const contestId = formData.get("contestId") as string;

  const {
    title,
    description,
    longDescription,
    image,
    prizePool,
    ticketPrice,
    totalTickets,
    drawDate,
    category,
    status,
    
    rules,
    terms,
    showTicketsSoldBar,
  } = submission.value;

  await prisma.contest.update({
    where: {
      id: contestId,
    },
    data: {
      title,
      description,
      longDescription,
      image,
      prizePool,
      ticketPrice,
      totalTickets,
      drawDate,
      category,
      status,
      rules,
      terms,
      showTicketsSoldBar,
      isFeatured: submission.value.isFeatured === true ? true : false,
    },
  });

  redirect("/admin/dashboard/contests");
};
