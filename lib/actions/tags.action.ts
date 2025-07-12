'use server';

import User from '@/database/user.model';
import { connectToDataBase } from '../mongoose';
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from './shared.types';
import Tag, { ITag } from '@/database/tag.model';
import { FilterQuery } from 'mongoose';
import Question from '@/database/question.model';
import escapeStringRegexp from 'escape-string-regexp';

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDataBase();

    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error('User not found');

    // Find interactions for the user and group by tags...
    // Interaction...

    return [
      { _id: '1', name: 'tag1' },
      { _id: '2', name: 'tag2' },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDataBase();
    const { searchQuery, filter, page = 1, pageSize = 20 } = params;
    const skipAmount = (page - 1) * pageSize;
    const escapedSearchQuery = escapeStringRegexp(searchQuery || '');
    const query: FilterQuery<typeof Tag> = {};
    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(escapedSearchQuery, 'i') } }];
    }
    let sortOptions = {};

    switch (filter) {
      case 'popular':
        sortOptions = { questions: -1 };
        break;
      case 'recent':
        sortOptions = { createdOn: -1 };
        break;
      case 'name':
        sortOptions = { name: 1 };
        break;
      case 'old':
        sortOptions = { createdOn: 1 };
        break;

      default:
        break;
    }

    const tags = await Tag.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);
    const totalTags = await Tag.countDocuments(query);
    const isNext = totalTags > skipAmount + pageSize;
    return { tags, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDataBase();
    const { tagId, searchQuery, page = 1, pageSize = 10 } = params;
    const skipAmount = (page - 1) * pageSize;
    const tagFilter: FilterQuery<ITag> = { _id: tagId };
    const tag = await Tag.findOne(tagFilter).populate({
      path: 'questions',
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: 'i' } }
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize,
      },
      populate: [
        { path: 'tags', model: Tag, select: '_id name' },
        { path: 'author', model: User, select: '_id clerk_id picture name' },
      ],
    });

    const reqTag = await Tag.findById(tagId);
    const isNext = reqTag.questions.length > skipAmount + pageSize;

    if (!tag) throw new Error('Tag not found');

    const questions = tag.questions;
    return { tagTitle: tag.name, questions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getPopularTags() {
  try {
    connectToDataBase();
    const popularTags = await Tag.aggregate([
      { $project: { name: 1, totalQuestions: { $size: '$questions' } } },
      { $sort: { totalQuestions: -1 } },
      { $limit: 5 },
    ]);
    return popularTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
