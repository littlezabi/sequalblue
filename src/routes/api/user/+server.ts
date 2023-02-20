import db from "$db/database";
import { Users } from "$db/models";
import { generateToken } from "$db/users-token";
import { randomChar } from "$lib/common";
import { cookiesOptions } from "$lib/constants";
import bcrypt from "bcryptjs";
await db.connect();
export const POST = async ({ request, url,cookies }: any) => {
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
    const firstname = data.get("firstname");
    const lastname = data.get("lastname");
    const country = data.get("country");
    const _id = data.get("_id");
    const confirm =
      firstname === "" ||
      lastname === "" ||
      country === "" ||
      password === "" ||
      firstname === undefined ||
      lastname === undefined ||
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
        await Users.updateOne({ _id: user._id }, { firstname, lastname, country });
        const object = {
          firstname,
          lastname,
          email: user.email,
          _id,
          avatar: user.avatar,
          country,
          createdAt: user.createdAt,
        };
        const res = JSON.stringify({
          object,
          token: generateToken(object),
        })
        cookies.set('user', res, cookiesOptions)
        return new Response(
          res,
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
  if (url.searchParams.get("sign-up")) {
    const firstname = data.get("firstname");
    const lastname = data.get("lastname");
    const email = data.get("email");
    const country = data.get("country");
    const password = data.get("password");
    const repassword = data.get("repassword");
    const notify = data.get("notify");
    const confirm =
      password !== repassword ||
      firstname === "" ||
      email === "" ||
      lastname === "";
    if (confirm) {
      return new Response(
        JSON.stringify({
          message:
            "Error on user information please check it again and submit!",
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
        firstname,
        lastname,
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
          message: `An email has been sent to ${email}. Please check your email and confirm that it is you.`,
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
  // process.exit()
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
  });
};

const GET = async ({ url }: any) => {
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
