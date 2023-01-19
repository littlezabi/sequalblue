<script>
  import { WEBSITE_NAME } from "$lib/constants";
  import trends from "$lib/assets/trends.svg";
  import cart from "$lib/assets/cart.svg";
  import heart from "$lib/assets/heart.svg";
  import eye from "$lib/assets/eye.svg";
  import new_ from "$lib/assets/new.svg";
  import BgColors from "./bg-colors.svelte";
  import openInNew from "$lib/assets/open-in-new.svg";
</script>
<BgColors />
<div class="page-size dfc-r mid-links">
  <ul>
    <li><a href="/" title="home">Samsung</a></li>
    <li><a href="/" title="home">Apple</a></li>
    <li><a href="/" title="home">Acer</a></li>
    <li><a href="/" title="home">Mac</a></li>
    <li><a href="/" title="home">Dell</a></li>
    <li><a href="/" title="home">Xiaomi</a></li>
  </ul>
</div>
<div class="page-size middle-view dfc-r">
  <div class="left dfc-c">
    <a href="/view/trends/" title="see trends"
      ><img src={trends} alt="trends" /></a
    >
    <a href="/view/cart/" title="see your cart"><img src={cart} alt="cart" /></a
    >
    <a href="/view/loved/" title="see most loved product"
      ><img src={heart} alt="heart" /></a
    >
    <a href="/view/watched/" title="see most watched"
      ><img src={eye} alt="eye" /></a
    >
    <a href="/view/arrivals/" title="see new arrivals"
      ><img src={new_} alt="new" /></a
    >
  </div>
  <div class="mid dfc-c">
    <h1>LOOK SPECS BUY THINGS FIND BEST...!</h1>
    <h4>
      {WEBSITE_NAME} is providing world all electro devices reviews, specification
      and experience. you can find best docs, notes and blogs of a happening events
      and upcoming things. first know then buy
    </h4>
    <small>we are ready for futured!</small>
    <a href="/" class="dfc-r btn btn-primary fwb open-icon">
      What's New!
      <img src={openInNew} class="new_tab_image" alt="open in new" />
    </a>
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
