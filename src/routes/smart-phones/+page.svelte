<script lang="ts">
  import SideView from "../../components/side-view.svelte";
  import BgColors from "../../components/bg-colors.svelte";
  import Search from "../../components/Search.svelte";
  import type { PageData } from "./$types";
  import PageBottomCards from "$compo/page-bottom-cards.svelte";
  import BreadCrumb from "$compo/bread-crumb.svelte";
  import { life } from "$lib/common";
  export let data: PageData;
  $: ({ categories } = data);
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
    urls={[{ name: "phones", url: "/smart-phones/", disabled: true }]}
  />
  <div class="dfc-r main-items-view">
    <div class="dfc-r main-item-left">
        {#each categories as cat}
          <a class="render-list-item" href="/smart-phones/{cat.category}">
            <div class="dfc-c y-899x9l">
              <span class="title">{cat.items}+ items</span>
              <img src="/images/logos/{cat.category}.png" alt="{cat.category} logo" />
              <div>
                <p>{cat.category} &raquo;</p>
              </div>
            </div>
          </a>
        {/each}
    </div>
    <div class="main-item-right">
      <SideView />
    </div>
  </div>
  <PageBottomCards />
</div>
