<script lang="ts">
  import { life } from "$lib/common";
  import { lazyLoad } from "$lib/intersection-observer";
  import axios from "axios";
  let blogs: any = [];
  let loading = false;
  const getBlogs = async () => {
    loading = true;
    await axios
      .get("/api/data/", { params: { latestBlogs: 1 } })
      .then((e) => {
        loading = false;
        console.log(e.data);
        blogs = e.data.blogs;
      })
      .catch((e) => {
        loading = false;
        console.error(e);
      });
  };
  getBlogs();
</script>

<div class="dfc-r ai-str">
    {#if !loading}
        <div>
            <span class="loading"></span>
        </div>
    {/if}
  {#each blogs as blog}
    <a
      class="p-list-a product-sections dfc-c"
      href="/blogs/{blog.slug}"
      title={blog.title}
    >
      <section class="product-sec82">
        {#if blog.isNew}
          <span class="badge">NEW</span>
        {/if}
        <span class="db ma sec-title fz9"
          >{blog.author} &#x2022; {life(blog.createdAt).from()}</span
        >
        <span class="db ma sec-title">{blog.title}</span>
        <img
          src="/images/assets/loading.png"
          use:lazyLoad={blog.image}
          alt="blog view"
        />
        <div class="dfc-r a9w6b8q">
          {blog.subtitle}
        </div>
        <span class="low9999">click to read more &raquo;</span>
      </section>
    </a>
  {/each}
</div>
