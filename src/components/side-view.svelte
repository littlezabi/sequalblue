<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  let dataItems: any = { phone: [], computers: [], watches: [] };
  let loading: boolean = true;
  export let limit:number = 0
  const getArrivals = async () => {
    loading = true;
    await axios
      .get(`/api/data`, {params: {'side-items': 1, limit}})
      .then((res) => {
        dataItems = res.data;
        loading = false;
      })
      .catch((e) => {
        loading = false;
        console.log(e);
      });
  };
  onMount(() => {
    getArrivals();
  });
</script>

<div class="side-view">
  {#if loading}
    <div class="side-trap">
      <div class="search-loading h20"></div>
      <div class="search-loading h20 l60"></div>
      <div class="search-loading h20 l20"></div>
    </div>
    <div class="side-trap">
      <div class="search-loading h20 l80"></div>
      <div class="search-loading h20 l80"></div>
      <div class="search-loading h20 l40"></div>
    </div>
    <div class="side-trap">
      <div class="search-loading h20 l20"></div>
      <div class="search-loading h20 l80"></div>
      <div class="search-loading h20 l60"></div>
    </div>
  {/if}
  {#if dataItems.phone.length > 0}
    <div class="side-trap">
      <h3>New Smart Phones</h3>
      <section class="dfc-c">
        {#each dataItems.phone as item}
          <a
            class="fade-in dfc-c cat-view-a render-list-item"
            href="/{item.slug}"
            title="abc"
          >
            {#if item.isNew}
              <span class="badge new setNewBadge">NEW</span>
            {/if}
            <img src={item.image} alt={item.name} />
            <span class="title">{item.name}</span>
          </a>
        {/each}
      </section>
    </div>
  {/if}
  {#if dataItems.computers.length > 0}
    <div class="side-trap">
      <h3>New Arrivals Computers & Laptops</h3>
      <section class="dfc-c">
        {#each dataItems.computers as item}
          <a
            class="fade-in dfc-c cat-view-a render-list-item"
            href="/{item.slug}"
            title="abc"
          >
            {#if item.isNew}
              <span class="badge new setNewBadge">NEW</span>
            {/if}
            <img src={item.image} alt={item.name} />
            <span class="title">{item.name}</span>
            <span class="fz10 fwb">{item.cpu} | {item.ram}</span>
          </a>
        {/each}
      </section>
    </div>
  {/if}
  {#if dataItems.watches.length > 0}
    <div class="side-trap">
      <h3>New Smart Watches</h3>
      <section class="dfc-c">
        {#each dataItems.watches as item}
          <a
            class="fade-in dfc-c cat-view-a render-list-item"
            href="/{item.slug}"
            title="abc"
          >
            {#if item.isNew}
              <span class="badge new setNewBadge">NEW</span>
            {/if}
            <img src={item.image} alt={item.name} />
            <span class="title">{item.name}</span>
          </a>
        {/each}
      </section>
    </div>
  {/if}
</div>
