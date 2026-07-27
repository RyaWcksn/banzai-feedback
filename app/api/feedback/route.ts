import { NextResponse } from "next/server";
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function POST(request: Request) {
	const body = await request.json();
	const feedback = await prisma.feedback.create({
		data: {
			name: body.name || null,
			message: body.message,
		},
	});
	return NextResponse.json(feedback, { status: 201 });
}
