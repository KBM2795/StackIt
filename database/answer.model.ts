import { Document, Schema, model, models } from 'mongoose';

export interface Ianswer extends Document {
  author: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  content: string;
  createdAt: Date;
}

const answerSchema = new Schema<Ianswer>({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  content: { type: String, required: true },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

const Answer = models.Answer || model<Ianswer>('Answer', answerSchema);

export default Answer;
