
import { FC } from "react";
import CreateBiography from "./Biography";

interface ProfileHeaderProps {
  // user: User | null;
}

const ProfileHeader: FC<ProfileHeaderProps> = () => {
  // const ownerAddress = user?.web3Wallets[0].web3Wallet!;
  // const ownerData = await getUserData(ownerAddress);
  // console.log(user);

  return (
    <article className='mx-auto my-[1vh] mb-16 flex max-h-[35vh] max-w-full flex-col items-start justify-start gap-[1.5rem] text-left text-[1rem]  text-ffffff-100'>
      <span className='relative flex flex-col self-stretch gap-4 justify-items-center text-a4b4c3'>
        <CreateBiography />
      </span>
    </article>
  );
};

export default ProfileHeader;
