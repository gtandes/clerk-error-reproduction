import axios from "axios";
import { createRouter } from "next-connect";
import multer from "multer";
import { Blob } from "buffer";
import { prepareResponse } from "@/lib/utils";

const router = createRouter();

router.use(multer().any()).post(async (req, res) => {
  const { username, bio, token } = req.body;
  const formData = new FormData();

  formData.append("username", username);
  formData.append("bio", bio);
  formData.append("token", token);

  if (req.files[0]) {
    const fileData = req.files[0];

    formData.append("profile", new Blob([fileData.buffer]), {
      filename: fileData.originalname,
      type: fileData.mimetype,
    });
  }

  const { data: respData } = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/profile/update",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
      },
    },
  );

  return prepareResponse(res, respData, 200, true);
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

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
