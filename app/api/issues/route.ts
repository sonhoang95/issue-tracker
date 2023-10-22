import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const { title, description } = await request.json();

  const validation = createIssueSchema.safeParse({ title, description });

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 401 });
  }

  const newIssue = await prisma.issue.create({ data: { title, description } });
  return NextResponse.json(newIssue, { status: 201 });
}
