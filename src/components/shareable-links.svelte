<script lang="ts">
  export let fox: any;
  import eyeIcon from "$lib/assets/eye.svg";
  import fbIcon from "$lib/assets/facebook.svg";
  import twIcon from "$lib/assets/twitter.svg";
</script>

<div class="dfc-r shareable-links">
  <a href="www.facebook.com/{fox.slug}" rel="noreferrer" target="_blank" title="share on facebook">
    <img src={fbIcon} alt="icon" />
  </a>
  <a href="www.twitter.com/{fox.slug}" rel="noreferrer" target="_blank" title="share on twitter">
    <img src={twIcon} alt="icon" />
  </a>
  <a href="/most-watched" title="views on this post">
    <img src={eyeIcon} alt="icon" />
    <span>{fox.views}</span>
  </a>
</div>
