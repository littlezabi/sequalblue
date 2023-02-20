import { Users } from "$db/models";
import { generateToken } from "$db/users-token";
import bcrypt from "bcryptjs";
import { randomChar } from "$lib/common";
import db from "$db/database";
await db.connect();
export const justLogin = async (email: any, password: any) => {
  const confirm = password === "" || email === "";
  if (confirm) {
    return {
      message: "Error on user information please check it again and submit!",
      status: 422,
    };
  }
  const getUser = await Users.findOne(
    { email, active: true },
    {
      status: 1,
      firstname: 1,
      lastname: 1,
      email: 1,
      _id: 1,
      avatar: 1,
      country: 1,
      password: 1,
      createdAt: 1,
    }
  );
  if (getUser) {
    if (bcrypt.compareSync(password, getUser.password)) {
      const _obj_ = {
        firstname: getUser.firstname,
        lastname: getUser.lastname,
        email: getUser.email,
        _id: getUser._id,
        avatar: getUser.avatar,
        country: getUser.country,
        createdAt: getUser.createdAt,
      };
      return {
        user: {
          object: _obj_,
          token: generateToken(_obj_),
        },
        status: 200,
        message: "Successfull Logged!",
      };
    } else {
      return {
        message: "your password is incorrect!",
        status: 404,
      };
    }
  } else {
    return {
      message: "email or password is incorrect! try again",
      status: 404,
    };
  }
};
export const googleAuth = async ({
  firstname,
  lastname,
  avatar,
  email,
}: {
  firstname: string;
  lastname: string;
  avatar: string;
  email: string;
}) => {
  const __user__ = await Users.findOne({ email: email }, { email: 1, _id: 0 });
  if (__user__) {
    await Users.updateOne(
      { email: __user__.email },
      { $set: { firstname, lastname, avatar } }
    );
    let _obj_ = {
      firstname,
      lastname,
      email,
      avatar,
      _id: __user__._id,
      country: __user__.country,
      createdAt: __user__.createdAt,
    };
    return {
      user: {
        object: _obj_,
        token: generateToken(_obj_),
      },
      success: true,
      message: "User successfully logged!",
    };
  } else {
    const user = new Users({
      firstname,
      lastname,
      email,
      password: bcrypt.hashSync(randomChar(25), 12),
      avatar,
      country: false,
      notifyme: true,
      active: true,
      code: randomChar(25),
    });
    const _new_ = await user.save();
    const _obj_ = {
      firstname,
      lastname,
      email,
      avatar,
      _id: _new_._id,
      country: _new_.country,
      createdAt: _new_.createdAt,
    };
    return {
      success: true,
      message: "New user were added successfully!",
      user: {
        object: _obj_,
        token: generateToken(_obj_),
      },
    };
  }
};
