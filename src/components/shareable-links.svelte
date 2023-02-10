<script lang="ts">
  export let fox: any;
  import fbIcon from "$lib/assets/facebook.svg";
  import eyeHeart from "$lib/assets/heart.svg";
  import twIcon from "$lib/assets/twitter.svg";
</script>

<div class="dfc-r shareable-links">
  <a href="www.facebook.com/{fox.slug}" rel="noreferrer" target="_blank" title="share on facebook">
    <img src={fbIcon} alt="icon" />
    <span>share</span>
  </a>
  <a href="www.twitter.com/{fox.slug}" rel="noreferrer" target="_blank" title="share on twitter">
    <img src={twIcon} alt="icon" />
    <span>share</span>
  </a>
  <div title="numbers of fire">
    <img src='/images/assets/fire.png' alt="icon" />
    <span>{fox.hits}</span>
  </div>
  <div title="Give a heart">
    <img src={eyeHeart} alt="icon" />
    <span>{fox.fans}</span>
  </div>
  <div title="Give Rating">
    <img src='/images/assets/star-filled.png' alt="icon" />
    <span>{fox.popularity}</span>
  </div>
</div>
