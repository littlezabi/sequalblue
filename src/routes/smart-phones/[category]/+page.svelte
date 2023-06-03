<script lang="ts">
  import SideView from "$compo/side-view.svelte";
  import BgColors from "$compo/bg-colors.svelte";
  import Search from "$compo/Search.svelte";
  import type { PageData } from "./$types";
  import Paginations from "$compo/paginations.svelte";
  import { __rating__ } from "$lib/constants";
  import PageBottomCards from "$compo/page-bottom-cards.svelte";
  import BreadCrumb from "$compo/bread-crumb.svelte";
  import { life } from "$lib/common";
  export let for_: string = "phone";
  export let data: PageData;
  $: ({ items, cat, pageNo } = data);
  const dayPortion = life(Date()).dayPortion();
</script>

<div class="page-size fade-in">
  <BgColors />
  <h1 class="main-day-portion">
    {dayPortion[0]}
    <span>
      Today is {life(Date()).format("D Mm, YYYY")}
      {dayPortion[1]}.
    </span>
  </h1>
  <Search />
  <BreadCrumb
    urls={[
      { name: "phones", url: "/smart-phones/" },
      { name: cat, url: `/smart-phones/${cat}` },
      pageNo > 0
        ? {
            name: `page ${pageNo}`,
            url: `/smart-phones/${cat}?p=${pageNo}`,
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
            class="dfc-c cat-view-a render-list-item terno"
            href="{cat}/{item.slug}"
            title={item.name}
          >
            {#if item.isNew}
              <span class="badge new setNewBadge">NEW</span>
            {/if}
            <img src={item.image} alt={item.title} />
            <span class="title">{item.title}</span>
            {#if for_ === "computers"}
              <span class="fz10 fwb">{item.cpu} | {item.ram}</span>
            {/if}
          </a>
        {/each}
      </div>
      <Paginations
        {cat}
        renderFor={`/smart-phones/${cat}`}
        queryStrings={`phones=1&category=${cat}`}
        {pageNo}
      />
      <PageBottomCards />
    </div>
    <div class="main-item-right">
      <SideView limit={4} />
    </div>
  </div>
</div>
