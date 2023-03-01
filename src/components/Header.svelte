<script lang="ts">
  import cartIcon from "$img/cart.svg";
  import userIcon from "$img/login.svg";
  import arrowDown from "$img/arrow-down.svg";
  import logoIcon from "$img/logo.png";
  import { page } from "$app/stores";
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
  export let user: any;
  let userObject: any = false;
  let toggleOpen = false;
  $: user, (userObject = user.object);
  const handleMenu = () => {
    let element: any = document.querySelector(".nav-menu");
    // element.style.display='block'
    toggleOpen = !toggleOpen;
    if (!toggleOpen) {
      element.classList.remove("open");
      setTimeout(() => {
        element.style.display = "none";
      }, 400);
    } else {
      // setTimeout(() => {
        element.style.display = "block";
        element.classList.add("open");
      // }, 100);
    }
  };

  console.log(toggleOpen);
</script>

<header>
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
  <nav class="page-size dfc-r">
    <ul>
      <li class="logo">
        <a href="/" class="dfc-r fwb">
          <img src={logoIcon} alt="feather" />
        </a>
      </li>
    </ul>
    <!-- <li class="hx3">
        <a class:active={$page.url.pathname === "/"} href="/">Home</a>
      </li>
      <li class="hx3">
        <a class:active={$page.url.pathname === "/about"} href="/about">About</a
        >
      </li>
      <li class="hx3">
        <a class:active={$page.url.pathname === "/blogs"} href="/blogs">Blogs</a
        >
      </li> -->
    <!-- <button class="menu">Menu</button> -->
    <div class="nav-menu close">
      <div class="menu-header dfc-r">
        <div>
          <a
            class:active={$page.route.id === "/cart"}
            href="/cart"
            class="dfc-r"
          >
            <img src={cartIcon} alt="cart" />
            <span class="badge danger">0</span>
          </a>
        </div>
      </div>
      <div class="dfc-r menu-content ai-s">
        <ul class="first-items dfc-c ai-s">
          <li>
            <h4 class="fwb mb-5 dfc-r">
              <img src={categoryIcon} alt="phone icon" /> Products
            </h4>
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/smart-phones"}
              href="/smart-phones"
              ><img src={phoneIcon} alt="phone icon" /> Mobile Phones</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/computers"}
              href="/computers"
              ><img src={monitorIcon} alt="monitor icon" /> Computers</a
            >
          </li>
          <li>
            <a class:active={$page.url.pathname === "/watches"} href="/watches"
              ><img src={watchIcon} alt="hear icon" /> Smart Watches</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/firmwares"}
              href="/firmwares"
              ><img src={fileIcon} alt="file bin icon" /> Firmwares</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/world/trends"}
              href="/world/trends"
              ><img src={fireIcon} alt="Fire icon" /> Trendings of {new Date().getFullYear()}</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/world/loved"}
              href="/world/loved"
              ><img src={heart} alt="heart icon" /> Most Loved</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/world/popular"}
              href="/world/popular"
              ><img src={trends} alt="star icon" /> Fans Favourite</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/world/popular"}
              href="/world/new"
              ><img src={new_} alt="star icon" /> New Arrivals</a
            >
          </li>
        </ul>
        <ul class="dfc-c ai-s">
          <h4 class="fwb mb-5 dfc-r">
            <img src={monitorIcon} alt="monitor icon" /> Computers Brands
          </h4>
          <li>
            <a
              class:active={$page.url.pathname === "/computers/acer"}
              href="/computers/acer">Acer Laptops</a
            >
          </li>
        </ul>
        <ul class="dfc-c ai-s">
          <h4 class="fwb dfc-r mb-5">
            <img src={phoneIcon} alt="phone icon" /> Mobile Brands
          </h4>
          <li>
            <a
              class:active={$page.url.pathname === "/smart-phones/htc"}
              href="/smart-phones/htc">HTC Phones</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/smart-phones/apple"}
              href="/smart-phones/apple">Apple Phones</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/smart-phones/samsung"}
              href="/smart-phones/samsung">Samsung Phones</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/smart-phones/xiaomi"}
              href="/smart-phones/xiaomi">Xiaomi Phones</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/smart-phones/oneplus"}
              href="/smart-phones/oneplus">Oneplus Phones</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/smart-phones/realme"}
              href="/smart-phones/realme">Realme Phones</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/smart-phones/lenovo"}
              href="/smart-phones/lenovo">Lenovo Phones</a
            >
          </li>
        </ul>
        <ul class="dfc-c ai-s">
          <h4 class="fwb mb-5 dfc-r">
            <img src={watchIcon} alt="watch icon" /> Top Smart Watches
          </h4>
          <li>
            <a
              class:active={$page.url.pathname === "/watches/honor"}
              href="/watches/honor"
              title="samsung smart watches">Honor Smart Watches</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/watches/asus"}
              href="/watches/asus"
              title="samsung smart watches">Asus Smart Watches</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/watches/apple"}
              href="/watches/apple"
              title="samsung smart watches">Apple Smart Watches</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/watches/intex"}
              href="/watches/intex"
              title="samsung smart watches">Intex Smart Watches</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/watches/samsung"}
              href="/watches/samsung"
              title="samsung smart watches">Samsung Smart Watches</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/watches/sony"}
              href="/watches/sony"
              title="sony smart watches">Sony Smart Watches</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/watches/xiaomi"}
              href="/watches/xiaomi"
              title="xiaomi smart watches">Xiaomi Smart Watches</a
            >
          </li>
        </ul>
        <ul class="dfc-c ai-s">
          <h4 class="fwb mb-5 dfc-r">
            <img src={fileIcon} alt="file icon" /> Mobile Firmwares
          </h4>
          <li>
            <a
              class:active={$page.url.pathname === "/firmwares/samsung"}
              href="/firmwares/samsung"
              title="samsung firmware">Samsung Firmwares</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/firmwares/infinix"}
              href="/firmwares/infinix"
              title="infinix firmware">Infinix Firmwares</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname ===
                "/firmwares/motorola-firmware"}
              href="/firmwares/motorola-firmware"
              title="motorola firmware">Motorola Firmwares</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/firmwares/realme-firmware"}
              href="/firmwares/realme-firmware"
              title="huawei firmware">Realme Firmwares</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/firmwares/vivo-firmware"}
              href="/firmwares/vivo-firmware"
              title="vivo firmware">Vivo Firmwares</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/firmwares/xiaomi"}
              href="/firmwares/xiaomi"
              title="xiaomi firmware">Xiaomi Firmwares</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/firmwares/oneplus"}
              href="/firmwares/oneplus"
              title="oneplus firmware">Oneplus Firmwares</a
            >
          </li>
        </ul>
      </div>
    </div>
    <button on:click={handleMenu} class="dfc-r close-menu open">
      <div class="menu-icon" class:open={toggleOpen}>
        <span />
        <span />
        <span />
      </div>
    </button>
    <!-- <li>
        <a href={userObject ? "/profile" : "/sign-in"} class="user">
          <span class="dfc-r ic2">
            <span class="dfc-r">
              {#if userObject}
                <img src={userObject?.avatar} alt="user" />
              {:else}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  shape-rendering="geometricPrecision"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  ><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" /><path
                    d="M10 17l5-5-5-5"
                  /><path d="M15 12H3" /></svg
                >
              {/if}
              <span class="user-name"
                >{userObject?.email ? userObject.firstname : "Sign in"}</span
              >
            </span>
          </span>
        </a>
      </li> -->
  </nav>
</header>

<style lang="scss">
  .badge.danger {
    position: absolute;
    top: -4px;
    right: 18px;
  }
  a {
    position: relative;
  }
</style>
