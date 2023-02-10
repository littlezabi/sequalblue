<script lang="ts">
  import SideView from "../../../components/side-view.svelte";
  import BgColors from "../../../components/bg-colors.svelte";
  import Search from "../../../components/Search.svelte";
  import { lazyLoad, viewport } from "$lib/intersection-observer";
  import openInNew from "$lib/assets/open-in-new.svg";
  import type { PageData } from "./$types";
  import Paginations from "$compo/paginations.svelte";
  import RenderItems from "$compo/render-list.svelte";
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
      { name: "watches", url: "/watches/" },
      { name: cat, url: `/watches/${cat}`, disabled: true },
      pageNo > 0
        ? {
            name: `page ${pageNo}`,
            url: `/watches/${cat}?p=${pageNo}`,
            disabled: true,
          }
        : false,
    ]}
  />
  <div class="dfc-r main-items-view">
    <div class="dfc-r main-89kckk">
      <div class="dfc-r main-item-left">
       <RenderItems items={items}  base_url='/watches/{cat}'/>
      </div>
      <Paginations
        {cat}
        renderFor={`/watches/${cat}`}
        queryStrings={`watches=1&category=${cat}`}
        pageNo={pageNo}
      />
    </div>
    <div class="main-item-right">
      <SideView />
    </div>
  </div>
  <PageBottomCards/>
</div>
