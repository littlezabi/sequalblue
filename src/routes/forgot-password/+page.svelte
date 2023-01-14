<script lang="ts">
    import userIcon from "$lib/assets/user-alt.svg";
    let success:boolean = false
    
</script>
<div class='h100 dfc-r sign-view'>
    <div class='sign-page-back'>
      <picture>
        <img src='/images/sign-back.jpg' alt='sign back' />
      </picture>
      <div class='page-layer'></div>
    </div>
    <div class='page-size to-center'>
      <div class='form-view fade-in'>
        <h3>RESET MY PASSWORD</h3>
        <h5>
          enter your username or email address we send a confirmation link
          (for one time use) to your email account. then you can reset your
          password.
        </h5>
        {#if success === true}
          <div>
            <p class='a-392md'>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="from-right fr2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
           <span class='success-text from-right fr4'>
                successfully sent! check your email.
              </span>
              <br />
              <span class='from-right fr2'>
                check your email we sent a link in email click on that link
                then you can change your password.
              </span>
            </p>
          </div>
       {:else}
          <form autoComplete='off'>
            <div class='flex a90023'>
                <img src={userIcon} alt="user" />
              <input
                type='text'
                name='user'
                id='user'
                placeholder='Enter username or email address'
                required
              />
            </div>
            <input type='submit' style="width: 200px" value='SUBMIT' />
            <p class='a83x08'>
              I remember my password
              <a href='/user/forgot-password' title="forgot password">
                Login
              </a>
            </p>
            <p class='a83x08'>
              not a member yet?
              <a href='/user/sign-up' title="sign up">
                Sign up.
              </a>
            </p>
          </form>
        {/if}
      </div>
    </div>
  </div>