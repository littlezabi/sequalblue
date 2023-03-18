<script lang="ts">
  import SideView from "../../components/side-view.svelte";
  import BgColors from "../../components/bg-colors.svelte";
  import Search from "../../components/Search.svelte";
  import type { PageData } from "./$types";
  import PageBottomCards from "$compo/page-bottom-cards.svelte";
  import BreadCrumb from "$compo/bread-crumb.svelte";
  export let data: PageData;
  $: ({ categories } = data);
</script>

<div class="page-size fade-in">
  <BgColors />
  <Search />
  <BreadCrumb
    urls={[
      { name: "computers", url: "/computers/", disabled:true },
    ]}
/>
  <div class="dfc-r main-items-view">
    <div class="dfc-r main-item-left">
      {#each categories as cat}
        <a class="render-list-item" href="/computers/{cat.category}">
          <div class="dfc-c y-899x9l">
            <span class="title fz9">{cat.items}+ items</span>
            <img src="/images/logos/{cat.category}.png" alt="folder icon" />
            <div>
              <p>{cat.category}</p>
              <span class="fz9">click to go &raquo;</span>
            </div>
          </div>
        </a>
      {/each}
    </div>
    <div class="main-item-right">
      <SideView />
    </div>
  </div>
  <PageBottomCards/>
</div>
