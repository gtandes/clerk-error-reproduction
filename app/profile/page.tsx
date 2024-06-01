import type { Metadata, NextPage } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NFTFilterValues } from "@/lib/validators/nfts";
import { filterExploreNFTs } from "@/hooks/filterExploreNFTs";
import EmptyState from "@/components/shared/EmptyState";
import { currentUser } from "@clerk/nextjs";
import ProfileCollectionNFTsFilterModalTrigger from "@/components/Profile/ProfileCollectionNFTsFilterModalTrigger";
import ProfileCollectedNFTForm from "@/components/Profile/ProfileCollectedNFTForm";
import ProfileCollectedNFTResults from "@/components/Profile/ProfileCollectedNFTResults";
import ProfileCreatedNFTsResults from "@/components/Profile/ProfileCreatedNFTsResults";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import MintComponent from "@/components/Profile/MintComponent";

export const metadata: Metadata = {
  title: "Profile Page",
};

interface ProfilePageProps {
  searchParams: {
    search?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  };
}

const ProfilePage: NextPage<ProfilePageProps> = async ({
  searchParams: { search, sort, minPrice, maxPrice, page },
}) => {
  const nftFilterValues: NFTFilterValues = {
    search,
    sort,
    minPrice,
    maxPrice,
  };

  const user = await currentUser();
  const ownerAddress = user?.web3Wallets[0].web3Wallet!;

  return (
    <main className="flex h-auto w-full flex-col items-center justify-center tracking-[normal]">
      <ProfileHeader user={user} />

      <Tabs
        defaultValue="collected"
        className="!m-[0] flex w-full flex-col items-start justify-start gap-[1.5rem_0rem]"
      >
        <section className="flex w-full max-w-full items-start justify-start self-stretch px-[4rem] pt-[1.5rem] text-center font-b1 text-[1rem] text-ffffff-100 mq925:pl-[2rem] mq925:pr-[2rem]">
          <TabsList className="no-scrollbar flex w-full flex-row items-start justify-start gap-[0_2rem] self-stretch border-b-[2px] border-solid border-e5caff [background:linear-gradient(180deg,_rgba(171,_88,_252,_0),_rgba(171,_88,_252,_0.15))] sm:flex-wrap mq450:h-[3rem] mq450:overflow-x-auto mq450:pt-[0.75rem]">
            <TabsTrigger value="collected" className="tracking-[0.25rem]">
              <span className="tracking-[0.5rem]">collecte</span>d
            </TabsTrigger>

            <TabsTrigger value="created" className="tracking-[0.25rem]">
              <span className="tracking-[0.5rem]">create</span>d
            </TabsTrigger>

            <TabsTrigger value="offers" className="tracking-[0.25rem]">
              <span className="tracking-[0.5rem]">offer</span>s
            </TabsTrigger>

            <TabsTrigger value="activity" className="tracking-[0.25rem]">
              <span className="tracking-[0.5rem]">activit</span>y
            </TabsTrigger>

            <TabsTrigger value="mint" className="tracking-[0.25rem]">
              <span className="tracking-[0.5rem]">min</span>t
            </TabsTrigger>
          </TabsList>
        </section>

        <TabsContent
          value="collected"
          className="flex max-w-full flex-row items-start justify-start self-stretch px-[4rem] text-left font-b1 text-[1.25rem] text-ffffff-100 mq925:pl-[2rem] mq925:pr-[2rem]"
        >
          <section className="mt-[2rem] flex h-auto max-w-full flex-1 flex-col items-center justify-center gap-[0rem_1.5rem] px-[0rem] pb-[0rem] pt-[0rem] sm:flex-row sm:items-start sm:justify-between">
            <ProfileCollectionNFTsFilterModalTrigger />
            <ProfileCollectedNFTForm
              id="profile-collections"
              filterMethod={filterExploreNFTs}
              className="hidden sm:flex"
            />
            <ProfileCollectedNFTResults
              filterValues={nftFilterValues}
              page={page ? parseInt(page) : undefined}
              ownerAddress={ownerAddress}
            />
          </section>
        </TabsContent>

        <TabsContent
          value="created"
          className="flex max-w-full flex-row items-start justify-start self-stretch px-[4rem] text-left font-b1 text-[1.25rem] text-ffffff-100 mq925:pl-[2rem] mq925:pr-[2rem]"
        >
          <section className="flex h-auto max-w-full flex-1 flex-col items-center justify-center gap-[0rem_1.5rem] px-[0rem] pb-[0rem] pt-[0rem] sm:flex-row sm:items-start sm:justify-between">
            <ProfileCollectionNFTsFilterModalTrigger />
            <ProfileCollectedNFTForm
              id="profile-created"
              filterMethod={filterExploreNFTs}
              className="hidden sm:flex"
            />
            <ProfileCreatedNFTsResults
              filterValues={nftFilterValues}
              page={page ? parseInt(page) : undefined}
              ownerAddress={ownerAddress}
            />
          </section>
        </TabsContent>

        <TabsContent
          value="offers"
          className="flex max-w-full flex-row items-start justify-start self-stretch px-[4rem] text-left font-b1 text-[1.25rem] text-ffffff-100 mq925:pl-[2rem] mq925:pr-[2rem]"
        >
          <section className=" flex h-auto max-w-full flex-1 flex-col items-center justify-center gap-[0rem_1.5rem] px-[0rem] pb-[0rem] pt-[0rem] sm:flex-row sm:items-start sm:justify-between">
            {/* TODO: offers route in rest api */}
            {/* <OwnerOffersTable ownerAddress={ownerAddress} />
             */}
            <EmptyState />
          </section>
        </TabsContent>

        <TabsContent
          value="activity"
          className="flex max-w-full flex-row items-start justify-start self-stretch px-[4rem] text-left font-b1 text-[1.25rem] text-ffffff-100 mq925:pl-[2rem] mq925:pr-[2rem]"
        >
          <section className="flex h-auto max-w-full flex-1 flex-col items-center justify-center gap-[0rem_1.5rem] sm:flex-row sm:items-start sm:justify-between">
            {/* <CollectionActivityTable
              chainId={""}
              nftIDs={[]}
              collectionAddress={""}
            /> */}
            <EmptyState />
          </section>
        </TabsContent>

        <TabsContent
          value="mint"
          className="flex max-w-full flex-row items-start justify-start self-stretch px-[4rem] text-left font-b1 text-[1.25rem] text-ffffff-100 mq925:pl-[2rem] mq925:pr-[2rem]"
        >
          <section className=" flex h-auto max-w-full flex-1 flex-col items-center justify-center gap-[0rem_1.5rem] px-[0rem] pb-[0rem] pt-[0rem] sm:flex-row sm:items-start sm:justify-between">
            <MintComponent/>
          </section>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default ProfilePage;
