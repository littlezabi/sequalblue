<script lang="ts">
  import { SPECIAL_CHARS, WEBSITE_NAME, WEBSITE_URL } from "$lib/constants";
  import axios from "axios";
  import userIcon from "$img/user-alt.svg";
  import userAltIcon from "$img/user.svg";
  import envelop from "$img/envelop.svg";
  import lockIcon from "$img/lock.svg";
  import globeIcon from "$img/globe.svg";
  import keyIcon from "$img/key.svg";
  import PageMeta from "$compo/page-meta.svelte";
  import type { ActionData, PageData } from "./$types";
  import { ADD_MESSAGE } from "$lib/context/store";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import GoogleBtn from "$compo/google-btn.svelte";
  import { setForm } from "$lib/common";
  let success: boolean = false;
  let message: any = false;
  let loading: boolean = false;
  let firstname: string = "";
  let lastname: string = "";
  let email: string = "";
  let country: string = "";
  let password: string = "";
  let repassword: string = "";
  let notify: boolean = false;
  export let form: ActionData;
  export let data: PageData;
  if (form?.success == true) {
    success = true;
    ADD_MESSAGE({ message: form?.message, variant: "success" });
  }
  if (form?.success == 2) {
    ADD_MESSAGE({ message: form?.message, variant: "error" });
  }
  onMount(async () => {
    if (form?.success == true) {
      await goto(data?.__redirect__ ? data?.__redirect__ : "/");
    }
  });
  const handleSignUp = async (e: any) => {
    message = false;
    try {
      if (firstname === undefined || firstname === "") {
        message = {
          message: "Username is required! Please enter a unique username",
          variant: "error",
        };
        throw message;
      }
      if (email === undefined || email === "") {
        message = {
          message: "Please enter your email address!",
          variant: "error",
        };
        throw message;
      }
      if (lastname === undefined || lastname === "") {
        message = {
          message: "Please enter your lastname!",
          variant: "error",
        };
        throw message;
      }
      if (country === undefined || country === "") {
        message = {
          message: "Please enter your country name!",
          variant: "error",
        };
        throw message;
      }
      if (password === undefined || password === "" || password.length < 8) {
        message = {
          message: "Please enter a password! minimum 8 characters is required",
          variant: "error",
        };
        throw message;
      }
      if (password !== repassword) {
        message = {
          message: "password not matched please enter password again!",
          variant: "error",
        };
        throw message;
      }
    } catch (e: any) {
      ADD_MESSAGE(e);
      return 0;
    }
    const user = {
      firstname,
      lastname,
      email,
      country,
      password,
      repassword,
      notify,
    };
    const form = setForm(user);
    await axios
      .post("/api/user?sign-up=1", form)
      .then((e) => {
        ADD_MESSAGE({
          message: e.data?.message ?? "Successfully submitted!",
          variant: "success",
        });
        message = {
          message: e.data?.message ?? "Successfully submitted!",
          variant: "success",
        };
        loading = false;
        success = true;
      })
      .catch((e) => {
        ADD_MESSAGE({
          message:
            e.response.data?.message ?? "Error occured during processing!",
          variant: "error",
        });
        message = {
          message:
            e.response.data?.message ?? "Error occured during processing!",
          variant: "error",
        };
        console.error(e, e.response.status);
        loading = false;
      });
  };
</script>

<svelte:head>
  <PageMeta
    title={`SIGN UP | ${WEBSITE_NAME.toUpperCase()}`}
    description={"By signing up for our website, you will gain access to a range of additional features and benefits that are not available to unregistered users. These features may include personalized content, saved preferences, increased functionality, and exclusive access to certain areas of the site."}
    html_desc={"Once you have signed up, you will have the ability to personalize your experience on our website, which can save you time and effort in the long run."}
    keywords={"form,input,label,button,username,password,email,address,city,state,zip code,country,phone number,date of birth,gender,terms and conditions,privacy policy,submit,register,create account,sign up,join now,become a member,new user,account information,confirmation"}
    pub_time={"2022-11-03T12:20:00.000Z"}
    ogType={"website"}
    image={WEBSITE_URL + "/src/lib/assets/user.svg"}
    page_url={`${WEBSITE_URL}sign-up`}
  />
</svelte:head>
<div class="m100 dfc-c sign-view">
  <div class="sign-page-back">
    <img src="/images/sign-back.jpg" alt="sign-back" />
    <div class="page-layer" />
  </div>
  <div class="page-size to-center">
    <div class="form-view fade-in">
      <h3>BECOME A {WEBSITE_NAME} MEMBER</h3>
      <h5>
        Create your {WEBSITE_NAME} Member profile and get full access to our products
        and buy things, Inspiration and community.
      </h5>
      {#if success === false}
        <GoogleBtn return_uri="/user-auth?/google" />
        <form autoComplete="off" on:submit|preventDefault={handleSignUp}>
          <div class="flex a90023">
            <img src={userIcon} alt="user" />
            <input
              type="text"
              name="firstname"
              id="firstname"
              bind:value={firstname}
              placeholder="Your first name"
              aria-label="first name"
              required
            />
          </div>
          <div class="flex a90023">
            <img src={userAltIcon} alt="user" />
            <input
              type="text"
              name="lastname"
              placeholder="Your last name"
              bind:value={lastname}
              aria-label="last name"
              required
            />
          </div>
          <div class="flex a90023">
            <img src={envelop} alt="envelop" />
            <input
              type="email"
              name="email-address"
              placeholder="Enter your email address"
              bind:value={email}
              aria-label="email"
              required
            />
          </div>
          <span>Enter your email address</span>
          <div class="flex a90023">
            <img src={lockIcon} alt="user" />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              bind:value={password}
              aria-label="password"
              required
            />
          </div>
          <span>Enter password minimum 8 characters</span>
          <div class="flex a90023">
            <img src={keyIcon} alt="user" />
            <input
              type="password"
              name="re-password"
              placeholder="Re-type password"
              bind:value={repassword}
              aria-label="re-password"
              required
            />
          </div>
          <div class="flex a90023">
            <img src={globeIcon} alt="user" />
            <input
              type="text"
              name="country"
              placeholder="Your country name"
              bind:value={country}
              aria-label="your country"
              required
            />
          </div>
          <div class="a9382nck">
            <input
              type="checkbox"
              name="notify-me"
              bind:checked={notify}
              id="check-box"
            />
            <label for="check-box">
              Sign up for emails to get updates from {WEBSITE_NAME} on products,
              offers, and your Member benefits.
            </label>
          </div>
          <p>
            By creating an account you agree to {WEBSITE_NAME}
            {"'s"} <a href="privacy-policy">Privacy Policy</a> and{" "}
            <a href="terms-of-use">Terms of Use</a>.
          </p>
          <button type="submit" disabled={loading}>
            {#if loading === true}
              <div class="loading-spinner" />
            {:else}
              JOIN US
            {/if}
          </button>
          {#if message}
            <span class={message.variant}>
              {message.message}
            </span>
          {/if}
          <p class="a83x08">
            Already a member?
            <a href="sign-in"> Sign in. </a>
          </p>
        </form>
      {:else}
        <div>
          <p class="a-392md">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              class="from-right fr2"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              ><path
                d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
              /></svg
            >
            {#if form?.success == true}
              <span class="success-text from-right fr4">
                Account detail saved successfully!
              </span>
              <br />
              <span class="from-right fr2">
                you logged from external plateform. now you can get full access
                of our website features.
              </span>
            {:else}
              <span class="success-text from-right fr4">
                Account detail saved successfully! check email and confirm.
              </span>
              <br />
              <span class="from-right fr2">
                we send a email to your user.email check email and confirm your
                account.
              </span>
            {/if}
          </p>
        </div>
      {/if}
    </div>
  </div>
</div>
