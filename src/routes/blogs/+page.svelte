<script lang="ts">
  import BgColors from "$compo/bg-colors.svelte";
  import InPageModals from "$compo/in-page-modals.svelte";
  import Search from "$compo/Search.svelte";
  import { lazyLoad, viewport } from "$lib/intersection-observer";
  import type { PageData } from "./$types";
  import { life } from "$lib/common";
  import { onMount } from "svelte";
  import Paginations from "$compo/paginations.svelte";
  import { blogsPagePostLimit } from "$lib/constants";
  import BlogsRenderer from "$compo/blogs-renderer.svelte";
  import BreadCrumb from "$compo/bread-crumb.svelte";
  export let data: PageData;
  $: ({ blogs, pageNo } = data);
  onMount(() => {
    console.log(blogs);
  });
</script>

<Search />
<BgColors />
<BreadCrumb
urls={[
  { name: "blogs", url: "/blogs/" },
]}
/>
<div class="product-list blog articles-section lazyloading-img">
  <div>
    <div class="dfc-r ai-s">
      <BlogsRenderer items={blogs} />
    </div>
    <Paginations
      perPage={blogsPagePostLimit}
      renderFor={`/blogs/`}
      queryStrings={`blogs=1`}
      {pageNo}
    />
  </div>
</div>
<br>
<div class="page-size">
  <InPageModals />
</div>
