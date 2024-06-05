import { User } from "../entity/User";

export const addUserMutation = async (_, { firstName }) => {
  try {
    const user = new User();

    user.email = "email";
    user.password = "123";
    user.firstName = firstName;
    user.lastName = "lastName";
    user.admin = true;

    return await user.save();
  } catch (error) {
    console.log(error);
  }
};
