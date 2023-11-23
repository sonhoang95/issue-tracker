import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  const { title, description } = await request.json();

  const validation = issueSchema.safeParse({ title, description });

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 401 });
  }

  const newIssue = await prisma.issue.create({ data: { title, description } });
  return NextResponse.json(newIssue, { status: 201 });
}
