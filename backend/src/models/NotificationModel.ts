import { Schema, model, Types } from 'mongoose';

interface INotification {
  userId: Types.ObjectId;
  event: string;
  message: string;
  read: boolean;
}

const notificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Notification = model<INotification>('Notification', notificationSchema);

export default Notification;
