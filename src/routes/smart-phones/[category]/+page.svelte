<script lang="ts">
  import SideView from "../../../components/side-view.svelte";
  import BgColors from "../../../components/bg-colors.svelte";
  import Search from "../../../components/Search.svelte";
  import type { PageData } from "./$types";
  import Paginations from "$compo/paginations.svelte";
  import RenderItems from "$compo/render-list.svelte";
  import PageBottomCards from "$compo/page-bottom-cards.svelte";
  export let data: PageData;
  $: ({ items, cat, pageNo } = data);
</script>

<div class="page-size">
  <BgColors />
  <Search />
  <div class="dfc-r main-items-view">
    <div class="dfc-r main-89kckk">
      <div class="dfc-r main-item-left">
       <RenderItems items={items}  base_url='/smart-phones/{cat}'/>
      </div>
      <Paginations
        {cat}
        renderFor={`/smart-phones/${cat}`}
        queryStrings={`phones=1&category=${cat}`}
        pageNo={pageNo}
      />
    </div>
    <div class="main-item-right">
      <SideView limit={items.length < 10 ? {items: 1, limit: 2} : items.length > 10 && items.length < 20 ? {items: 2, limit: 2} : items.length > 20 && items.length < 30 ? {items: 3, limit: 2} : {items: 3, limit: 3} } />
    </div>
  </div>
  <PageBottomCards/>
</div>
