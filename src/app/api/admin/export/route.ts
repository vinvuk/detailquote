import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * GET /api/admin/export?type=users|quotes
 * Exports data as CSV.
 */
export async function GET(request: Request) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (type === "users") {
      return exportUsers();
    } else if (type === "quotes") {
      return exportQuotes();
    } else {
      return NextResponse.json(
        { error: "Invalid type. Use 'users' or 'quotes'" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error exporting data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Exports users as CSV.
 */
async function exportUsers() {
  const users = await prisma.user.findMany({
    include: {
      business: true,
      _count: { select: { quotes: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const headers = ["ID", "Email", "Name", "Business Name", "Business Phone", "Quotes", "Created At"];
  const rows = users.map((user) => [
    user.id,
    user.email,
    user.name || "",
    user.business?.name || "",
    user.business?.phone || "",
    user._count.quotes,
    user.createdAt.toISOString(),
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) => row.map(escapeCSV).join(",")),
  ].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="detailquote-users-${formatDate()}.csv"`,
    },
  });
}

/**
 * Exports quotes as CSV.
 */
async function exportQuotes() {
  const quotes = await prisma.quote.findMany({
    include: {
      user: {
        include: { business: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const headers = [
    "ID",
    "Customer Name",
    "Customer Email",
    "Vehicle",
    "Total",
    "Status",
    "Views",
    "Business",
    "User Email",
    "Created At",
  ];

  const rows = quotes.map((quote) => [
    quote.id,
    quote.customerName || "",
    quote.customerEmail || "",
    [quote.vehicleYear, quote.vehicleMake, quote.vehicleModel].filter(Boolean).join(" ") || quote.vehicleSize,
    Number(quote.total).toFixed(2),
    quote.status,
    quote.viewCount,
    quote.user.business?.name || "",
    quote.user.email,
    quote.createdAt.toISOString(),
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) => row.map(escapeCSV).join(",")),
  ].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="detailquote-quotes-${formatDate()}.csv"`,
    },
  });
}

/**
 * Escapes a value for CSV.
 */
function escapeCSV(value: string | number): string {
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Formats current date for filename.
 */
function formatDate(): string {
  return new Date().toISOString().split("T")[0];
}
