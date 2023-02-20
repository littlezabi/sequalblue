<script lang="ts">
  import { SET_MODAL,CUSTOM_STATE, USER_UPDATE, ADD_MESSAGE } from "$lib/context/store";
  import axios from "axios";
  import userAltIcon from "$img/user.svg";
  import userIcon from "$lib/assets/user-alt.svg";
  import globeIcon from "$lib/assets/globe.svg";
  import { setForm } from "$lib/common";
  import { goto } from "$app/navigation";
  import { redirect } from "@sveltejs/kit";
  export let user:any = false;
  let loading = false;
  let message:any = false;
  const saveInfo = async (password: string) => {
    loading = true;
    await axios
      .post("/api/user?change-basic=1", setForm({
        firstname: user.firstname,
        lastname: user.lastname,
        country: user.country,
        password,
        _id: user._id,
        update_info: 1,
      }))
      .then((e) => {
        loading = false;
        message = { message: "Successfully Changed!", variant: "success" };
        ADD_MESSAGE(message)
        goto('/profile')
        location.reload()
      })
      .catch((e) => {
        console.error(e)
        loading = false;
        message = { message:e.response?.data?.message ?? "Error occured during processing!", variant: "error" };
        ADD_MESSAGE(message)
      });
  };
  $: if($CUSTOM_STATE.saveForm){
    saveInfo($CUSTOM_STATE.password)
  }
  const handleForm = (e: any) => {
      e.preventDefault();
      if (user.firstname === "" || user.firstname === undefined) {
        message = {
          message: "Please enter your firstname.",
          variant: "error",
        };
        ADD_MESSAGE(message)
        return 1;
      }
      if (user.lastname === "" || user.lastname === undefined) {
        message = {
          message: "Please enter your lastname.",
          variant: "error",
        };
        ADD_MESSAGE(message)
        return 1;
      }
      if (user.country === "" || user.country === undefined) {
        message = {
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
          name="firstname"
          placeholder="Your firstname"
          on:change={(e) => (user = { ...user, firstname: e.target?.value })}
          value={user.firstname}
          required
        />
      </div>
      <span>Enter your firstname.</span>
      <div class="flex a90023">
        <img src={userAltIcon} alt="user" />
        <input
          type="text"
          name="lastname"
          placeholder="Your last name"
          on:change={(e) => (user = { ...user, lastname: e.target?.value })}
          value={user.lastname}
          aria-label="lastname"
          required
        />
      </div>
      <span>Enter your lastname.</span>
      <div class="flex a90023">
        <img src={globeIcon} alt="user" />
        <input
          type="text"
          name="country"
          placeholder="Your country name"
          on:change={(e) => (user = { ...user, country: e.target?.value })}
          value={(user.country === 'false' ? 'world' : user.country === false ? 'world' : user.country)}
          required
        />
      </div>
      <span>Enter your country name.</span>
      {#if message}
        <p class="fz12 {message.variant}-text">{message.message}</p>
      {/if}
      <button type="submit" disabled={loading}>
        {#if loading} <div class="loading-spinner white" /> {:else} SAVE {/if}
      </button>
    </form>
  </div>
</div>
