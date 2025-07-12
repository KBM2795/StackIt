import Profile from '@/components/forms/Profile';
import { getUserInfo } from '@/lib/actions/user.action';
import { ParamsProps } from '@/types';
import { auth } from '@clerk/nextjs';

const page = async ({ params }: ParamsProps) => {
  const { userId } = auth();
  if (!userId) return null;
  const mongoUser = await getUserInfo({ userId });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>

      <div className="mt-9">
        <Profile clerkId={userId} user={JSON.stringify(mongoUser.user)} />
      </div>
    </>
  );
};

export default page;
