import Question from '@/components/forms/Question';
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs';
import { Schema } from 'mongoose';
import { redirect } from 'next/navigation';

const Page = async () => {
  const { userId } = auth();
  if (!userId) redirect('/sign-in');

  const mongoUser: { _id: Schema.Types.ObjectId } | null = await getUserById({
    userId,
  });

  if (!mongoUser) {
    // Optionally, you can show a custom error page or message here
    // redirect('/sign-in');
    return null; // or return <div>User not found</div>;
  }

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>

      <div className="mt-9">
        <Question mongoUserId={mongoUser._id} />
      </div>
    </div>
  );
};

export default Page;
