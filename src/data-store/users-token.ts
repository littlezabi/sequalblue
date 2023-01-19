import jwt from "jsonwebtoken";

export const generateToken = (user: any) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      country: user.country,
    },
    'mysecretkey',
    {
      expiresIn: "365d",
    }
  );
};
