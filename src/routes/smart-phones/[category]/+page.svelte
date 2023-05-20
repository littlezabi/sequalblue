<script lang="ts">
  import SideView from "$compo/side-view.svelte";
  import BgColors from "$compo/bg-colors.svelte";
  import Search from "$compo/Search.svelte";
  import type { PageData } from "./$types";
  import Paginations from "$compo/paginations.svelte";
  import { __rating__ } from "$lib/constants";
  import PageBottomCards from "$compo/page-bottom-cards.svelte";
  import BreadCrumb from "$compo/bread-crumb.svelte";
  import { SET_MODAL, addItemSlug } from "$lib/context/store";
  export let for_:string = 'phone'
  export let data: PageData;
  const handleView = (slug:string)=>{
    addItemSlug(slug)
    SET_MODAL({isClosing: false,show: true,title: "Password required!",children: 'item-view'});
  }
  $: ({ items, cat, pageNo } = data);
</script>

<div class="page-size fade-in">
  <BgColors />
  <Search />
  <BreadCrumb
    urls={[
      { name: "phones", url: "/smart-phones/" },
      { name: cat, url: `/smart-phones/${cat}` },
      pageNo > 0 ? { name: `page ${pageNo}`, url: `/smart-phones/${cat}?p=${pageNo}`, disabled: true } : false,
    ]}
  />
  <div class="dfc-r main-items-view">
    <div class="dfc-r main-89kckk">
      <div class="dfc-r main-item-left">
       <!-- <RenderItems items={items}  base_url='/smart-phones/{cat}'/> -->
       {#each items as item}
        <a class="dfc-c cat-view-a render-list-item terno" href="#" title="{item.name}">
            {#if item.isNew}
              <span class="badge new setNewBadge">NEW</span>
            {/if}
            <img src={item.image} alt={item.name} />
            <span class="title">{item.name}</span>
            {#if for_ === 'computers'}
              <span class="fz10 fwb">{item.cpu} | {item.ram}</span>
            {/if}
            <a href="/{item.slug}" title="{item.name}">
              open
            </a>
            <button on:click={()=>{handleView(item.slug)}} style="background:black;color:white;padding:8px 10px;margin:10px;">view</button>
        </a>
        {/each}
      </div>
      <Paginations
        {cat}
        renderFor={`/smart-phones/${cat}`}
        queryStrings={`phones=1&category=${cat}`}
        pageNo={pageNo}
      />
    </div>
    <div class="main-item-right">
      <SideView limit={3}/>
    </div>
  </div>
  <PageBottomCards/>
</div>
