<script lang="ts">
  import userLockIcon from "$lib/assets/user-lock.svg";
  import keyIcon from "$lib/assets/key.svg";
  import lockIcon from "$lib/assets/lock.svg";
  import { SET_MODAL, CUSTOM_STATE, USER_CONTEXT } from "$lib/context/store";
  import axios from "axios";
  import { setForm } from "$lib/common";
  let message: any = false;
  let loading = false;
  let userPassword = {
    old_password: undefined,
    new_password: undefined,
    re_password: undefined,
  };
  const handleChangePassword = () => {
    message = false;
    if (
      userPassword.old_password === undefined ||
      userPassword.old_password === ""
    ) {
      message = { message: "Old password is required!", variant: "error" };
      return 1;
    } else if (
      userPassword.new_password === undefined ||
      userPassword.new_password === ""
    ) {
      message = { message: "Enter your new password!", variant: "error" };
      return 1;
    } else if (userPassword.new_password.length < 8) {
      message = {
        message: "Password must be greater than 8 characters!",
        variant: "error",
      };
      return 1;
    } else if (userPassword.new_password !== userPassword.re_password) {
      message = {
        message: "Password not matched try again!",
        variant: "error",
      };
      return 1;
    }
    SET_MODAL({
      isClosing: false,
      show: true,
      title: "Confirm password change!",
      children: "confirm-password-change",
    });
  };
  const saveNewPassword = async () => {
    loading = true;
    await axios
      .post("/api/user?change-password=1", setForm({ ...userPassword, _id: $USER_CONTEXT._id }))
      .then((e) => {
        console.log(e.data)
        loading = false;
        message =  { message: e.data.message, variant: "success" };
      })
      .catch((e) => {
        loading = false;
        message = { message:e.response?.data?.message ?? "Error occured during processing!", variant: "error" };
      });
  };
  $: if ($CUSTOM_STATE.confirmPasswordChange) {
    saveNewPassword();
  }
</script>

<div class="sign-view">
  <div class="form-view fade-in">
    <h2>Change Password</h2>
    <form on:submit|preventDefault={handleChangePassword} autocomplete="off">
      <label class="mt-25 db fs-14 ml-10" for="password">
        Enter your old password.
      </label>
      <div class="flex a90023">
        <img src={userLockIcon} alt="userlock icon" />
        <input
          type="password"
          name="password"
          placeholder="Enter your old password."
          on:change={(e) =>
            (userPassword = {
              ...userPassword,
              old_password: e.target?.value,
            })}
          required
        />
      </div>
      <label class="mt-10 db fs-14 ml-10" for="password">
        Your new password.
      </label>
      <div class="flex a90023">
        <img src={lockIcon} alt="lockIcon icon" />
        <input
          type="password"
          name="new-password"
          placeholder="Enter your new password."
          on:change={(e) =>
            (userPassword = {
              ...userPassword,
              new_password: e.target?.value,
            })}
          required
        />
      </div>
      <label class="mt-10 db fs-14 ml-10" for="password">
        Re-enter your new password.
      </label>
      <div class="flex a90023">
        <img src={keyIcon} alt="key icon" />
        <input
          type="password"
          name="re-new-password"
          placeholder="Enter your new password again."
          on:change={(e) =>
            (userPassword = {
              ...userPassword,
              re_password: e.target?.value,
            })}
          required
        />
      </div>
      <div class="error-msg">
        {#if message}
          <span class={`${message.variant}-text`}>
            {message.message}
          </span>
        {/if}
      </div>
      <button type="submit" disabled={loading}>
        {#if loading}
          <div class="loading-spinner" />
        {:else}
          Change Password
        {/if}
      </button>
      <p class="a83x08">
        I forgot my old password
        <a href="/user/forgot-password">click here to reset.</a>
      </p>
    </form>
  </div>
</div>
