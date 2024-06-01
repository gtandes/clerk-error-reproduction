import SettingsPageComponent from "@/components/Profile/SettingsPage";
import { UserProfile } from "@clerk/nextjs";
import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Account Settings",
};

interface ProfilePageProps {
  params: { walletAddress: string };
}

const ProfilePage: NextPage<ProfilePageProps> = ({
  params: { walletAddress },
}) => {
  return (
    <div className="flex items-center justify-center">
      {/* <SettingsPageComponent walletAddress={walletAddress} /> */}
      <UserProfile />
    </div>
  );
};

export default ProfilePage;
