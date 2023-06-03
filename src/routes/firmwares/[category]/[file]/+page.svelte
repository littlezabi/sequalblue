<script lang="ts">
  import BgColors from "$compo/bg-colors.svelte";
  import Search from "$compo/Search.svelte";
  import StarRating from "$compo/StarRating.svelte";
  import type { PageData } from "./$types";
  import globeIcon from "$img/globe.svg";
  import fileIcon from "$img/file-icon.png";
  import downloadIcon from "$img/download.png";
  import cartIcon from "$img/cart.svg";
  import { formatBytes, life } from "$lib/common";
  import { CART_ADD, USER_CONTEXT } from "$lib/context/store";
  import BreadCrumb from "$compo/bread-crumb.svelte";
  import PageMeta from "$compo/page-meta.svelte";
  import SideView from "$compo/side-view.svelte";
  import PageBottomCards from "$compo/page-bottom-cards.svelte";
  import GetRandomFirms from "$compo/get-random-firms.svelte";
  import ShareableLinks from "$compo/shareable-links.svelte";
  let user = $USER_CONTEXT;
  export let data: PageData;
  $: ({ firmware, slug, cat } = data);
  const dayPortion = life(Date()).dayPortion();
</script>

<svelte:head>
  <PageMeta
    title={`${firmware.title} | ${cat.toUpperCase()}`}
    description={firmware.description}
    keywords={firmware.keywords}
  />
</svelte:head>
<div class="firm-top-bg"></div>
<h1 class="main-day-portion">
  {dayPortion[0]}
  <span>
    Today is {life(Date()).format("D Mm, YYYY")}
    {dayPortion[1]}.
  </span>
</h1>
<Search />
<div class="page-size fade-in firmwares-view">
  <BreadCrumb
    urls={[
      { name: "firmwares", url: "/firmwares/" },
      { name: firmware.category, url: `/firmwares/${cat}` },
      { name: firmware.title, url: slug, disabled: 1 },
    ]}
  />
  
  <div class="dfc-r ai-s firm-item-view">
    <div class="syekc">
      <img src="{fileIcon}" alt="file icon" />
    </div>
    <div class="b-3kkos">
      <h1>{firmware.title}</h1>
      <h3>{firmware.desc}</h3>
      <div class="dfc-r ai-s js-s">
        <div class="rating-sec">
          <StarRating rating={firmware.popularity} __style__={"width: 20px"}/>
        </div>
      </div>
      <div class="dfc-r ai-s js-s">
        <img class="mr3" src={globeIcon} alt="globe icon" />
        <span class="fz12 mr3">{firmware.popularity} rating </span>
        <span class="fz12 mr3">
          total {firmware.fans} people loves.
        </span>
      </div>
      <div class="dfc-r ai-s js-s mt-5">
        {#if firmware.is_new == 0}
          <p class="badge new mr3">new</p>
        {/if}
        {#if firmware.is_featured}
          <p class="badge new mr3">Featured</p>
        {/if}
        {#if firmware.extension}
          <p class="badge new mr3">{firmware.extension}</p>
        {/if}
        <p class="badge new mr3">Size {formatBytes(firmware.size)}</p>
      </div>
      <div class="dfc-r ai-s js-s mt-5">
        <span class="t-aaxd mr3 fwb">
          <span>Price</span>
          {firmware.price > 0 ? `${firmware.price.toFixed(2)}$` : "Free"}
        </span>
      </div>
      <div class="dfc-r ai-s js-s mt-5">
        {#if firmware.price > 0}
          <button
            on:click={() =>
              CART_ADD(
                {
                  _id: firmware._id,
                  category: firmware.category,
                  description: firmware.description,
                  folder_title: firmware.folder_title,
                  is_featured: firmware.is_featured,
                  is_new: firmware.is_new,
                  price: firmware.price,
                  size: firmware.size,
                  title: firmware.title,
                },
                "firmware"
              )}
            class="btn btn-download dfc-r"
          >
            Add to Cart <img
              class="ml-10 invert h-28"
              src="{cartIcon}"
              alt="cart icon"
            />
          </button>
        {:else}
          <a
            href={user.username
              ? firmware.url
              : `/sign-in?r=/firmwares/${cat}/${firmware.slug}`}
            target={user.username ? "_blank" : "_self"}
            class="btn btn-download dfc-r"
          >
            Click to Download <img
              class="ml-10"
              src="{downloadIcon}"
              alt="download icon"
            />
          </a>
        {/if}
      </div>
      <ShareableLinks fox={{slug, hits:firmware.hits,fans:firmware.fans,popularity:firmware.popularity}} />
    </div>
  </div>
  <div class="dfc-r main-items-view">
    <div class="shadow-bg w-69">
      <BgColors />
      <GetRandomFirms type="firms" />
    </div>
    <div class="main-item-right">
      <SideView limit={4}/>
      <BgColors />
    </div>
    <PageBottomCards />
  </div>
</div>
