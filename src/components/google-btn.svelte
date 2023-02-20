<script lang="ts">
    import { WEBSITE_URL } from "$lib/constants";
    export let return_uri:string;
</script>
<svelte:head>
  <script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>
<div
  id="g_id_onload"
  data-client_id="633696121416-60r2lrg787fvjv4d9oqp3gb4r6dhisr7.apps.googleusercontent.com"
  data-context="signup"
  data-ux_mode="popup"
  data-login_uri="{WEBSITE_URL}{return_uri}"
  data-close_on_tap_outside="false"
  data-itp_support="true"
/>

<div
  class="g_id_signin"
  data-type="standard"
  data-shape="pill"
  data-theme="filled_black"
  data-text="continue_with"
  data-size="large"
  data-logo_alignment="left"
/>
