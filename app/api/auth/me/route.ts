import { COOKIE_NAME } from "@/constant";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  console.log(cookieStore);
  const token = cookieStore.get(COOKIE_NAME);

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { value } = token;

  const secret = process.env.JWT_SECRET || "";

  try {
    const decoded = verify(value, secret) as { name: string; email: string; id: string };

    const response = {
      name: decoded.name,
      email: decoded.email,
    };

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 400 });
  }
}
