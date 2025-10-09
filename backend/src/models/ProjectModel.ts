import { Schema, model, Types } from 'mongoose';

interface IProject {
  name: string;
  description: string;
  user: Types.ObjectId;
  members: Types.ObjectId[];
}

const projectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

const Project = model<IProject>('Project', projectSchema);

export default Project;