'use client';
import { useEffect, useState } from 'react';
import { downvoteAnswer, upvoteAnswer } from '@/lib/actions/answer.action';
import {
  downvoteQuestion,
  upvoteQuestion,
} from '@/lib/actions/question.action';
import { formatAndDivideNumber } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { toggleSaveQuestion } from '@/lib/actions/user.action';
import { viewQuestion } from '@/lib/actions/interaction.action';
import { toast } from '../ui/use-toast';

type Props = {
  type: 'Question' | 'Answer';
  itemId: string;
  userId: string;
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasdownVoted: boolean;
  hasSaved?: boolean;
};

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasupVoted,
  downvotes,
  hasdownVoted,
  hasSaved,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (type === 'Question') {
      viewQuestion({
        userId: userId ? JSON.parse(userId) : undefined,
        questionId: JSON.parse(itemId),
      });
    }
  }, [itemId, pathname, router, userId, type]);

  const handleVote = async (voteType: 'upvote' | 'downvote') => {
    if (!userId || loading) return;
    setLoading(true);
    try {
      if (voteType === 'upvote') {
        if (type === 'Question') {
          await upvoteQuestion({
            userId: JSON.parse(userId),
            questionId: JSON.parse(itemId),
            path: pathname,
            hasupVoted,
            hasdownVoted,
          });
        }

        if (type === 'Answer') {
          await upvoteAnswer({
            userId: JSON.parse(userId),
            answerId: JSON.parse(itemId),
            path: pathname,
            hasupVoted,
            hasdownVoted,
          });
        }
      }

      if (voteType === 'downvote') {
        if (type === 'Question') {
          await downvoteQuestion({
            userId: JSON.parse(userId),
            questionId: JSON.parse(itemId),
            path: pathname,
            hasupVoted,
            hasdownVoted,
          });
        }

        if (type === 'Answer') {
          await downvoteAnswer({
            userId: JSON.parse(userId),
            answerId: JSON.parse(itemId),
            path: pathname,
            hasupVoted,
            hasdownVoted,
          });
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
    let title, description;
    if (voteType === 'upvote') {
      if (hasupVoted) {
        title = 'Upvote removed';
        description = 'Your upvote has been removed';
      } else {
        title = 'Upvote submitted';
        description = 'Your upvote has been submitted';
      }
    }
    if (voteType === 'downvote') {
      if (hasdownVoted) {
        title = 'Downvote removed';
        description = 'Your downvote has been removed';
      } else {
        title = 'Downvote submitted';
        description = 'Your downvote has been submitted';
      }
    }
    return toast({
      title,
      description,
    });
  };
  const handleSave = async () => {
    await toggleSaveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname,
    });
    toast({
      title: hasSaved ? 'Unsaved' : 'Saved',
      description: hasSaved
        ? 'Question has been unsaved'
        : 'Question has been saved',
    });
  };
  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasupVoted
                ? '/assets/icons/upvoted.svg'
                : '/assets/icons/upvote.svg'
            }
            width={18}
            height={18}
            alt="upvote"
            className={`cursor-pointer ${
              loading ? 'pointer-events-none opacity-50' : ''
            }`}
            onClick={() => handleVote('upvote')}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(upvotes)}
            </p>
          </div>
        </div>

        <div className="flex-center gap-1.5">
          <Image
            src={
              hasdownVoted
                ? '/assets/icons/downvoted.svg'
                : '/assets/icons/downvote.svg'
            }
            width={18}
            height={18}
            alt="downvote"
            className={`cursor-pointer ${
              loading ? 'pointer-events-none opacity-50' : ''
            }`}
            onClick={() => handleVote('downvote')}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>

      {type === 'Question' && (
        <Image
          src={
            hasSaved
              ? '/assets/icons/star-filled.svg'
              : '/assets/icons/star-red.svg'
          }
          width={18}
          height={18}
          alt="star"
          className="cursor-pointer"
          onClick={handleSave}
        />
      )}
    </div>
  );
};

export default Votes;
