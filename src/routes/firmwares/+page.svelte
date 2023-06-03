<script lang="ts">
  import SideView from "../../components/side-view.svelte";
  import BgColors from "../../components/bg-colors.svelte";
  import Search from "../../components/Search.svelte";
  import type { PageData } from "./$types";
  import { WEBSITE_NAME } from "$lib/constants";
  import PageMeta from "$compo/page-meta.svelte";
  import PageBottomCards from "$compo/page-bottom-cards.svelte";
  import GetRandomFirms from "$compo/get-random-firms.svelte";
  import BreadCrumb from "$compo/bread-crumb.svelte";
  import { life, numberFormat } from "$lib/common";
  export let data: PageData;
  $: ({ items } = data);
  const dayPortion = life(Date()).dayPortion();
</script>

<svelte:head>
  <PageMeta
    title={`FIRMWARES | ${WEBSITE_NAME}`}
    description={`${WEBSITE_NAME} firmwares check the files and enjoy free contents, keep your phones update and reliable.`}
  />
</svelte:head>
<div class="page-size">
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
      { name: "firmwares", url: "/firmwares/",disabled: true },
    ]}
  />
  <div class="dfc-r main-items-view">
    <div class="main-item-left">
      <div class="dfc-r">
        {#each items as cat}
          <a class="render-list-item" href="/firmwares/{cat.slug}">
            <div class="dfc-c y-899x9l">
              <span class="title-3x3992 fz9">{numberFormat(cat.items)}+ items</span>
              <img
                src="/images/logos/{cat.slug.split('-')[0]}.png"
                alt="folder icon"
              />
              <div>
                <p class="fwn">{cat.title}</p>
                <span class="title-3x3992">click to go &raquo;</span>
              </div>
            </div>
          </a>
        {/each}
      </div>
      <div class="mt25">
        <GetRandomFirms />
      </div>
    </div>
    <div class="main-item-right">
      <SideView />
    </div>
  </div>
  <PageBottomCards />
</div>
