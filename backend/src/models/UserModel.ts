import { Schema, model } from 'mongoose';

interface IUser {
  email: string;
  isSuperUser: boolean;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  isSuperUser: { type: Boolean, default: false },
});

const User = model<IUser>('User', userSchema);

export default User;
