<script lang="ts">
  import { life, setUserCharName } from "$lib/common";
  import BasicDetails from "$compo/basic-details.svelte";
  import ChangePassword from "$compo/change-password.svelte";
  import Settings from "$compo/settings.svelte";
  import type { PageData } from "./$types";
  import PageMeta from "$compo/page-meta.svelte";
  import { WEBSITE_NAME, WEBSITE_URL } from "$lib/constants";
  import { goto } from "$app/navigation";
  export let data: PageData;
  $: ({ user } = data);
  let info: string = "basic_details";
</script>

<svelte:head>
  <PageMeta
    title={`${(
      user.firstname +
      " " +
      user.lastname
    ).toUpperCase()} PROFILE | ${WEBSITE_NAME.toUpperCase()}`}
    description={"customize your profile and experience with us."}
    html_desc={"customize your profile and experience with us."}
    keywords={"form,input,label,button,username,password,email,address,city,state,zip code,country,phone number,date of birth,gender,terms and conditions,privacy policy,submit,register,create account,sign up,join now,become a member,new user,account information,confirmation"}
    pub_time={"2022-11-03T12:20:00.000Z"}
    ogType={"website"}
    image={WEBSITE_URL + "/src/lib/assets/user.svg"}
    page_url={`${WEBSITE_URL}profile`}
  />
</svelte:head>
<div class="profile-view dfc-c">
  <div class="sign-page-back">
    <img src="/images/sign-back.jpg" alt="sign back" />
    <div class="page-layer" />
  </div>
  {#if user}
    <div class="page-size container">
      <div class="left">
        <div class="left-profile">
          {#if user.avatar}
            <img src={user.avatar} alt="" />{" "}
          {:else}
            <div class="a-kpow2">
              {setUserCharName(user.firstname + " " + user.lastname)}
            </div>
          {/if}
          <p class="profile-username">{user.firstname} {user.lastname}</p>
          <span class="dfc-r fz12">
            <svg class="icon-22 mr3" viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path
                  d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z"
                />
              </g>
            </svg>
            Joined {life(user.createdAt).from()}
          </span>
          <button on:click={ async()=> await goto('/sign-out?/signout')} class="dfc-r logout btn btn-primary">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              shape-rendering="geometricPrecision"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              ><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" /><path
                d="M10 17l5-5-5-5"
              /><path d="M15 12H3" /></svg
            > Logout
          </button>
        </div>
        <div class="left-button mt25">
          <div class="assasin">
            <button
              class={info === "basic_details" ? "active" : ""}
              on:click={() => (info = "basic_details")}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 496 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                  d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"
                /></svg
              >
              <span> Basic Details</span>
            </button>
            <button
              class={info === "password" ? "active" : ""}
              on:click={() => (info = "password")}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 640 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                  d="M224 256A128 128 0 1 0 96 128a128 128 0 0 0 128 128zm96 64a63.08 63.08 0 0 1 8.1-30.5c-4.8-.5-9.5-1.5-14.5-1.5h-16.7a174.08 174.08 0 0 1-145.8 0h-16.7A134.43 134.43 0 0 0 0 422.4V464a48 48 0 0 0 48 48h280.9a63.54 63.54 0 0 1-8.9-32zm288-32h-32v-80a80 80 0 0 0-160 0v80h-32a32 32 0 0 0-32 32v160a32 32 0 0 0 32 32h224a32 32 0 0 0 32-32V320a32 32 0 0 0-32-32zM496 432a32 32 0 1 1 32-32 32 32 0 0 1-32 32zm32-144h-64v-80a32 32 0 0 1 64 0z"
                /></svg
              >
              <span> Password</span>
            </button>
            <button
              class={info === "payments" ? "active" : ""}
              on:click={() => (info = "payments")}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 640 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                  d="M0 448c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V128H0v320zm448-208c0-8.84 7.16-16 16-16h96c8.84 0 16 7.16 16 16v32c0 8.84-7.16 16-16 16h-96c-8.84 0-16-7.16-16-16v-32zm0 120c0-4.42 3.58-8 8-8h112c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H456c-4.42 0-8-3.58-8-8v-16zM64 264c0-4.42 3.58-8 8-8h304c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8v-16zm0 96c0-4.42 3.58-8 8-8h176c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8v-16zM624 32H16C7.16 32 0 39.16 0 48v48h640V48c0-8.84-7.16-16-16-16z"
                /></svg
              >
              <span> Payments</span>
            </button>
            <button
              class={info === "settings" ? "active" : ""}
              on:click={() => (info = "settings")}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                  d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"
                /></svg
              >
              <span> Settings</span>
            </button>
          </div>
        </div>
      </div>
      <div class="right">
        {#if info === "basic_details" && user}
          <BasicDetails {user} />
        {/if}
        {#if info === "password"} <ChangePassword user_id={user._id} />{/if}
        {#if info === "payments"}
          <div class="dfc-r full-size">
            <h2 class="c-w">No Data</h2>
          </div>
        {/if}

        {#if info === "settings"}
          <div class="flex-h c-b full-size">
            <Settings />
          </div>
        {/if}
      </div>
    </div>
  {:else}
    <p>Need to login now</p>
  {/if}
</div>
