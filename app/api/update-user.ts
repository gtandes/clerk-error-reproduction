import { auth, clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("API endpoint hit");

  // const { userId } = auth();
  // console.log(userId);

  const { userId } = getAuth(req);
  if (!userId) return NextResponse.redirect("/sign-in");

  // const formData = await req.formData();
  // const firstName = formData.get("firstName");

  const { bio } = await req.json();

  const params = {
    firstName: bio !== null ? String(bio) : undefined,
  };

  console.log(params);

  const updateUser = await clerkClient.users.updateUser(userId, params);

  // res.status(200).json({ message: "Hello from my API route!" });

  return NextResponse.json({ updateUser });
}
