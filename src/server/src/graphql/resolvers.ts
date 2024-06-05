import { User } from "../entity/User";

export const userResolver = async () => {
  return await User.createQueryBuilder("user")
    .getMany()
};
