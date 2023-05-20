<script lang="ts">
  import Middle from "../components/Middle.svelte";
  import BgColors from "../components/bg-colors.svelte";
  import Search from "../components/Search.svelte";
  import { viewport } from "$lib/intersection-observer";
  import { onMount } from "svelte";
  import axios from "axios";
  import InPageModals from "$compo/in-page-modals.svelte";
  import LatestBlogs from "$compo/latest-blogs.svelte";
  import StarRating from "$compo/StarRating.svelte";
  import { life } from "$lib/common";
  export let data: any = "";
  let categories = { phones: [], computers: [], watches: [] };
  $: ({ phones, computers } = data);
  onMount(() => {
    axios
      .get("/api/data/", {params: {
        'get-home-categories': 1
      }})
      .then((e) => {
        categories = e.data;
      })
      .catch((e) => {
        console.error(e);
      });
  });
  const dayPortion = life(Date()).dayPortion()
</script>

<Middle />
 <h1 class="main-day-portion">
  {dayPortion[0]}
  <span>
    Today is {life(Date()).format('D Mm, YYYY')} {dayPortion[1]}.
  </span>
</h1>
<Search />
<BgColors/>
<div class="page-size">
  <div
    use:viewport
    on:enterViewport={(e) => e.target.classList.add("slide-in-obsrvr")}
    on:exitViewport={(e) => e.target.classList.remove("slide-in-obsrvr")}
    class="dfc-r home-items yttteeww opacity"
  >
    <div class="home-sec">
      <h2>Specifications of Smart Devices</h2>
      <span>
        We are dedicated to providing the best specifications and related
        information for smartphones. Our team creates a list of upcoming phones
        for gamers and vloggers, so that anyone can keep up with the latest
        trends in the world of smartphones. It can be difficult to find the best
        phones and devices, but by sticking with us and supporting us, you can
        have access to all the information you need. Check out any device for
        free on our website.
      </span>
      <a href="/" class="dfc-r btn btn-primary open-icon i-90032ss">
        Smart phone list <span class="mod3el3">&rarr;</span></a
      >
    </div>
    <img src="/images/home-bg.png" class="a993 ao99c8s" alt="bg" />
  </div>
  <div class="overflow-h">
    <div
      use:viewport
      on:enterViewport={(e) => e.target.classList.add("from-right")}
      on:exitViewport={(e) => e.target.classList.remove("from-right")}
      class="product-list opacity"
    >
      <h3>New Arraivals</h3>
      <div class="dfc-r">
        {#each phones as item}
          <a
            class="p-list-a dfc-c"
            href="/smart-phones/{item.category}/{item.slug}"
            title={item.name}
          >
            {#if item.isNew}
              <span class="badge new setNewBadge">NEW</span>
            {/if}
            <img src={item.image} alt="phone" />
            <span>{item.name}</span>
          </a>
        {/each}
      </div>
    </div>
    <div class="mt-10">
      <InPageModals class_="grad-1" />
    </div>
    <div
      use:viewport
      on:enterViewport={(e) => e.target.classList.add("from-right")}
      on:exitViewport={(e) => e.target.classList.remove("from-right")}
      class="dfc-c laptops-items opacity"
    >
      <div class="dfc-c home-sec">
        <h2>Buy Your Dream Computer</h2>
        <span>
          Welcome to our website, where you can learn about computers before
          making a purchase. Whether you're looking for a computer or laptop for
          video editing, gaming, office work or home use, we've got you covered.
          Our team provides all the information and specifications you need to
          make an informed decision. From high-performance gaming laptops to
          versatile machines for video editing, we'll help you find the perfect
          computer for your needs. Don't make a purchase before checking our
          website, get access to all the information you need to make an
          informed decision.
        </span>
        <a href="/computers" class="dfc-r btn btn-primary open-icon">
          Computers & Laptops <span class="mod3el3">&rarr;</span>
        </a>
      </div>
      <img src="/images/laptop.jpg" alt="bg" />
    </div>
    <div
      use:viewport
      on:enterViewport={(e) => e.target.classList.add("slide-in-obsrvr")}
      on:exitViewport={(e) => e.target.classList.remove("slide-in-obsrvr")}
      class="product-list"
      style="box-shadow:2px 2px 14px 0px #00000029"
    >
      <h3>New Arraivals Computers</h3>
      <div class="dfc-r a-9lxxxkie">
        {#each computers as item}
          <a
            class="p-list-a dfc-c"
            href="/computers/{item.category}/{item.slug}"
            title={item.name}
          >
            {#if item.isNew}
              <span class="badge new setNewBadge">NEW</span>
            {/if}
            <img src={item.image} alt="phone" />
            <span>{item.name}</span>
            <span class="fz10 fw5">{item.cpu} | {item.ram}</span>
          </a>
        {/each}
      </div>
    </div>
  </div>
  <BgColors class_={"mt55"} />
  <div class="overflow-h" style="padding-bottom: 10px;margin-top: -20px;">
    <div
      use:viewport
      on:enterViewport={(e) => e.target.classList.add("from-right")}
      on:exitViewport={(e) => e.target.classList.remove("from-right")}
      class="dfc-r home-items product-view298 opacity"
    >
      <div class="cat-332">
        <h3 class="aoooeiw">Top Product Categories</h3>
        <div class="dfc-r">
          {#if categories.phones}
            {#each categories.phones as item}
              <a class="dfc-c" href="/smart-phones/{item.category}">
                <img
                  src="/images/logos/{item.category}.png"
                  alt="folder icon"
                />
                <span>{item.items}+ items</span>
                <p>{item.category} Phones</p>
              </a>
            {/each}
          {/if}
          {#if categories.computers}
            {#each categories.computers as item}
              <a class="dfc-c" href="/computers/{item.category}">
                <img
                  src="/images/logos/{item.category}.png"
                  alt="folder icon"
                />
                <span>{item.items}+ items</span>
                <p>{item.category} computers</p>
              </a>
            {/each}
          {/if}
          {#if categories.watches}
            {#each categories.watches as item}
              <a class="dfc-c" href="/watches/{item.category}">
                <img
                  src="/images/logos/{item.category}.png"
                  alt="folder icon"
                />
                <span>{item.items}+ items</span>
                <p>{item.category} watches</p>
              </a>
            {/each}
          {/if}
        </div>
      </div>
      <div class="dfc-r home-a-right">
        <div class="home-sec">
          <h2>Shop in the World of the Internet</h2>
          <span>
            We've organized items into different categories, making it easy for
            you to explore the latest smartphones, computers, smartwatches and
            other top-selling products on the internet. Stay with us and
            discover the latest technology trends and find the perfect product
            for you. From premium smartphones to high-performance laptops, we've
            got you covered. Browse our selection and find your next must-have
            item today!
          </span>
          <a href="/categories" class="dfc-r btn btn-primary open-icon ieexxe">
            Shop Now <span class="mod3el3">&rarr;</span></a
          >
        </div>
        <img src="/images/controllers.png" class="a993" alt="bg" />
      </div>
    </div>
    <div class="product-list blog articles-section lazyloading-img">
      <h3>Read Latest Articles</h3>
      <LatestBlogs />
    </div>
    <div
      use:viewport
      on:enterViewport={(e) => e.target.classList.add("slide-in-obsrvr")}
      on:exitViewport={(e) => e.target.classList.remove("slide-in-obsrvr")}
      class="product-list opacity"
    >
      <h3>Latest Product Arraivals</h3>
      <div class="dfc-r">
        <a class="p-list-a product-sections dfc-c" href="/" title="abc">
          <section class="product-sec82 fix-width-height">
            <span class="badge">NEW</span>
            <span class="db ma sec-title">Cozy Valentines Ideas 98 centure</span
            >
            <div class="dfc-r sec-stars">
              <StarRating rating={3.35} show_rating={true} />
            </div>
            <img src="/images/products/ps5-cont.png" alt="headphones" />
            <div class="dfc-r a9w6b8q">
              <span>Category &#x2022; Electronics &#x2022; Price &rarr; &dollar;49.99</span>
            </div>
            <span class="low9999">click to go &raquo;</span>
          </section>
        </a>
        <a class="p-list-a product-sections dfc-c" href="/" title="abc">
          <section class="product-sec82 fix-width-height">
            <span class="badge">NEW</span>
            <span class="db ma sec-title">Cozy Valentines Ideas 98 centure</span
            >
            <div class="dfc-r sec-stars">
              <StarRating rating={3.35} show_rating={true} />
            </div>
            <img src="/images/products/ps5-cont.png" alt="headphones" />
            <div class="dfc-r a9w6b8q">
              <span>Category &#x2022; Electronics &#x2022; Price &rarr; &dollar;49.99</span>
            </div>
            <span class="low9999">click to go &raquo;</span>
          </section>
        </a>
        <a class="p-list-a product-sections dfc-c" href="/" title="abc">
          <section class="product-sec82 fix-width-height">
            <span class="badge">NEW</span>
            <span class="db ma sec-title">Cozy Valentines Ideas 98 centure</span
            >
            <div class="dfc-r sec-stars">
              <StarRating rating={3.35} show_rating={true} />
            </div>
            <img src="/images/products/ps5-cont.png" alt="headphones" />
            <div class="dfc-r a9w6b8q">
              <span>Category &#x2022; Electronics &#x2022; Price &rarr; &dollar;49.99</span>
            </div>
            <span class="low9999">click to go &raquo;</span>
          </section>
        </a>
      </div>
    </div>
    <div
      use:viewport
      on:enterViewport={(e) => e.target.classList.add("fade-in")}
      on:exitViewport={(e) => e.target.classList.remove("fade-in")}
      class="df product-list akkk92111 opacity"
    >
      <div class="user-det-left">
        <div class="img-container">
          <img src="/images/my-image.png" alt="my" />
        </div>
      </div>
      <div class="user-det-right">
        <h2>LittleZabi</h2>
        <h4>Computer Programmer | Full-stack web-developer</h4>
        <span class="qout">&ldquo;</span>
        <span>
          Stay up to date on the latest technology with our comprehensive
          website for phone specifications, information about phones, firmwares,
          laptops specifications and smart watches. We provide in-depth reviews,
          comparisons, and detailed tech specs for a wide range of mobile
          devices, laptops and smartwatches. From the latest smartphones and
          tablets to laptops and smartwatches, we have all the information you
          need to make an informed decision. Our site is also a great resource
          for firmware updates, troubleshooting and repair guides. Whether
          you're a tech enthusiast or just looking to upgrade your device, we've
          got you covered.
        </span>
      </div>
    </div>
  </div>
  <BgColors class_={"mt--1000"} />
</div>

<style lang="scss">
  
  .a993 {
    margin-right: -16px;
    
  }
  .main-day-portion{
    text-align: center;
    font-weight: 500;
    font-size: 42px;
    letter-spacing: 1px;
    & span{
      text-transform: unset;
      letter-spacing: 0;
      font-size: 14px;
      font-weight: 500;
      display: block;
    }
    margin-bottom: 22px;
  }
</style>
