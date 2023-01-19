<script lang="ts">
  import KeyIcon from "$lib/assets/key.svg";
  import InfoIcon from "$lib/assets/info.svg";
  import { CLOSE_MODAL, CUSTOM_STATE_ADD } from "$lib/context/store";
  const handleConfirm = () => {
      CUSTOM_STATE_ADD({confirmPasswordChange: true});
      CLOSE_MODAL()
  };
</script>

<span class="db"> Enter your password to change your information. </span>

<span class="db">
  Do you want to change your password! click on yes to confirm that. next time
  enter your new password to login. make sure you entered a strong password.
  <p class="dfc-r jc-fs mt-10">
    <img src={InfoIcon} class="mr-5" alt="key icon" />
    I forgot my password
    <a class="error-text db ml-3" href="/user/forgot-password">
      click to reset.</a
    >
  </p>
</span>
<div class="mt-10">
  <button on:click={handleConfirm} class="modal-btn">Yes</button>
  <button on:click={() => CLOSE_MODAL()} class="modal-btn">No</button>
</div>
