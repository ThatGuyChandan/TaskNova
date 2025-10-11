import { Schema, model } from 'mongoose';
const ticketSchema = new Schema({
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
}, { timestamps: true });
const Ticket = model('Ticket', ticketSchema);
export default Ticket;
