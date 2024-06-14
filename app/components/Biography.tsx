"use client";

import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { PlaceholdersAndVanishInput } from "./placeholders-and-vanish-input";
import { useUser } from "@clerk/nextjs";

export default function CreateBiography() {
  const { user } = useUser();
  const [cookies, setCookie] = useCookies(["profile", "__session"]);

  const placeholders = [
    "To update your bio:",
    "Click here",
    "Type and hit enter",
    "Or click the arrow on the right",
    "Skale NFTs to the moon!",
  ];

  const [userData, setUserData] = useState({
    // username: "",
    bio: "",
    // profile: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, bio: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData();
    form.append("username", user?.username ?? "");
    form.append("bio", userData.bio);
    form.append("profile", user?.imageUrl ?? "");
    form.append("token", cookies["__session"]);

    try {
      console.log("submitting form TRY", cookies);
      const { data: respData } = await axios.post("/api/update-user", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": cookies["__session"],
          Authorization: `Bearer ${cookies["__session"]}`,
        },
      });

      console.log(respData);

      setCookie("profile", respData.data.data, {
        expires: new Date(new Date().setHours(new Date().getHours() + 2)),
      });

      console.log("submitted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PlaceholdersAndVanishInput
      placeholders={placeholders}
      onChange={handleChange}
      onSubmit={onSubmit}
    />
  );
}
