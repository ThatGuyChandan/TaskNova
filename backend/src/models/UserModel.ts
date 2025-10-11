import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  isSuperUser: boolean;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  isSuperUser: { type: Boolean, default: false },
});

const User = model<IUser>('User', userSchema);

export default User;
