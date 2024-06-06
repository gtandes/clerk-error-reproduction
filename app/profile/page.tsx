import type { Metadata, NextPage } from "next";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { NFTFilterValues } from "@/lib/validators/nfts";
// import { filterExploreNFTs } from "@/hooks/filterExploreNFTs";
// import EmptyState from "@/components/shared/EmptyState";
import { currentUser } from "@clerk/nextjs";
import ProfileHeader from "../components/ProfileHeader";
// import ProfileCollectionNFTsFilterModalTrigger from "@/components/Profile/ProfileCollectionNFTsFilterModalTrigger";
// import ProfileCollectedNFTForm from "@/components/Profile/ProfileCollectedNFTForm";
// import ProfileCollectedNFTResults from "@/components/Profile/ProfileCollectedNFTResults";
// import ProfileCreatedNFTsResults from "@/components/Profile/ProfileCreatedNFTsResults";
// import ProfileHeader from "@/components/Profile/ProfileHeader";
// import MintComponent from "@/components/Profile/MintComponent";

export const metadata: Metadata = {
  title: "Profile Page",
};

interface ProfilePageProps {}

const ProfilePage: NextPage<ProfilePageProps> = ({}) => {
  // const user = await currentUser();
  // const ownerAddress = user?.web3Wallets[0].web3Wallet!;

  return (
    <main className='flex h-auto w-full flex-col items-center justify-center tracking-[normal]'>
      {/* <ProfileHeader user={user} /> */}
      <ProfileHeader/>
    </main>
  );
};

export default ProfilePage;
