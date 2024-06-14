"use client";
import { useState } from "react";
import { PlaceholdersAndVanishInput } from "./placeholders-and-vanish-input";
import { useAuth, useUser } from "@clerk/nextjs";

export default function CreateBiography() {
  const { user } = useUser();
  const { getToken } = useAuth();

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
    const token = await getToken();

    // form.append("token", token);
    // make an object with the form data
    const formDataObject = {
      username: user?.username ?? "",
      bio: userData.bio,
      profile: user?.imageUrl ?? "",
    };

    console.log("TOKEN", token);
    try {
      const fetchRes = await (
        await fetch("/api/update-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formDataObject),
        })
      ).json();

      console.log(fetchRes);

      console.log("submitted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PlaceholdersAndVanishInput
      placeholders={[""]}
      onChange={handleChange}
      onSubmit={onSubmit}
    />
  );
}
