<script lang="ts">
  import { itemPerPage,  paginateButtonShow } from "$lib/constants";
  import { onMount } from "svelte";
  export let pageNo = 0;
  export let cat = "";
  export let perPage = itemPerPage
  export let renderFor = `/smart-phones/${cat}/`;
  export let queryStrings = "";
  let totalPages: any = [];
  let totalPagesLen: number = 1;
  $: loading = true;
  let rendPagi: boolean = true;
  onMount(() => {
    console.log('item: ', perPage)
    setupPagination();
  });
  const setupPagination = async () => {
    loading = true;
    const res = await fetch(`/api/data-count?${queryStrings}`)
      .then((e) => e.json())
      .catch((e) => e);
    loading = false;
    const { __count__ } = res;
    if (__count__) {
      if (__count__ <= perPage) {
        rendPagi = false;
        return;
      }
      let g = Math.abs(Math.ceil(__count__ / perPage));
      totalPagesLen = g;
      let s = [];
      let midPagination = 1;
      if (pageNo > paginateButtonShow - 2) {
        midPagination =
          Number(pageNo) - Math.abs(Math.ceil(paginateButtonShow / 2));
      }
      for (let i = midPagination; i < paginateButtonShow + midPagination; i++) {
        if (i > g) break;
        s.push(i);
      }
      totalPages = s;
      loading = false;
    }
  };
</script>

<div class="pagination">
  {#if loading}
    <section class="dfc-r">
      <div class="search-loading l80 h30" />
    </section>
  {/if}
  {#if !loading && rendPagi}
    <div class="abc-abc">
      <p>
        Page {pageNo ? pageNo : 0} of {totalPagesLen}
      </p>
    </div>
    <div class="pagination-links">
      {#if totalPages[0] != 1}
        <a href={`${renderFor}?p=1`} title="Go to first page" class="utkalx">
          <svg
            fill="currentColor"
            class="ajtt2"
            viewBox="-9.5 0 32 32"
            transform="rotate(0)"
            xmlns="http://www.w3.org/2000/svg"
            ><g id="SVGRepo_iconCarrier"
              ><path
                d="M7.28 23.28c-0.2 0-0.44-0.080-0.6-0.24l-6.44-6.44c-0.32-0.32-0.32-0.84 0-1.2l6.44-6.44c0.32-0.32 0.84-0.32 1.2 0 0.32 0.32 0.32 0.84 0 1.2l-5.84 5.84 5.84 5.84c0.32 0.32 0.32 0.84 0 1.2-0.16 0.16-0.4 0.24-0.6 0.24zM12.040 23.28c-0.2 0-0.44-0.080-0.6-0.24l-6.44-6.44c-0.32-0.32-0.32-0.84 0-1.2l6.44-6.44c0.32-0.32 0.84-0.32 1.2 0 0.32 0.32 0.32 0.84 0 1.2l-5.88 5.84 5.84 5.84c0.32 0.32 0.32 0.84 0 1.2-0.12 0.16-0.36 0.24-0.56 0.24z"
              />
            </g></svg
          >
        </a>
      {/if}

      <a
        href={`${renderFor}?p=${pageNo === 1 ? 1 : pageNo - 1}`}
        title="back to previous page"
        class="utkalx"
      >
        <svg
          color="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="-3.07 -3.07 36.87 36.87"
          transform="rotate(90)"
          ><g /><g id="SVGRepo_iconCarrier">
            <g>
              <path
                d="M29.994,10.183L15.363,24.812L0.733,10.184c-0.977-0.978-0.977-2.561,0-3.536c0.977-0.977,2.559-0.976,3.536,0 l11.095,11.093L26.461,6.647c0.977-0.976,2.559-0.976,3.535,0C30.971,7.624,30.971,9.206,29.994,10.183z"
              />
            </g>
          </g></svg
        >
      </a>

      {#each totalPages as e}
        <a
          href={`${renderFor}?p=${e}`}
          data-sveltekit-reload={""}
          title={`Go to page ${e}`}
          class={e == pageNo ? "active" : "not-active"}
        >
          {e}
        </a>
      {/each}
      <a
        href={`${renderFor}?p=${pageNo >= totalPagesLen ? pageNo : pageNo + 1}`}
        title={pageNo >= totalPagesLen
          ? ""
          : `Go to next page ${pageNo >= totalPagesLen ? pageNo : pageNo + 1}`}
        class="utkalx"
      >
        <svg
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="-3.07 -3.07 36.87 36.87"
          transform="rotate(-90)"
          ><g /><g id="SVGRepo_iconCarrier">
            <g>
              <path
                d="M29.994,10.183L15.363,24.812L0.733,10.184c-0.977-0.978-0.977-2.561,0-3.536c0.977-0.977,2.559-0.976,3.536,0 l11.095,11.093L26.461,6.647c0.977-0.976,2.559-0.976,3.535,0C30.971,7.624,30.971,9.206,29.994,10.183z"
              />
            </g>
          </g></svg
        >
      </a>

      {#if totalPagesLen != totalPages[totalPages.length - 1]}
        <a
          href={`${renderFor}?p=${totalPagesLen}`}
          title="Go to last page"
          class="utkalx"
        >
          <svg
            fill="currentColor"
            class="ajtt2"
            viewBox="-9.5 0 32 32"
            transform="rotate(-180)"
            xmlns="http://www.w3.org/2000/svg"
            ><g id="SVGRepo_iconCarrier"
              ><path
                d="M7.28 23.28c-0.2 0-0.44-0.080-0.6-0.24l-6.44-6.44c-0.32-0.32-0.32-0.84 0-1.2l6.44-6.44c0.32-0.32 0.84-0.32 1.2 0 0.32 0.32 0.32 0.84 0 1.2l-5.84 5.84 5.84 5.84c0.32 0.32 0.32 0.84 0 1.2-0.16 0.16-0.4 0.24-0.6 0.24zM12.040 23.28c-0.2 0-0.44-0.080-0.6-0.24l-6.44-6.44c-0.32-0.32-0.32-0.84 0-1.2l6.44-6.44c0.32-0.32 0.84-0.32 1.2 0 0.32 0.32 0.32 0.84 0 1.2l-5.88 5.84 5.84 5.84c0.32 0.32 0.32 0.84 0 1.2-0.12 0.16-0.36 0.24-0.56 0.24z"
              />
            </g></svg
          >
        </a>
      {/if}
    </div>
  {/if}
</div>
