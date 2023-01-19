import db from "$db/database";
import { Users } from "$db/models";
import { generateToken } from "$db/users-token";
import { randomChar } from "$lib/common";
import bcrypt from "bcryptjs";
await db.connect();
export const POST = async ({ request, url }) => {
  const data = await request.formData();
  if (url.searchParams.get("change-setting")) {
    const notifyme = data.get("notifyme");
    const _id = data.get("_id");
    if (_id) {
      await Users.update({ _id }, { notifyme });
      return new Response(
        JSON.stringify({
          message: "Setting saved!",
        }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({
          message: "User not found!",
        }),
        { status: 404 }
      );
    }
  }
  if (url.searchParams.get("change-password")) {
    const old_password = data.get("old_password");
    const new_password = data.get("new_password");
    const re_password = data.get("re_password");
    const _id = data.get("_id");
    if (
      old_password != "" &&
      new_password != "" &&
      new_password === re_password
    ) {
      const user = await Users.findOne({
        _id,
        active: 1,
      });
      if (user) {
        if (bcrypt.compareSync(old_password, user.password)) {
          const updated = await Users.update(
            { _id: user._id },
            { password: bcrypt.hashSync(new_password, 12) }
          );
          if (updated) {
            return new Response(
              JSON.stringify({
                message: "successfully changed!",
              }),
              { status: 200 }
            );
          } else {
            return new Response(
              JSON.stringify({
                message: "Error occured during process!",
              }),
              { status: 422 }
            );
          }
        } else {
          return new Response(
            JSON.stringify({
              message:
                "Your old password is incorrect please check and try again!",
            }),
            { status: 422 }
          );
        }
      } else {
        return new Response(
          JSON.stringify({
            message: "User not found!",
          }),
          { status: 404 }
        );
      }
    } else {
      return new Response(
        JSON.stringify({
          message: "input data is incorrect! check and try again.",
        }),
        { status: 422 }
      );
    }
  }
  if (url.searchParams.get("change-basic")) {
    const password = data.get("password");
    const fullname = data.get("fullname");
    const country = data.get("country");
    const _id = data.get("_id");
    const confirm =
      fullname === "" ||
      country === "" ||
      password === "" ||
      fullname === undefined ||
      password === undefined ||
      country === undefined;
    if (confirm) {
      return new Response(
        JSON.stringify({
          message: "information is missing please try again!",
        }),
        { status: 422 }
      );
    }
    const user = await Users.findOne({ _id });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        await Users.update({ _id: user._id }, { fullname, country });
        const c_ = {
          username: user.username,
          fullname,
          email: user.email,
          _id: user._id,
          country,
        };
        return new Response(
          JSON.stringify({
            ...c_,
            token: generateToken(c_),
          }),
          { status: 200 }
        );
      } else {
        return new Response(
          JSON.stringify({
            message:
              "incorrect password! please check your password and try again.",
          }),
          { status: 422 }
        );
      }
    } else {
      return new Response(
        JSON.stringify({
          message: "User not found please login again and try!",
        }),
        { status: 404 }
      );
    }
  }
  if (url.searchParams.get("sign-in")) {
    let user = data.get("username");
    const password = data.get("password");
    const confirm = password === "" || user === "";
    user = user.trim().toLowerCase();
    if (confirm) {
      return new Response(
        JSON.stringify({
          message:
            "Error on user information please check it again and submit!",
        }),
        { status: 422 }
      );
    }
    const getUser = await Users.findOne(
      {
        $or: [
          {
            username: user,
          },
          { email: user },
        ],
        active: true,
      },
      {
        status: 1,
        username: 1,
        fullname: 1,
        email: 1,
        _id: 1,
        country: 1,
        password: 1,
        createdAt: 1,
      }
    );
    if (getUser) {
      if (bcrypt.compareSync(password, getUser.password)) {
        const c_ = {
          username: getUser.username,
          fullname: getUser.fullname,
          email: getUser.email,
          _id: getUser._id,
          country: getUser.country,
          createdAt: getUser.createdAt,
        };
        return new Response(
          JSON.stringify({
            ...c_,
            token: generateToken(c_),
          }),
          { status: 200 }
        );
      } else {
        return new Response(
          JSON.stringify({
            message: "your password is incorrect!",
          }),
          { status: 404 }
        );
      }
    } else {
      return new Response(
        JSON.stringify({
          message: "username or password is incorrect! try again",
        }),
        { status: 404 }
      );
    }
  }
  if (url.searchParams.get("sign-up")) {
    let username = data.get("username");
    const email = data.get("email");
    const fullname = data.get("fullname");
    const country = data.get("country");
    const password = data.get("password");
    const repassword = data.get("repassword");
    const notify = data.get("notify");
    username = username.trim().toLowerCase();
    const confirm =
      password !== repassword ||
      username === "" ||
      email === "" ||
      fullname === "";
    if (confirm) {
      return new Response(
        JSON.stringify({
          message:
            "Error on user information please check it again and submit!",
        }),
        { status: 422 }
      );
    }
    const isExist = await Users.findOne({ username }, { username: 1, _id: 0 });
    if (isExist) {
      return new Response(
        JSON.stringify({
          message:
            "Error username is already taken please choose another username!",
        }),
        { status: 422 }
      );
    }
    const isEmailExist = await Users.findOne({ email }, { _id: 0, email: 1 });
    if (isEmailExist)
      return new Response(
        JSON.stringify({
          message: "Email is registered! login with email or choose new",
        }),
        { status: 422 }
      );
    try {
      const user = new Users({
        username: username.trim().toLowerCase(),
        fullname,
        email,
        password: bcrypt.hashSync(password, 12),
        country,
        notifyme: notify,
        active: false,
        code: randomChar(25),
      });
      const createdUser = await user.save();
      // sendEmailTo("bigbro4564@gmail.com", "helloworld");
      return new Response(
        JSON.stringify({
          success: "successfully added!",
        }),
        { status: 200 }
      );
    } catch (e) {
      return new Response(
        JSON.stringify({
          message: "Error occured during sign up! try again later",
        }),
        { status: 500 }
      );
    }
  }
};

export const GET = async ({ request, url }) => {
  if (url.searchParams.get("is-user-exist")) {
    const isExist = await Users.findOne(
      { username: url.searchParams.get("is-user-exist") },
      { username: 1, _id: 0 }
    );
    return new Response(JSON.stringify({ isExist: isExist ? 0 : 1 }), {
      status: 200,
    });
  }
};
