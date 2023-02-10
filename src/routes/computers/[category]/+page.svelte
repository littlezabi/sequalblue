<script lang="ts">
  import SideView from "../../../components/side-view.svelte";
  import BgColors from "../../../components/bg-colors.svelte";
  import Search from "../../../components/Search.svelte";
  import { lazyLoad, viewport } from "$lib/intersection-observer";
  import openInNew from "$lib/assets/open-in-new.svg";
  import type { PageData } from "./$types";
  import Paginations from "$compo/paginations.svelte";
  import PageBottomCards from "$compo/page-bottom-cards.svelte";
  import BreadCrumb from "$compo/bread-crumb.svelte";
  export let data: PageData;
  $: ({ items, cat, pageNo } = data);
</script>

<div class="page-size">
  <BgColors />
  <Search />
  <BreadCrumb
    urls={[
      { name: "computers", url: "/computers/" },
      { name: cat, url: `/computers/${cat}`, disabled: true },
      pageNo > 0
        ? {
            name: `page ${pageNo}`,
            url: `/computers/${cat}?p=${pageNo}`,
            disabled: true,
          }
        : false,
    ]}
  />
  <div class="dfc-r main-items-view">
    <div class="dfc-r main-89kckk">
      <div class="dfc-r main-item-left">
        {#each items as item}
          <a
            class="dfc-c jc-sb cat-view-a render-list-item terno ic93"
            title="click to open {item.name}"
            href="/computers/{cat}/{item.slug}"
          >
            {#if item.isNew}
              <span class="badge new setNewBadge">NEW</span>
            {/if}
            <img src={item.image} alt={item.name} />
            <div class="pb-8">
              <span class="title">{item.name}</span>
              <span class="fz10 fwb">{item.cpu} | {item.ram}</span>
            </div>
          </a>
        {/each}
      </div>
      <Paginations
        {cat}
        renderFor={`/computers/${cat}`}
        queryStrings={`computers=1&category=${cat}`}
        {pageNo}
      />
    </div>
    <div class="main-item-right">
      <SideView />
    </div>
  </div>
  <PageBottomCards />
</div>
