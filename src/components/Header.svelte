<script>
  import cartIcon from "$img/cart.svg";
  import userIcon from "$img/user.svg";
  import arrowDown from "$img/arrow-down.svg";
  import feather from "$img/feather.svg";
  import {USER_CONTEXT } from '$lib/context/store'
  import { onMount } from "svelte";
  import {page} from '$app/stores'
  import heart from "$img/heart.svg";
  import trends from "$img/trends.svg";
  import new_ from "$lib/assets/new.svg";
  import phoneIcon from "$img/phone.png";
  import monitorIcon from "$img/monitor.png";
  import fireIcon from "$img/fire.svg";
  import watchIcon from "$img/watch.png";
  import categoryIcon from "$img/category.png";
  import fileIcon from "$img/file-bin.png";
  import { WEBSITE_NAME } from "$lib/constants";
  let _init_ = true
  let username = false
  onMount(()=>{
    _init_ = false
    username = $USER_CONTEXT.username
  })
</script>

<header class="">
  <svg
    class="header-bg"
    viewBox="0 0 1366 93"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 41V0L1365.5 1.5V41C1272.5 41 1199.38 86.4601 1170.5 90C1093 99.5 1047.5 71.5 986.5 76C956 78.25 884 90 860 90C824.345 90 785 100.5 695 76C626.295 57.2968 507.5 68.5 474.5 76C422.328 87.8572 366 89.5 322 76C244.085 52.0942 175.5 47.5 123.5 54C47.5986 63.4877 25.1667 40 0 41Z"
      fill="black"
    />
  </svg>
  <nav class="page-size dfc-r  nav">
    <ul class="dfc-r aooo9392">
      <li class="logo">
        <a href="/" class="dfc-r fwb">
          <img src={feather} alt="feather" />
          <span>{WEBSITE_NAME}</span>
        </a>
      </li>
    </ul>
    <ul class="dfc-r u-cc9392">
      <li class="hx3"><a  class:active={$page.url.pathname === '/blogs'} href="/Blogs">Blogs</a></li>
      <!-- <li class="hx3"><a  class:active={$page.url.pathname === '/computers'} href="/computers">Computers</a></li>
      <li class="hx3"><a  class:active={$page.url.pathname === '/watches'} href="/watches">Smart Watches</a></li>
      <li class="hx3"><a  class:active={$page.url.pathname === '/firmwares'} href="/firmwares">Firmwares</a></li> -->
      <li class="show-on-hover" id="b9iccs">
        <a class:active={$page.route.id === '/'} class="dfc-r" href="/products"
          ><span>Products</span>
          <img class="arrow-down" src={arrowDown} alt="arrow down" /></a
        >
        <div class="on-mouse-hover i0xxxxle">
          <div class="dfc-r ai-s js-s nav-trash-modal">
            <ul class="dfc-c ai-s">
              <li><h4 class="fwb mb-5 dfc-r"><img src="{categoryIcon}" alt="phone icon" /> Products</h4></li>
              <li><a class:active={$page.url.pathname === '/smart-phones'} href="/smart-phones"><img src="{phoneIcon}" alt="phone icon" /> Mobile Phones</a></li>
              <li><a  class:active={$page.url.pathname === '/computers'} href="/computers"><img src="{monitorIcon}" alt="monitor icon" /> Computers</a></li>
              <li><a  class:active={$page.url.pathname === '/watches'} href="/watches"><img src="{watchIcon}" alt="hear icon" /> Smart Watches</a></li>
              <li><a  class:active={$page.url.pathname === '/firmwares'} href="/firmwares"><img src="{fileIcon}" alt="file bin icon" /> Firmwares</a></li>
              <li><a  class:active={$page.url.pathname === '/world/trends'} href="/world/trends"><img src="{fireIcon}" alt="Fire icon" /> Trendings of {new Date().getFullYear()}</a></li>
              <li><a  class:active={$page.url.pathname === '/world/loved'} href="/world/loved"><img src="{heart}" alt="heart icon" /> Most Loved</a></li>
              <li><a  class:active={$page.url.pathname === '/world/popular'} href="/world/popular"><img src={trends} alt="star icon" /> Fans Favourite</a></li>
              <li><a  class:active={$page.url.pathname === '/world/popular'} href="/world/new"><img src={new_} alt="star icon" /> New Arrivals</a></li>
            </ul>
            <ul class="dfc-c ai-s">
              <h4 class="fwb mb-5 dfc-r"><img src="{monitorIcon}" alt="monitor icon" /> Computers Brands</h4>
              <li><a class:active={$page.url.pathname === '/computers/acer'} href="/computers/acer">Acer Laptops</a></li>
            </ul>
            <ul class="dfc-c ai-s">
              <h4 class="fwb dfc-r mb-5"><img src="{phoneIcon}" alt="phone icon" />  Mobile Brands</h4>
              <li><a class:active={$page.url.pathname === '/smart-phones/htc'} href="/smart-phones/htc">HTC Phones</a></li>
              <li><a class:active={$page.url.pathname === '/smart-phones/apple'} href="/smart-phones/apple">Apple Phones</a></li>
              <li><a class:active={$page.url.pathname === '/smart-phones/samsung'} href="/smart-phones/samsung">Samsung Phones</a></li>
              <li><a class:active={$page.url.pathname === '/smart-phones/xiaomi'} href="/smart-phones/xiaomi">Xiaomi Phones</a></li>
              <li><a class:active={$page.url.pathname === '/smart-phones/oneplus'} href="/smart-phones/oneplus">Oneplus Phones</a></li>
              <li><a class:active={$page.url.pathname === '/smart-phones/realme'} href="/smart-phones/realme">Realme Phones</a></li>
              <li><a class:active={$page.url.pathname === '/smart-phones/lenovo'} href="/smart-phones/lenovo">Lenovo Phones</a></li>
            </ul>
            <ul class="dfc-c ai-s">
              <h4 class="fwb mb-5 dfc-r"><img src="{watchIcon}" alt="watch icon" />  Top Smart Watches</h4>
              <li><a class:active={$page.url.pathname === '/watches/honor'} href="/watches/honor" title="samsung smart watches">Honor Smart Watches</a></li>
              <li><a class:active={$page.url.pathname === '/watches/asus'} href="/watches/asus" title="samsung smart watches">Asus Smart Watches</a></li>
              <li><a class:active={$page.url.pathname === '/watches/apple'} href="/watches/apple" title="samsung smart watches">Apple Smart Watches</a></li>
              <li><a class:active={$page.url.pathname === '/watches/intex'} href="/watches/intex" title="samsung smart watches">Intex Smart Watches</a></li>
              <li><a class:active={$page.url.pathname === '/watches/samsung'} href="/watches/samsung" title="samsung smart watches">Samsung Smart Watches</a></li>
              <li><a class:active={$page.url.pathname === '/watches/sony'} href="/watches/sony" title="sony smart watches">Sony Smart Watches</a></li>
              <li><a class:active={$page.url.pathname === '/watches/xiaomi'} href="/watches/xiaomi" title="xiaomi smart watches">Xiaomi Smart Watches</a></li>
            </ul>
            <ul class="dfc-c ai-s">
              <h4 class="fwb mb-5 dfc-r"><img src="{fileIcon}" alt="file icon" />  Mobile Firmwares</h4>
              <li><a class:active={$page.url.pathname === '/firmwares/samsung'} href="/firmwares/samsung" title="samsung firmware">Samsung Firmwares</a></li>
              <li><a class:active={$page.url.pathname === '/firmwares/infinix'} href="/firmwares/infinix" title="infinix firmware">Infinix Firmwares</a></li>
              <li><a class:active={$page.url.pathname === '/firmwares/motorola-firmware'} href="/firmwares/motorola-firmware" title="motorola firmware">Motorola Firmwares</a></li>
              <li><a class:active={$page.url.pathname === '/firmwares/realme-firmware'} href="/firmwares/realme-firmware" title="huawei firmware">Realme Firmwares</a></li>
              <li><a class:active={$page.url.pathname === '/firmwares/vivo-firmware'} href="/firmwares/vivo-firmware" title="vivo firmware">Vivo Firmwares</a></li>
              <li><a class:active={$page.url.pathname === '/firmwares/xiaomi'} href="/firmwares/xiaomi" title="xiaomi firmware">Xiaomi Firmwares</a></li>
              <li><a class:active={$page.url.pathname === '/firmwares/oneplus'} href="/firmwares/oneplus" title="oneplus firmware">Oneplus Firmwares</a></li>
            </ul>
          </div>
        </div>
      </li>
      <li>
        <a class:active={$page.route.id === '/cart'} href="/cart" class="dfc-r">
          <img src={cartIcon} alt="cart" />
          <span class="badge danger">0</span></a
        >
      </li>
      <li class="show-on-hover a889ka-9932">
        <a href='/user' class="dfc-r">
            <span class="user dfc-r">
              <img src={userIcon} alt="user" />
              {#if _init_}
                <span class="user-name">{'loading...'}</span>
              {:else}
                <span class="user-name">{username ? username : 'Sign in'}</span>
              {/if}
            </span>
            <img class="arrow-down" src={arrowDown} alt="arrow down" />
        </a>
        <div class="on-mouse-hover">
          <div class="nav-trash-modal">
            <ul class="dfc-r">
              {#if username}
                <li><a class:active={$page.route.id === '/profile'} href="/profile">Profile</a></li>
                <li><a class:active={$page.route.id === '/reset-password'} href="/reset-password">Reset Password</a></li>
                <li><a class:active={$page.route.id === '/sign-out'} href="/sign-out?r=sign-in">Sign Out</a></li>
              {:else}
                <li><a class:active={$page.route.id === '/sign-up'} href="/sign-up">Sign Up</a></li>
                <li><a class:active={$page.route.id === '/sign-in'} href="/sign-in">Login</a></li>
                <li><a class:active={$page.route.id === '/forgot-password'} href="/forgot-password">forgot password</a></li>
              {/if}
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </nav>
</header>

<style lang="scss">
  .user {
    font-size: 12px;
  }
  .user-name {
    margin-left: 5px;
  }
  .badge.danger {
    position: absolute;
    top: -4px;
    left: 24px;
  }
  a {
    position: relative;
  }
</style>
