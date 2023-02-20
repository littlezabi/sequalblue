<script lang="ts">
  import { WEBSITE_NAME } from "$lib/constants";
</script>

<div class="h100 dfc-r sign-view">
  <div class="sign-page-back">
    <picture>
      <img src="/images/sign-back.jpg" alt="sign back" />
    </picture>
    <div class="page-layer" />
  </div>
  <div class="page-size to-center">
    <div class="form-view fade-in">
      <h3>SIGNING OUT TO {WEBSITE_NAME}</h3>
      <h5>
        Signing Out to your profile and you were not be able to get full access
        to our products and buy things, Inspiration and community.
      </h5>
      <form action="?/signout" method="post">
        <input type="submit" value="SIGN OUT" />
        <p class="a83x08">
          why you want to logout? if you have any issue please give a feedback
          <a href="/support/feedback"> feedback </a>
        </p>
      </form>
    </div>
  </div>
</div>
