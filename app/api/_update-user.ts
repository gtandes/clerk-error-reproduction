import { NextResponse, NextRequest } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  console.log("API endpoint hit");

  const { userId } = auth();
  console.log(userId);

  if (!userId) return NextResponse.redirect(new URL("/sign-in", req.url));

  // const formData = await req.formData();
  // const firstName = formData.get("firstName");

  const { bio } = await req.json();

  const params = {
    firstName: bio !== null ? String(bio) : undefined,
  };

  console.log(params);

  const user = await clerkClient.users.updateUser(userId, params);

  // res.status(200).json({ message: "Hello from my API route!" });

  return NextResponse.json({ user });
}
