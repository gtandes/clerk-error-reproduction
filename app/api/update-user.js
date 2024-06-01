import { prepareResponse } from "@/utils/common";
import axios from "axios";
import { createRouter } from "next-connect";

const router = createRouter();

router.post(async (req, res) => {
  // const { body } = req;
  // const { data: respData } = await axios.post(
  //   process.env.NEXT_PUBLIC_API_URL + "/purchase/buy",
  //   body,
  // );

  // return prepareResponse(res, respData, 200, true);

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
});

export default router.handler({
  onError: (err, req, res, next) => {
    console.error(err);
    prepareResponse(res, {}, 500, {
      error: "unexpected error occurred.",
    });
  },
  onNoMatch: (req, res) => {
    prepareResponse(res, {}, 405, {
      error: "method not allowed.",
    });
  },
});
