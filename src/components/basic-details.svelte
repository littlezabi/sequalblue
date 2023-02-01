<script lang="ts">
  import { SET_MODAL, USER_CONTEXT,CUSTOM_STATE, USER_UPDATE } from "$lib/context/store";
  import axios from "axios";
  import userIcon from "$lib/assets/user-alt.svg";
  import globeIcon from "$lib/assets/globe.svg";
  import Cookies from "js-cookie";
  import { setForm } from "$lib/common";
  import { cookiesOptions } from "$lib/constants";
  let user = $USER_CONTEXT;
  let loading = false;
  let inlineMessage: { variant: string; message: string } | boolean = false;
  let message: { message: string; variant: string } | boolean = false;
  const saveInfo = async (password: string) => {
    loading = true;
    await axios
      .post("/api/user?change-basic=1", setForm({
        fullname: user.fullname,
        country: user.country,
        password,
        _id: user._id,
        update_info: 1,
      }))
      .then((e) => {
        console.log(e.data)
        loading = false;
        message = { message: "Successfully Changed!", variant: "success" };
        Cookies.set("user_session", JSON.stringify(e.data), cookiesOptions);
        USER_UPDATE(e.data);
      })
      .catch((e) => {
        console.error(e)
        loading = false;
        message = { message:e.response?.data?.message ?? "Error occured during processing!", variant: "error" };
      });
  };
  $: if($CUSTOM_STATE.saveForm){
    saveInfo($CUSTOM_STATE.password)
  }
  const handleForm = (e: any) => {
      e.preventDefault();
      inlineMessage = false;
      if (user.fullname === "" || user.fullname === undefined) {
        message = {
          message: "Please enter your fullname!",
          variant: "error",
        };
        return 1;
      }
      if (user.country === "" || user.country === undefined) {
        message ={
          message: "Please enter your country name!",
          variant: "error",
        };
        return 1;
      }
      SET_MODAL({
        isClosing: false,
        show: true,
        title: "Password required!",
        children: 'password-modal'
      });
  };
</script>

<div class="sign-view">
  <div class="form-view fade-in">
    <h2 class="mb-20">User Profile</h2>
    <form on:submit|preventDefault={handleForm} autoComplete="off">
      <div class="mb-20 a-9x9x9x9">
        <span class="a-clowa">Email address:</span>
        <span>{user.email}</span>
      </div>
      <div class="flex a90023">
        <img src={userIcon} alt="user" />
        <input
          type="text"
          name="full-name"
          placeholder="Your fullname"
          on:change={(e) => (user = { ...user, fullname: e.target?.value })}
          value={user.fullname}
          required
        />
      </div>
      <div class="flex a90023">
        <img src={globeIcon} alt="user" />
        <input
          type="text"
          name="country"
          placeholder="Your country name"
          on:change={(e) => (user = { ...user, country: e.target?.value })}
          value={user.country}
          required
        />
      </div>
      {#if message}
        <p class="fz12 {message.variant}-text">{message.message}</p>
      {/if}
      <button type="submit" disabled={loading}>
        {#if loading} <div class="loading-spinner white" /> {:else} SAVE {/if}
      </button>
      <div class="error-msg">
        {#if inlineMessage}
          <span class="{inlineMessage.variant}-text">
            {inlineMessage.message}
          </span>
        {/if}
      </div>
    </form>
  </div>
</div>
