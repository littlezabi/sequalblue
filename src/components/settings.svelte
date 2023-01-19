<script lang="ts">
  import { setForm } from "$lib/common";
  import { WEBSITE_NAME } from "$lib/constants";
  import { USER_CONTEXT } from "$lib/context/store";
  import axios from "axios";
  let setting = { notifyme: true };
  let loading: boolean = false;
  let message: any = false;
  const handleForm = async () => {
    loading = true;
    await axios
      .post("/api/user?change-setting=1", setForm({
        notifyme: setting.notifyme,
        _id: $USER_CONTEXT._id,
        update_settings: 1,
      }))
      .then((e) => {
        loading = false;
        message = {
          message: e.data.message,
          variant: "success",
        };
      })
      .catch((e) => {
        loading = false;
        message = {
          message:
            e.response?.data?.message ?? "Error occured during processing!",
          variant: "error",
        };
      });
  };
</script>

<div class="sign-view">
  <div class="form-view fade-in">
    <h2>User Setting</h2>
    <form on:submit|preventDefault={handleForm} autocomplete="off">
      <div class="a9382nck">
        <input
          type="checkbox"
          checked={setting.notifyme}
          name="notify-me"
          id="check-box"
          on:change={(e) => (setting = { notifyme: e.target?.checked })}
        />
        <label for="check-box">
          Sign up for emails to get updates from {WEBSITE_NAME} on products, offers,
          and your Member benefits.
        </label>
      </div>
      <button type="submit" disabled={loading}>
        {#if loading} <div class="loading-spinner white" /> {:else} SAVE {/if}
      </button>
      <div class="error-msg">
        {#if message}
          <span class={`${message.variant}-text`}>
            {message.message}
          </span>
        {/if}
      </div>
    </form>
  </div>
</div>
