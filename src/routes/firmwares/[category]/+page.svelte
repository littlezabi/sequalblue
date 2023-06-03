<script lang="ts">
  import SideView from "$compo/side-view.svelte";
  import BgColors from "$compo/bg-colors.svelte";
  import Search from "$compo/Search.svelte";
  import folderIcon from "$img/folder.png";
  import fileIcon from "$img/file-icon.png";
  import type { PageData } from "./$types";
  import StarRating from "$compo/StarRating.svelte";
  import Paginations from "$compo/paginations.svelte";
  import { firmsAndFolderPerPage, __rating__ } from "$lib/constants";
  import BreadCrumb from "$compo/bread-crumb.svelte";
  import PageMeta from "$compo/page-meta.svelte";
  import PageBottomCards from "$compo/page-bottom-cards.svelte";
  import GetRandomFirms from "$compo/get-random-firms.svelte";
  import { life, numberFormat, trimTitle } from "$lib/common";
  export let data: PageData;
  $: ({ folders, firms, cat, pageNo } = data);
  const dayPortion = life(Date()).dayPortion();
</script>

<svelte:head>
  <PageMeta
    title={`${cat.toUpperCase()} | FIRMWARES`}
    description={`${cat} check the files and enjoy free contents`}
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
      { name: "firmwares", url: "/firmwares/" },
      { name: cat, url: `/firmwares/${cat}`, disabled: true },
    ]}
  />
  <div class="dfc-r main-items-view">
    <div class="dfc-r main-89kckk">
      <div class="dfc-c main-item-left">
        <div class="dfc-r jc-fs">
          {#each folders as item}
          <a
          class="fade-in cat-view-a render-list-item folders"
          title="click to open {item.title}"
          href="/firmwares/{item.slug}"
        >
          {#if item.is_new}
            <span class="badge new setNewBadge">NEW</span>
          {/if}
          <img src={folderIcon} alt={item.name} />
          <div>
            <span class="title fz14">{item.title}</span>
            <span class="cic0c02 fz12">{numberFormat(item.items)}+ items</span>
          </div>
        </a>
          {/each}
          <div class="firms-files">
            <div class="dfc-r ai-str">
              {#each firms as item}
                <a
                  class="fade-in firms-item dfc-c ai-s"
                  href="/firmwares/{item.category}/{item.slug}"
                  title="Download {item.title}"
                >
                  <section>
                    <div class="labels">
                      {#if item.price == 0}<span class="label-price">{item.price.toFixed(2)}USD</span>{/if}
                      {#if item.is_featured}<span>featured</span>{/if}
                      {#if item.is_new == 0}<span class="is_new">NEW</span>{/if}
                    </div>
                    <div class="dfc-r ai-s no-wrap ion-32x">
                      <img src="{fileIcon}" alt="file icon" />
                      <div class="dfc-r js-s d-a3929">
                        <span class="sec-title">
                          {trimTitle(item.title, 45, 11)}
                        </span>

                        <div class="dfc-r ai-c jc-fs">
                          <div class="rating-sec"><StarRating rating={item.rating} /></div>
                          <span class="fz12 mr3">{item.rating} rating</span>
                          <span class="fz12 mr3">Total {numberFormat(item.loves)} peoples love this.</span>
                        </div>
                        <div class="dfc-c ai-s a9w6b8q">
                          <span>
                            Price &rarr; {item.price > 0
                              ? `${item.price.toFixed(2)}$`
                              : "Free"}
                          </span>
                          <span class="low9999">click to download &raquo;</span>
                        </div>
                      </div>
                    </div>
                  </section>
                </a>
              {/each}
            </div>
          </div>
        </div>
        <Paginations
          {cat}
          perPage={firmsAndFolderPerPage}
          renderFor={`/firmwares/${cat}`}
          queryStrings={`firmwares=1&category=${cat}`}
          {pageNo}
        />
      </div>
      <div class="shadow-bg mt25 exii3">
        <GetRandomFirms />
      </div>
    </div>
    <div class="main-item-right">
      <SideView />
    </div>
  </div>
  <PageBottomCards />
</div>
