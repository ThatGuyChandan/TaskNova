import { Schema, model, Types } from 'mongoose';

interface ITicket {
  projectId: Types.ObjectId;
  title: string;
  description: string;
  status: 'Proposed' | 'To-Do' | 'In-Progress' | 'Done' | 'Deployed';
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
}

const ticketSchema = new Schema<ITicket>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ['Proposed', 'To-Do', 'In-Progress', 'Done', 'Deployed'],
      default: 'Proposed',
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

const Ticket = model<ITicket>('Ticket', ticketSchema);

export default Ticket;