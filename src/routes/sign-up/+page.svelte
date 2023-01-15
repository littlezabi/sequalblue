<script lang="ts">
  import { SPECIAL_CHARS, WEBSITE_NAME } from "$lib/constants";
  import userIcon from "$lib/assets/user-alt.svg";
  import userAltIcon from "$lib/assets/user.svg";
  import envelop from "$lib/assets/envelop.svg";
  import lockIcon from "$lib/assets/lock.svg";
  import globeIcon from "$lib/assets/globe.svg";
  import checkIcon from "$lib/assets/check.svg";
  import keyIcon from "$lib/assets/key.svg";
  let success: boolean = false;
  let usernameHandler: any = false;
  let checkUnameReqTimeOut: any = false;
  let username: string = "";
  let email: string = "";
  let fullname: string = "";
  let country: string = "";
  let password: string = "";
  let repassword: string = "";
  let notify: boolean = false

  const setUsername = (__name__: string) => {
    console.log(__name__);
    if (__name__.length < 4) return 0;
    __name__ = __name__.trim().toLowerCase();
    if (__name__.split(" ").length > 1) {
      usernameHandler = {
        variant: "error-text",
        message: "spaces is not allowed in username!",
      };
      return 0;
    }
    if (SPECIAL_CHARS.test(username)) {
      usernameHandler = {
        variant: "error-text",
        message: `special characters is not allowed in username!`,
      };
      return 0;
    }
    usernameHandler = false;
    if (checkUnameReqTimeOut) clearTimeout(checkUnameReqTimeOut);
    checkUnameReqTimeOut = setTimeout(async () => {
      const res = await fetch(`api/user?is-user-exist=${__name__}`)
        .then((e) => e.json())
        .catch((e) => console.error(e));
      const { isExist } = res;
      if (!isExist) {
        usernameHandler = {
          variant: "error-text",
          message: `username is already taken choose another one!`,
        };
      } else {
        usernameHandler = {
          variant: "success-text",
          message: `username is available!`,
        };
      }

      username = __name__;
    }, 1000);
  };

</script>

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
        <form autoComplete="off">
          {#if usernameHandler}
            <span class={usernameHandler.variant}>
              {usernameHandler.message}
            </span>
          {/if}
          <div class="flex a90023">
            <img src={userIcon} alt="user" />
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
              on:keyup={(e) => setUsername(e.target.value)}
            />
          </div>

          <span>Enter a unique username</span>
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
          <div class="flex a90023">
            <img src={userAltIcon} alt="user" />
            <input
              type="text"
              name="full-name"
              placeholder="Your fullname"
              bind:value={fullname}
              aria-label="fullname"
              required
            />
          </div>
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
              checked={true}
              name="notify-me"
              bind:value={notify}
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
          <button type="submit" disabled={false}>
            <!-- loading -->
            "JOIN US"
          </button>
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
            <span class="success-text from-right fr4">
              Account detail saved successfully! check email and confirm.
            </span>
            <br />
            <span class="from-right fr2">
              we send a email to your user.email check email and confirm your
              account.
            </span>
          </p>
        </div>
      {/if}
    </div>
  </div>
</div>
