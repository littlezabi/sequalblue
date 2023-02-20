import jwt from "jsonwebtoken";
import { PRIVATE_JWT } from "$env/static/private";
export const generateToken = (user: any) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      country: user.country,
    },
    PRIVATE_JWT,
    {
      expiresIn: "365d",
    }
  );
};
