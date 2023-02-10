<script lang="ts">
  import { cookiesOptions, WEBSITE_NAME } from "$lib/constants";
  import userIcon from "$lib/assets/user-alt.svg";
  import lockIcon from "$lib/assets/lock.svg";
  import axios from "axios";
  import Cookies from "js-cookie";
  import { USER_UPDATE, USER_CONTEXT, ADD_MESSAGE } from "$lib/context/store";
  import { onMount } from "svelte";
  import { setForm } from "$lib/common";
  import { goto } from "$app/navigation";
  onMount(()=>{
    if($USER_CONTEXT){
     window.location.href = '/sign-out?r=/sign-in'
    }
  })
  let message: any = false;
  export let data: any = "";
  $: ({ __redirect__ } = data);
  let loading: boolean = false;
  let username: string = "";
  let password: string = "";
  let keepMeLogged = true
  const handleLogin = async () => {
    if (username === undefined || username === "") {
      message = "Enter your username!";
      return 0;
    }
    if (password === undefined || password === "") {
      message = "Enter your password!";
      return 0;
    }
    loading = true;
    const form = setForm({ username, password });
    await axios
      .post("/api/user?sign-in=1", form)
      .then((e) => {
        loading = false;
        if (e.status === 200) {
          const _user = e.data;
          let options_ = {}
          ADD_MESSAGE({message: "Succesfully Logged!", variant: 'success'})
          if(!keepMeLogged) options_ = {expires: 1}
          Cookies.set("user_session", JSON.stringify(_user), {...cookiesOptions, ...options_});
          USER_UPDATE(_user);
          goto(__redirect__ ? __redirect__ : "/")
          return 1;
        } else if (e.status === 422 || e.status === 404) throw e;
      })
      .catch((e) => {
        loading = false;
        console.error(e);
        message = {
          message:
            e.response.data?.message ?? "Error occured during processing!",
          variant: "error",
        };
        ADD_MESSAGE({message: e.response.data?.message ?? "Error occured during processing!", variant: 'error'})
      });
  };
  
</script>
<div class="h100 dfc-c sign-view">
  <div class="sign-page-back">
    <img src="/images/sign-back.jpg" alt="sign-back" />
    <div class="page-layer" />
  </div>
  <div class="page-size">
    <div class="form-view fade-in">
      <h3>SIGN IN TO {WEBSITE_NAME}</h3>
      <h5>
        Login to your profile and get full access to our products and buy
        things, Inspiration and community.
      </h5>
      <form autoComplete="off" on:submit|preventDefault={handleLogin}>
        <div class="flex a90023">
          <img src={userIcon} alt="user" />
          <input
            type="text"
            name="username"
            id="username"
            bind:value={username}
            placeholder="Enter username or email address"
            required
          />
        </div>
        <div class="flex a90023">
          <img src={lockIcon} alt="user" />
          <input
            type="password"
            name="re-password"
            bind:value={password}
            placeholder="Your password"
            required
          />
        </div>
        <div class="a9382nck">
          <input type="checkbox" checked={true} on:change={(e) => keepMeLogged = e.target.checked} name="keep-me-logged" id="check-box" />
          <label for="check-box">Keep me logged!</label>
        </div>
        <div class="dfc-c">
          <button type="submit" disabled={loading}>
            {#if loading === true}
              <div class="loading-spinner" />
            {:else}
              JOIN US
            {/if}
          </button>
        </div>
        {#if message}
          <span class={message.variant}>
            {message.message}
          </span>
        {/if}
        <p class="a83x08">
          I forgot my password
          <a href="/forgot-password"> click here to reset. </a>
        </p>
        <p class="a83x08">
          not a member yet?
          <a href="/sign-up"> Sign up. </a>
        </p>
      </form>
    </div>
  </div>
</div>
