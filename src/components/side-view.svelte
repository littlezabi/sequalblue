<script lang="ts">
  import { sideviewItemsPerColLimit } from "$lib/constants";
  import axios from "axios";
  import fireIcon from "$img/fire.svg";
  import eyeHeart from "$img/heart.svg";
  import { onMount } from "svelte";
  import { numberFormat } from "$lib/common";
  let dataItems: any = { phone: [], computers: [] };
  let loading: boolean = true;
  export let limit: number = sideviewItemsPerColLimit;
  export let styles: any = {};
  onMount(async () => {
    loading = true;
    await axios
      .get(`/api/data/`, { params: { "side-items": 1, limit } })
      .then((res) => {
        dataItems = res.data;
        loading = false;
      })
      .catch((e) => {
        loading = false;
        console.error(e);
      });
  });
</script>

<div class="side-view">
  {#if loading}
    <div class="side-trap">
      <div class="search-loading h20" />
      <div class="search-loading h20 l60" />
      <div class="search-loading h20 l20" />
    </div>
    <div class="side-trap">
      <div class="search-loading h20 l80" />
      <div class="search-loading h20 l80" />
      <div class="search-loading h20 l40" />
    </div>
    <div class="side-trap">
      <div class="search-loading h20 l20" />
      <div class="search-loading h20 l80" />
      <div class="search-loading h20 l60" />
    </div>
  {/if}
  {#if dataItems.phone.length > 0}
    <div class="side-trap">
      <h3>New Smart Phones</h3>
      <section class={styles.flex ? styles.flex : "dfc-r"}>
        {#each dataItems.phone as item}
          <a
            class="fade-in dfc-c cat-view-a render-list-item"
            href="/smart-phones/{item.category}/{item.slug}"
            title="abc"
          >
            {#if item.isNew}
              <span class="badge new setNewBadge">NEW</span>
            {/if}
            <img src={item.image} alt={item.title} />
            <span class="title">{item.title}</span>
            <div class="p-8832x dfc-r">
              <div class="dfc-c">
                <img src={eyeHeart} alt="" />
                {numberFormat(item.loves)}
              </div>
              <div class="dfc-c">
                <img src={fireIcon} alt="" />
                {numberFormat(item.views)}
              </div>
            </div>
          </a>
        {/each}
      </section>
    </div>
  {/if}
  {#if dataItems.computers.length > 0}
    <div class="side-trap lap-338x">
      <h3>New Arrivals Computers & Laptops</h3>
      <section class={styles.flex ? styles.flex : "dfc-r"}>
        {#each dataItems.computers as item}
          <a
            class="fade-in dfc-c cat-view-a render-list-item"
            href="/computers/{item.category}/{item.slug}"
            title="abc"
          >
            {#if item.isNew}
              <span class="badge new setNewBadge">NEW</span>
            {/if}
            <img src={item.image} alt={item.title} />
            <span class="title">{item.title}</span>
            <span class="fz10 fw5">{item.cpu} | {item.ram}</span>
            <div class="p-8832x dfc-r">
              <div class="dfc-c">
                <img src={eyeHeart} alt="" />
                {numberFormat(item.loves)}
              </div>
              <div class="dfc-c">
                <img src={fireIcon} alt="" />
                {numberFormat(item.views)}
              </div>
            </div>
          </a>
        {/each}
      </section>
    </div>
  {/if}
</div>
