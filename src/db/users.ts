import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    // setting select false means when we fetch user data password is not coming with the data
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionTaken: { type: String, select: false },
  },
  userId: { type: String, required: true },
  orgName: { type: String, required: true },
  orgId: { type: String, required: true },
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();

export const getUserByEmail = (email: string) => {
  return UserModel.findOne({ email });
};

export const getUserBySessionToken = (sessionToken: string) => {
  return UserModel.findOne({ 'authentication.sessionToken': sessionToken });
};

export const getUserById = (id: string) => {
  return UserModel.findById(id);
};

export const createUser = (values: Record<string, any>) => {
  return new UserModel(values).save().then((user) => user.toObject());
};

export const deleteUserById = (id: string) => {
  return UserModel.findOneAndDelete({ _id: id });
};

export const updateUserById = (id: string, values: Record<string, any>) => {
  return UserModel.findByIdAndUpdate(id, values);
};
