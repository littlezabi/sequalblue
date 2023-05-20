<script>
  import { WEBSITE_NAME } from "$lib/constants";
  import trends from "$lib/assets/trends.svg";
  import cart from "$lib/assets/cart.svg";
  import heart from "$lib/assets/heart.svg";
  import fireIcon from "$lib/assets/fire.svg";
  import new_ from "$lib/assets/new.svg";
  import BgColors from "./bg-colors.svelte";
  import cartIcon from "$img/cart.svg";
  import homeIcon from "$lib/assets/home.png";
  import userIcon from "$img/user.svg";
</script>
<BgColors />
<div class="page-size dfc-r mid-links">
  <a href="/">
    <img src={homeIcon} alt="homeIcon" />
  </a>
  <div class="dfc-r" />
  <a href="/cart">
    <img src={cartIcon} alt="cart" />
  </a>
  <a href="/profile">
    <div class="dfc-r">
      <img src={userIcon} alt="cart" />
      <span>Profile</span>
    </div>
  </a>
  <a href="/about">About</a>
  <a href="/blogs">Blogs</a>
</div>
<div class="page-size middle-view dfc-r">
  <div class="left dfc-c">
    <a href="world/popular" title="see most watched"
      ><img src={trends} alt="star icon" /></a
    >
    <a href="world/trends/" title="see trends"
      ><img src={fireIcon} alt="trends" /></a
    >
    <a href="world/loved" title="most loved in world"
      ><img src={heart} alt="hear icon" /></a
    >
    <a href="world/arrivals" title="see new arrivals"
      ><img src={new_} alt="new" /></a
    >
    <a href="/cart" title="see your cart"><img src={cart} alt="cart" /></a>
  </div>
  <div class="mid dfc-c">
    <h1 class="txt-upper">
      Look at Specifications, Find the Best, and Buy with Confidence!
    </h1>
    <h4>
      {WEBSITE_NAME} is your go-to source for reviews, specifications, and user experiences
      of electronic devices and firmware from around the globe. Our extensive collection
      of documents, notes, and blogs on current events and upcoming products will
      help you make informed purchasing decisions. Stay ahead of the curve and know
      before you buy with {WEBSITE_NAME}
    </h4>
    <small class="t-88892la">WE ARE READY FOR THE FUTURE!</small>
    <a href="/world/new" class="dfc-r btn btn-primary">
      What's New! <span class="mod3el3">&rarr;</span></a
    >
  </div>
</div>

<style>
  small {
    font-size: 19px;
    font-weight: bold;
    margin: 12px 0;
    text-transform: uppercase;
    letter-spacing: 3px;
  }
</style>
