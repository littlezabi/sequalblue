<script lang="ts">
  import KeyIcon from "$lib/assets/key.svg";
  import InfoIcon from "$lib/assets/info.svg";
  import {  CLOSE_MODAL, CUSTOM_STATE_ADD } from "$lib/context/store";
  let password = "";
  let message = ''
  const handlePassword = () => {
    if(password === ''){message = 'Please enter your password to confirm changes.';return 0}
    CUSTOM_STATE_ADD({password, saveForm:true});
    CLOSE_MODAL()
  };
</script>
<div class="p-20 yt-ck3">
<span class="db"> Enter your password to change your information. </span>
<div class="dfc-c input-with-icon">
  <img src={KeyIcon} alt="key icon" />
  <input
    bind:value={password}
    type="password"
    name="password"
    placeholder="Enter your password"
  />
</div>
<p class="a83x08 dfc-r jc-fs modal-a83">
  <img src={InfoIcon} class="mr-5" alt="key icon" />
  I forgot my password<a
    class="error-text db ml-3"
    href="/user/forgot-password"
  >
    click to reset.</a
  >
</p>
<div class="mt-10">
  <button on:click={handlePassword} class="modal-btn">Confirm</button>
  <button on:click={()=>CLOSE_MODAL()} class="modal-btn">Close</button>
</div>
<p class="fz12 mt-5 error-text">
  {message}
</p>
</div>