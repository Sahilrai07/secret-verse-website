import { prisma } from "@/lib/prisma";
import ExcelJS from "exceljs";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany();

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Users");

  worksheet.columns = [
    { header: "ID", key: "id", width: 36 },
    { header: "Name", key: "name", width: 20 },
    { header: "Email", key: "email", width: 25 },
    { header: "Phone", key: "phone", width: 18 },
    { header: "Gender", key: "gender", width: 12 },
    { header: "Address", key: "address", width: 30 },
    { header: "City", key: "city", width: 18 },
    { header: "State", key: "state", width: 18 },
    { header: "Country", key: "country", width: 18 },
    { header: "Date of Birth", key: "dateOfBirth", width: 18 },
    { header: "Role", key: "role", width: 12 },
    { header: "Is Verified", key: "isVerified", width: 12 },
    { header: "Coin Balance", key: "coinBalance", width: 15 },
    { header: "Created At", key: "createdAt", width: 20 },
  ];

  users.forEach((user) => {
    worksheet.addRow({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone ?? "Not Provided",
      gender: user.gender ?? "Not Provided",
      address: user.address ?? "Not Provided",
      city: user.city ?? "Not Provided",
      state: user.state ?? "Not Provided",
      country: user.country ?? "Not Provided",
      dateOfBirth: user.dateOfBirth
        ? new Date(user.dateOfBirth).toLocaleDateString()
        : "Not Provided",
      role: user.role,
      isVerified: user.isVerified ? "Yes" : "No",
      coinBalance: user.coinBalance,
      createdAt: new Date(user.createdAt).toLocaleString(),
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Disposition": "attachment; filename=users.xlsx",
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  });
}
