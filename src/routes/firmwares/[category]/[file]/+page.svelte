<script lang="ts">
  import BgColors from "$compo/bg-colors.svelte";
  import Search from "$compo/Search.svelte";
  import StarRating from "svelte-star-rating";
  import type { PageData } from "./$types";
  import globeIcon from "$lib/assets/globe.svg";
  import { formatBytes } from "$lib/common";
  import { CART_ADD, CART_CONTEXT, MESSAGE, USER_CONTEXT } from "$lib/context/store";
  import BreadCrumb from "$compo/bread-crumb.svelte";
  import PageMeta from "$compo/page-meta.svelte";
  import SideView from "$compo/side-view.svelte";
  import PageBottomCards from "$compo/page-bottom-cards.svelte";
  import GetRandomFirms from "$compo/get-random-firms.svelte";
  let user = $USER_CONTEXT;
  export let data: PageData;
  $: ({ firmware, slug, cat } = data);
  const __rating__ = {
    emptyColor: "hsl(240, 80%, 85%)",
    fullColor: "#ff0099",
    showText: false,
    size: 14,
  };
</script>

<svelte:head>
  <PageMeta
    title={`${firmware.title} | ${cat.toUpperCase()}`}
    description={firmware.description}
  />
</svelte:head>
<BgColors />
<Search />
<div class="page-size fade-in firmwares-view">
  <BreadCrumb
    urls={[
      { name: "home", url: "/" },
      { name: "firmwares", url: "/firmwares/" },
      { name: firmware.folder_title, url: `/firmwares/${cat}` },
      { name: firmware.title, url: slug, disabled: 1 },
    ]}
  />
  <div class="dfc-r ai-s firm-item-view">
    <div>
      <img src="/images/assets/file-icon.png" alt="file icon" />
    </div>
    <div class="b-3kkos">
      <h1>{firmware.title}</h1>
      <h3>{firmware.description}</h3>
      <div class="dfc-r ai-s js-s">
        <div class="rating-sec">
          <StarRating rating={firmware.rating_points} config={__rating__} />
        </div>
      </div>
      <div class="dfc-r ai-s js-s">
        <img class="mr3" src={globeIcon} alt="globe icon" />
        <span class="fz12 mr3">{firmware.rating_points} rating </span>
        <span class="fz12 mr3">
          total {firmware.rating_count} reviews.
        </span>
      </div>
      <div class="dfc-r ai-s js-s mt-5">
        {#if firmware.is_new == 0}
          <p class="badge new mr3">new</p>
        {/if}
        {#if firmware.is_featured}
          <p class="badge new mr3">Featured</p>
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
              src="/images/assets/cart.svg"
              alt="download icon"
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
              src="/images/assets/download.png"
              alt="download icon"
            />
          </a>
        {/if}
      </div>
    </div>
  </div>
  <div class="dfc-r main-items-view">
    <GetRandomFirms />
    <div class="main-item-right">
      <SideView />
    </div>
    <PageBottomCards />
  </div>
</div>
