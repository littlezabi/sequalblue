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
    urls={[{ name: "phones", url: "/smart-phones/", disabled: true }]}
  />
  <div class="dfc-r main-items-view">
    <div class="dfc-r main-item-left">
        {#each categories as cat}
          <a class="render-list-item" href="/smart-phones/{cat.category}">
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
  <PageBottomCards />
</div>

<style>
  :root {
    --bg-color: rgb(20, 20, 20);
    --card-color: rgb(23, 23, 23);
  }
  #cards {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    max-width: 1024px;
    width: calc(100% - 20px);
    background: black;
  }
  .card {
    background-color: rgba(255, 255, 255, 0.02);
    border-radius: 10px;
    cursor: pointer;
    height: 260px;
    width: 300px;
    position: relative;
  }
  #cards:hover > .card > .card-border {
    opacity: 1;
  }
  .card:hover::before {
    opacity: 1;
  }
  .card::before,
  .card > .card-border {
    border-radius: inherit;
    content: "";
    height: 100%;
    left: 0px;
    position: absolute;
    top: 0px;
    width: 100%;
    z-index: 2;
    opacity: 0;
    transition: opacity 500ms;
  }
  .card::before {
    background: radial-gradient(
      800px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.07),
      transparent 40%
    );
    z-index: 3;
  }
  .card > .card-border {
    background: radial-gradient(
      400px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.35),
      transparent 40%
    );
    z-index: 1;
  }
  .card > .card-content {
    background: var(--card-color);
    border-radius: inherit;
    margin: 1px;
    height: calc(100% - 2px);
    width: calc(100% - 2px);
    position: relative;
    z-index: 2;
  }
</style>
