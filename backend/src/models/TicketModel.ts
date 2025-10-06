import { Schema, model, Types } from 'mongoose';

interface ITicket {
  projectId: Types.ObjectId;
  title: string;
  description: string;
  status: 'open' | 'inprogress' | 'closed';
  updatedBy: Types.ObjectId;
}

const ticketSchema = new Schema<ITicket>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ['open', 'inprogress', 'closed'],
      default: 'open',
    },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

const Ticket = model<ITicket>('Ticket', ticketSchema);

export default Ticket;
