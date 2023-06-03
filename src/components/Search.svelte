<script lang="ts">
  import { goto } from '$app/navigation';
  import searchImg from "$lib/assets/search.svg";
  import { ADD_SEARCH_RESULT, __SEARCHS__ } from "$lib/context/store";
  import axios from "axios";
  import { onMount } from "svelte";
  let query: string = "";
  let timeOut: any = false;
  let searchCount = 0;
  let loading = false;
  let searchModal = false;
  let results: any = { firms: [], laptops: [], phones: [] };
  onMount(() => {
    if ($__SEARCHS__.length > 0) {
      results = $__SEARCHS__;
      searchCount = 999;
    }
  });
  const handleForm = async () => {
    if (query === "") return 0;
    searchModal = false;
    await goto(`/search/${query}`);
  };
  const handleSearch = () => {
    if (query === "") {
      searchModal = false;
      return;
    }
    loading = true;
    searchModal = true;
    if (timeOut) clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      axios
        .get("/api/search/", { params: { query } })
        .then((res) => {
          console.log(res.data);
          loading = false;
          if (res.data.__len__ > 0) {
            results = res.data.__res__;
            searchCount = res.data.__len__;
            ADD_SEARCH_RESULT(results);
          } else {
            searchCount = 999;
          }
        })
        .catch((e) => {
          console.error(e);
          loading = false;
        });
    }, 800);
  };
  $: query, handleSearch();
</script>

<form on:submit|preventDefault={handleForm}>
  <div class="page-size search-section dfc-r">
    <div class="dfc-r search-bar">
      <input
        bind:value={query}
        type="search"
        placeholder="Find what you need with ease by searching here..."
      />
      <button type="submit" class="dfc-r">
        <img src={searchImg} alt="search" />
      </button>
    </div>
    {#if searchModal}
      <div class="search-result fade-in">
        <div class="dfc-r jc-sb search-title">
          {#if loading}<h4>Searching...</h4>{/if}
          {#if !loading && searchCount > 0 && searchCount < 999}
            <h4>
              {searchCount} Results found press on search icon to search with high
              accuracy.
            </h4>
          {:else if loading === false}
            <h4>
              0 Results found press on search icon to search with high accuracy.
            </h4>
          {/if}
          <button title="close results" on:click={() => (searchModal = false)}>
            &times;
          </button>
        </div>
        {#if loading}
          <div style="margin: 20px">
            <div class="search-loading l60 h30" />
            <div class="search-loading l40 h10" />
            <div class="search-loading l50 h10" />
            <div class="search-loading l20 h10" />
            <div class="search-loading l40 h20" />
          </div>
        {/if}
        {#if !loading}
          {#if searchCount === 999}
            <section>
              <p class="cu9c">Recent Activites</p>
            </section>
          {/if}
          <div class="fade-in dfc-r ai-s res-view">
            {#if results.phones.length > 0}
              <section>
                <p>Smart phones results</p>
                {#each results.phones as item}
                  <a
                    href="/smart-phones/{item.category}/{item.slug}"
                    title={item.title}
                    >{item.title.length > 23
                      ? item.title.substr(0, 23) + "..."
                      : item.title}</a
                  >
                {/each}
              </section>
            {/if}
            {#if results.laptops.length > 0}
              <section>
                <p>Computers & Laptops results</p>
                {#each results.laptops as item}
                  <a
                    href="/computers/{item.category}/{item.slug}"
                    title={item.title}
                    >{item.title.length > 23
                      ? item.title.substr(0, 23) + "..."
                      : item.title}</a
                  >
                {/each}
              </section>
            {/if}
            {#if results.firms.length > 0}
              <section>
                <p>Firmwares results</p>
                {#each results.firms as item}
                  <a
                    href="/firmwares/{item.category}/{item.slug}"
                    title={item.title}
                    >{item.title.length > 23
                      ? item.title.substr(0, 23) + "..."
                      : item.title}</a
                  >
                {/each}
              </section>
            {/if}
            {#if results.blogs.length > 0}
              <section>
                <p>Blogs Results</p>
                {#each results.blogs as item}
                  <a
                    href="/blogs/{item.slug}"
                    title={item.title}
                    >{item.title.length > 23
                      ? item.title.substr(0, 23) + "..."
                      : item.title}</a
                  >
                {/each}
              </section>
            {/if}
          </div>
        {/if}
      </div>
    {/if}
  </div>
</form>
