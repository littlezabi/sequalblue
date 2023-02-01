<script lang="ts">
  import SideView from "$compo/side-view.svelte";
  import BgColors from "$compo/bg-colors.svelte";
  import Search from "$compo/Search.svelte";
  import { viewport } from "$lib/intersection-observer";
  import folderIcon from "$lib/assets/folder.png";
  import type { PageData } from "./$types";
  import StarRating from "svelte-star-rating";
  import Paginations from "$compo/paginations.svelte";
  import { firmsAndFolderPerPage, __rating__ } from "$lib/constants";
  import BreadCrumb from "$compo/bread-crumb.svelte";
  import PageMeta from "$compo/page-meta.svelte";
  import PageBottomCards from "$compo/page-bottom-cards.svelte";
  import GetRandomFirms from "$compo/get-random-firms.svelte";
  export let data: PageData;
  $: ({ folders, firms, cat, pageNo } = data);
</script>

<svelte:head>
  <PageMeta
    title={`${cat.toUpperCase()} | FIRMWARES`}
    description={`${cat} check the files and enjoy free contents`}
  />
</svelte:head>
<div class="page-size">
  <BgColors />
  <Search />
  <BreadCrumb
    urls={[
      { name: "home", url: "/" },
      { name: "firmwares", url: "/firmwares/" },
      { name: cat, url: `/firmwares/${cat}`, disabled: true },
    ]}
  />
  <div class="dfc-r main-items-view">
    <div class="dfc-r main-89kckk">
      <div class="dfc-c main-item-left">
        <div class="dfc-r">
          {#each folders as item}
            <a
              class="dfc-c jc-sb cat-view-a render-list-item"
              title="click to open {item.title}"
              href="/firmwares/{item.slug}"
            >
              {#if item.isNew}
                <span class="badge new setNewBadge">NEW</span>
              {/if}
              <img src={folderIcon} alt={item.name} />
              <div class="pb-8">
                <span class="title">{item.title}</span>
                <span class="fz10 fwb"
                  >{item.description ? item.description : ""}</span
                >
              </div>
            </a>
          {/each}
          <div class="firms-files">
            <div class="dfc-r ai-s">
              {#each firms as item}
              <a
              class="fade-in firms-item dfc-c ai-s"
              href="/firmwares/{item.category}/{item.slug}"
              title="Download {item.title}"
            >
              <section>
                <div class="labels">
                  {#if item.price > 0}
                    <span class="label-price">{item.price.toFixed(2)}USD</span>
                  {/if}
                  {#if item.is_featured}
                    <span>featured</span>
                  {/if}
                </div>
                <div class="dfc-r ai-s no-wrap ion-32x">
                  <img src="/images/assets/file-icon.png" alt="file icon" />
                  <div class="dfc-r js-s d-a3929">
                    <span class="sec-title">{item.title}{#if item.is_new == 0}
                      <span class="badge new">NEW</span>
                    {/if}</span>
                  
                    <div class="dfc-r ai-s jc-fs">
                      <div class="rating-sec">
                        <StarRating
                          rating={item.rating_points}
                          config={{...__rating__,  size: 14}}
                        />
                      </div>
                      <span class="fz10 mr3">{item.rating_points} rating </span>
                      <span class="fz10 mr3">
                        total {item.rating_count} reviews
                      </span>
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
