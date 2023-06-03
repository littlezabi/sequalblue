<script lang="ts">
  import { WEBSITE_NAME, WEBSITE_URL } from "$lib/constants";
  import userIcon from "$lib/assets/user-alt.svg";
  import lockIcon from "$lib/assets/lock.svg";
  import { ADD_MESSAGE } from "$lib/context/store";
  import type { ActionData } from "./$types";
  import PageMeta from "$compo/page-meta.svelte";
  import GoogleBtn from "$compo/google-btn.svelte";
  export let form: ActionData;
  let message: any = false;
  if (form?.success == true) {
    message = { message: form?.message, variant: "success" };
    ADD_MESSAGE(message);
  }
  if (form?.success == 2) {
    message = { message: form?.message, variant: "error" };
    ADD_MESSAGE(message);
  }
  let loading: boolean = false;
  let email: string = "";
  let password: string = "";
  let keepMeLogged = true;
  const handleLogin = async (event:any) => {
    if (email === undefined || email === "") {
      message = "Enter your email address!";
      ADD_MESSAGE({ message, variant: "alert" });
      return 0;
    }
    if (password === undefined || password === "") {
      message = "Enter your password!";
      ADD_MESSAGE({ message, variant: "alert" });
      return 0;
    }
    loading = true;
    event.target?.submit();
  };
</script>

<svelte:head>
  <PageMeta
    title={`SIGN IN | ${WEBSITE_NAME.toUpperCase()}`}
    description={"By signing for our website, you will gain access to a range of additional features and benefits that are not available to unregistered users. These features may include personalized content, saved preferences, increased functionality, and exclusive access to certain areas of the site."}
    keywords={"form,input,label,button,username,password,email,address,city,state,zip code,country,phone number,date of birth,gender,terms and conditions,privacy policy,submit,register,create account,sign up,join now,become a member,new user,account information,confirmation"}
    createdAt={Date()}
    updatedAt={Date()}
    ogType={"website"}
    image={WEBSITE_URL + "/src/lib/assets/user.svg"}
    page_url={`${WEBSITE_URL}sign-in`}
  />
</svelte:head>
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
      <GoogleBtn return_uri="/sign-in?/google" />
      <form
        autoComplete="on"
        method="post"
        action="?/login"
        on:submit|preventDefault={handleLogin}
      >
        <div class="flex a90023">
          <img src={userIcon} alt="user" />
          <input
            type="text"
            name="email"
            id="email"
            bind:value={email}
            placeholder="Enter your email address"
            required
          />
        </div>
        <div class="flex a90023">
          <img src={lockIcon} alt="user" />
          <input
            type="password"
            name="password"
            bind:value={password}
            placeholder="Your password"
            required
          />
        </div>
        <div class="a9382nck">
          <input
            type="checkbox"
            checked={true}
            on:change={(e) => (keepMeLogged = e.target?.checked)}
            name="keep-me-logged"
            id="check-box"
          />
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
