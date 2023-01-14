<script lang="ts">
  import { WEBSITE_NAME } from "$lib/constants";
  import userIcon from "$lib/assets/user-alt.svg";
  import lockIcon from "$lib/assets/lock.svg";
</script>

<div class="h100 dfc-c sign-view">
  <div class='sign-page-back'>
        <img src='/images/sign-back.jpg' alt='sign-back' />
      <div class='page-layer'></div>
    </div>
  <div class="page-size">
    <div class="form-view fade-in">
      <h3>SIGN IN TO {WEBSITE_NAME}</h3>
      <h5>
        Login to your profile and get full access to our products and buy
        things, Inspiration and community.
      </h5>
      <form autoComplete="off">
        <div class="flex a90023">
          <img src={userIcon} alt="user" />
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
            required
          />
        </div>
        <div class="flex a90023">
          <img src={lockIcon} alt="user" />
          <input
            type="password"
            name="re-password"
            placeholder="Your password"
            required
          />
        </div>

        <div class="a9382nck">
          <input type="checkbox" name="notify-me" id="check-box" />
          <label for="check-box">Keep me logged!</label>
        </div>
        <div class="dfc-c">

          <button type="submit" disabled={false}>
            SIGN IN
            <!-- {loading ? <div class='loading-spinner'></div> : "SIGN IN"} -->
          </button>
        </div>
        <p class="a83x08">
          I forgot my password
          <a href="/user/forgot-password"> click here to reset. </a>
        </p>
        <p class="a83x08">
          not a member yet?
          <a href="/user/sign-up"> Sign up. </a>
        </p>
      </form>
    </div>
  </div>
</div>
