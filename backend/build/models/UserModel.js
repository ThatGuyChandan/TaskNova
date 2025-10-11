import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    isSuperUser: { type: Boolean, default: false },
});
const User = model('User', userSchema);
export default User;
