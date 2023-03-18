<script lang="ts">
  import cartIcon from "$img/cart.svg";
  import logoIcon from "$img/logo-black.png";
  import { page } from "$app/stores";
  import heart from "$img/heart.svg";
  import trends from "$img/trends.svg";
  import new_ from "$lib/assets/new.svg";
  import homeIcon from "$lib/assets/home.png";
  import phoneIcon from "$img/phone.png";
  import monitorIcon from "$img/monitor.png";
  import fireIcon from "$img/fire.svg";
  import watchIcon from "$img/watch.png";
  import categoryIcon from "$img/category.png";
  import fileIcon from "$img/file-bin.png";
  import searchIcon from "$img/search.svg";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  export let user: any;
  let userObject: any = false;
  let toggleOpen = false;
  $: user, (userObject = user.object);
  onMount(() => {
    document
      .querySelectorAll(".nav-menu a")
      .forEach((e) => e.addEventListener("click", handleMenu));
  });
  const handleMenu = () => {
    let element: any = document.querySelector(".nav-menu");
    toggleOpen = !toggleOpen;
    if (!toggleOpen) {
      element.classList.remove("open");
      setTimeout(() => {
        element.style.display = "none";
      }, 400);
    } else {
      element.style.display = "block";
      element.classList.add("open");
    }
  };
  let searchTerm = "";
  const handleSearch = async () => {
    if (searchTerm === "") return 0;
    handleMenu();
    await goto(`/search/${searchTerm}`);
  };
</script>

<header>
  <nav class="page-size dfc-r jc-sb">
    <div class="logo">
      <a href="/" class="dfc-r fwb">
        <img src={logoIcon} alt="feather" />
      </a>
    </div>
    <div class="nav-menu close">
      <div class="menu-header dfc-r">
        <a class:active={$page.url.pathname === "/"} href="/">
          <img src={homeIcon} alt="homeIcon" />
        </a>
        <div class="dfc-r" />
        <a class:active={$page.url.pathname === "/about"} href="/about">About</a
        >
        <a class:active={$page.url.pathname === "/blogs"} href="/blogs">Blogs</a
        >
        <a class:active={$page.route.id === "/cart"} href="/cart" class="dfc-r">
          <img src={cartIcon} alt="cart" />
          <span class="badge danger">0</span>
        </a>
        <a href={userObject ? "/profile" : "/sign-in"} class="user-menu">
          <div class="dfc-r">
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
          </div>
        </a>
      </div>
      <form class="dfc-r menu-search" on:submit|preventDefault={handleSearch}>
        <input
          type="search"
          placeholder="Search your term or keyword..."
          bind:value={searchTerm}
          name="q"
        />
        <button type="submit">
          <img src={searchIcon} alt="search icon" />
        </button>
      </form>
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
        <ul class="first-items dfc-c ai-s">
          <li>
            <h4 class="fwb mb-5 dfc-r">
              <img src={categoryIcon} alt="phone icon" /> Tools
            </h4>
          </li>
          
          <li>
            <a
              class:active={$page.url.pathname === "/image/converter"}
              href="/image/converter"
              ><img src={phoneIcon} alt="phone icon" /> Image Converter</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/smart-phones"}
              href="/smart-phones"
              ><img src={phoneIcon} alt="phone icon" /> Invert Image</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/smart-phones"}
              href="/smart-phones"
              ><img src={phoneIcon} alt="phone icon" /> Fast Resize Image</a
            >
          </li>
          <li>
            <a
              class:active={$page.url.pathname === "/smart-phones"}
              href="/smart-phones"
              ><img src={phoneIcon} alt="phone icon" /> PPTX to PDF</a
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
    <div class="dfc-c">
      <button on:click={handleMenu} class="dfc-r close-menu">
        <div class:open={toggleOpen}>
          <span />
          <span />
          <span />
        </div>
      </button>
    </div>
  </nav>
</header>

<style lang="scss">
  .badge.danger {
    position: absolute;
    top: -4px;
    right: 17px;
  }
  a {
    position: relative;
  }
</style>
