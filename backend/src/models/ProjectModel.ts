import { Schema, model, Types } from 'mongoose';

interface IProject {
  name: string;
  description: string;
  createdBy: Types.ObjectId;
}

const projectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    description: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

const Project = model<IProject>('Project', projectSchema);

export default Project;
