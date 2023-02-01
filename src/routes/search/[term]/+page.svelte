<script lang="ts">
  import BgColors from "$compo/bg-colors.svelte";
  import Search from "$compo/Search.svelte";
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import axios from "axios";
  import StarRating from "svelte-star-rating";
  import { __rating__ } from "$lib/constants";
  export let data: PageData;
  $: ({ res } = data);
  let loading = true;
  let __len__ = 0;
  let cats: any = {
    phones: [],
    laptops: [],
    watches: [],
    firms: [],
  };
  onMount(() => {
    console.log(res);
    axios
      .get("/api/search/", { params: { term: $page.params.term } })
      .then((res) => {
        loading = false;
        cats = res.data.cats;
        __len__ = res.data.__len__;
      })
      .catch((e) => {
        loading = false;
        console.log(e);
      });
  });
</script>

<div class="page-size">
  <BgColors class_={"mt--500"} />
  <Search />
  <div class="dfc-r jc-sb search-result-view">
    <div class="left">
      {#if loading}
        <section class="fade-in">
          <div class="search-loading h20" />
          <div class="search-loading h20 l60" />
          <div class="search-loading h20 l20" />
        </section>
      {/if}
      {#if loading}
        <section class="fade-in">
          <div class="search-loading h20" />
          <div class="search-loading h20 l40" />
          <div class="search-loading h10 l80" />
        </section>
      {/if}
      {#if loading}
        <section class="fade-in">
          <div class="search-loading h40" />
          <div class="search-loading h20 l80" />
          <div class="search-loading h10 l40" />
        </section>
      {/if}
      {#if !loading}
        <section class="fade-in slide-in-obsrvr">
          <h4>Total {__len__} Categories Found.</h4>
        </section>
      {/if}
      {#if __len__ === 0}
        <section class="fade-in">
          <h5>
            No Categories Data Found Check you search term and keyword
          </h5>
        </section>
      {/if}
      {#if cats.firms.length > 0}
        <section class="fade-in">
          <h3>Firmwares Categories</h3>
          {#each cats.firms as item}
            <a href="/firmwares/{item.slug}" title={item.title}>{item.title}</a>
          {/each}
        </section>
      {/if}
      {#if cats.laptops.length > 0}
        <section class="fade-in slide-in-obsrvr">
          <h3>Laptops Categories</h3>
          {#each cats.laptops as item}
            <a href="/computers/{item.category}/" title={item.category}
              >{item.category}</a
            >
          {/each}
        </section>
      {/if}
      {#if cats.phones.length > 0}
        <section class="fade-in slide-in-obsrvr">
          <h3>Phones Categories</h3>
          {#each cats.phones as item}
            <a href="/smart-phones/{item.category}/" title={item.category}
              >{item.category}</a
            >
          {/each}
        </section>
      {/if}
      {#if cats.watches.length > 0}
        <section class="fade-in">
          <h3>Watches Categories</h3>
          {#each cats.watches as item}
            <a href="/watches/{item.category}/" title={item.category}
              >{item.category}</a
            >
          {/each}
        </section>
      {/if}
    </div>
    <div class="right">
      <div class="dfc-r src-sec">
        {#if __len__ === 0 && loading === false}
          <div class="no-data dfc-c">
            <h2>NO DATA FOUND!</h2>
            <h4>Check your keyword, term and query. try with other category name, id or tags name.</h4>
          </div>
        {/if}
        {#if res?.results?.phones.length > 0}
          <h3>Phone Results</h3>
          <div class="dfc-r">
            {#each res?.results?.phones as item}
              <a
                class="dfc-c cat-view-a render-list-item terno"
                href="/smart-phones/{item.category}/{item.slug}"
                title="abc"
              >
                {#if item.isNew}
                  <span class="badge new setNewBadge">NEW</span>
                {/if}
                <img src={item.image} alt={item.name} />
                <span class="title">{item.name}</span>
              </a>
            {/each}
          </div>
        {/if}
        {#if res?.results?.firms.length > 0}
          <div class="firms-files">
            <div class="dfc-r ai-s">
              <h3>Firmwares Results</h3>
              <div class="dfc-r">
                {#each res?.results?.firms as item}
                  <a
                    class="firms-item dfc-c ai-s no-op"
                    href="/firmwares/{item.category}/{item.slug}"
                    title="Download {item.title}"
                  >
                    <section>
                      <div class="labels">
                        {#if item.price > 0}
                          <span class="label-price"
                            >{item.price.toFixed(2)}USD</span
                          >
                        {/if}
                        {#if item.is_featured}
                          <span>featured</span>
                        {/if}
                      </div>
                      <div class="dfc-r ai-s no-wrap">
                        <img
                          src="/images/assets/file-icon.png"
                          alt="file icon"
                        />
                        <div class="dfc-r js-s d-a3929">
                          <span class="sec-title">{item.title}</span>
                          {#if item.is_new == 0}
                            <span class="badge new">NEW</span>
                          {/if}
                          <div class="dfc-r ai-s">
                            <div class="rating-sec">
                              <StarRating
                                rating={item.rating_points}
                                config={{ ...__rating__, size: 12 }}
                              />
                            </div>
                            <span class="fz10 mr3"
                              >{item.rating_points} rating
                            </span>
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
                            <span class="low9999"
                              >click to download &raquo;</span
                            >
                          </div>
                        </div>
                      </div>
                    </section>
                  </a>
                {/each}
              </div>
            </div>
          </div>
        {/if}
        {#if res?.results?.laptops.length > 0}
          <h3>Computers Results</h3>
          <div class="dfc-r">
            {#each res?.results?.laptops as item}
              <a
                class="dfc-c cat-view-a render-list-item terno"
                href="/smart-phones/{item.category}/{item.slug}"
                title="abc"
              >
                {#if item.isNew}
                  <span class="badge new setNewBadge">NEW</span>
                {/if}
                <img src={item.image} alt={item.name} />
                <span class="title">{item.name}</span>
                <span class="fz10 fwb">{item.cpu} | {item.ram}</span>
              </a>
            {/each}
          </div>
        {/if}
        {#if res?.results?.watches.length > 0}
          <h3>Smart Watches Results</h3>
          <div class="dfc-r">
            {#each res?.results?.watches as item}
              <a
                class="dfc-c cat-view-a render-list-item terno"
                href="/smart-phones/{item.category}/{item.slug}"
                title="abc"
              >
                {#if item.isNew}
                  <span class="badge new setNewBadge">NEW</span>
                {/if}
                <img src={item.image} alt={item.name} />
                <span class="title">{item.name}</span>
                <!-- {#if for_ === "computers"}
            <span class="fz10 fwb">{item.cpu} | {item.ram}</span>
          {/if} -->
              </a>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
