"use client";

import { FC, useState } from "react";
import { useCookies } from "react-cookie";
import { useUser, useClerk, useSignUp } from "@clerk/clerk-react";
import axios from "axios";
import { PlaceholdersAndVanishInput } from "./placeholders-and-vanish-input";

interface CreateBiographyProps {}

const CreateBiography: FC<CreateBiographyProps> = ({}) => {
  const { user } = useUser();
  const [cookies, setCookie] = useCookies(["profile", "token"]);

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

    console.log(
      `submitting ${user?.username} - ${userData.bio} - ${user?.imageUrl}`
    );

    // try {
    //   const { data } = await axios.post(
    //     "app/api/update-user",
    //     {
    //       firstName: userData.bio,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     },
    //   );

    //   console.log(data);
    // } catch (error) {
    //   console.log("Error submitting form:", error);
    // }

    const form = new FormData();
    form.append("username", user?.username as string);
    form.append("bio", userData.bio);
    form.append("profile", user?.imageUrl as string);
    form.append("token", cookies["token"]);

    try {
      const { data: respData } = await axios.post("/api/profile-update", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": cookies["token"],
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
};

export default CreateBiography;
