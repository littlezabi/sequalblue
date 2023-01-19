<script lang="ts">
  import SideView from "../../components/side-view.svelte";
  import BgColors from "../../components/bg-colors.svelte";
  import Search from "../../components/Search.svelte";
  import { lazyLoad, viewport } from "$lib/intersection-observer";
  import openInNew from "$lib/assets/open-in-new.svg";
  import type { PageData } from "./$types";
  export let data: PageData;
  $: ({ categories } = data);
</script>

<div class="page-size">
  <BgColors />
  <Search />
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
  <div
    use:viewport
    on:enterViewport={(e) => e.target.classList.add("from-right")}
    on:exitViewport={(e) => e.target.classList.remove("from-right")}
    class="dfc-c laptops-items"
  >
    <div class="dfc-c home-sec">
      <h2>Buy your dream Computer</h2>
      <span>
        get your pc whats your need. video edit, office work, Gaming and
        Programming all stuff about laptops you can find here. check pc's price,
        specification, user experience and other related information. get a best
        pc for your job
      </span>
      <a href="/" class="dfc-r btn btn-primary open-icon">
        Smart phone list
        <img src={openInNew} class="new_tab_image" alt="open in new" />
      </a>
    </div>
    <img src="/images/laptop.jpg" alt="bg" />
  </div>
  <div
    use:viewport
    on:enterViewport={(e) => e.target.classList.add("slide-in-obsrvr")}
    on:exitViewport={(e) => e.target.classList.remove("slide-in-obsrvr")}
    class="product-list blog articles-section lazyloading-img"
  >
    <h3>Read Latest Articles</h3>
    <div class="dfc-r">
      <a class="p-list-a product-sections dfc-c" href="/" title="abc">
        <section class="product-sec82">
          <span class="badge">NEW</span>
          <span class="db ma sec-title fz9">LittleZabi - 04 / 01 / 2023</span>
          <span class="db ma sec-title">Cozy Valentines Ideas 98 centure</span>
          <img
            src="/images/loading.svg"
            use:lazyLoad={"/images/blogs/blogs.jpg"}
            alt="headphones"
          />
          <div class="dfc-r a9w6b8q">
            477 limit is enough good Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Qui commodi similique earum reprehenderit,
            praesentium laudantium pariatur quam quo itaque omnis error in,
            natus eaque excepturi nisi tenetur quas vitae provident. Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Qui commodi similique
            earum reprehenderit, praesentium laudantium pariatur quam quo itaque
            omnis error in, natus eaque excepturi nisi tenetur quas vitae
            provident.
          </div>
          <span class="low9999">click to read more &raquo;</span>
        </section>
      </a>
      <a class="p-list-a product-sections dfc-c" href="/" title="abc">
        <section class="product-sec82">
          <span class="badge">NEW</span>
          <span class="db ma sec-title fz9">LittleZabi - 04 / 01 / 2023</span>
          <span class="db ma sec-title">Cozy Valentines Ideas 98 centure</span>
          <img
            src="/images/loading.svg"
            use:lazyLoad={"/images/blogs/blogs.jpg"}
            alt="headphones"
          />
          <div class="dfc-r a9w6b8q">
            477 limit is enough good Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Qui commodi similique earum reprehenderit,
            praesentium laudantium pariatur quam quo itaque omnis error in,
            natus eaque excepturi nisi tenetur quas vitae provident. Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Qui commodi similique
            earum reprehenderit, praesentium laudantium pariatur quam quo itaque
            omnis error in, natus eaque excepturi nisi tenetur quas vitae
            provident.
          </div>
          <span class="low9999">click to read more &raquo;</span>
        </section>
      </a>
      <a class="p-list-a product-sections dfc-c" href="/" title="abc">
        <section class="product-sec82">
          <span class="badge">NEW</span>
          <span class="db ma sec-title fz9">LittleZabi - 04 / 01 / 2023</span>
          <span class="db ma sec-title">Cozy Valentines Ideas 98 centure</span>
          <img
            src="/images/loading.svg"
            use:lazyLoad={"/images/blogs/blogs.jpg"}
            alt="headphones"
          />
          <div class="dfc-r a9w6b8q">
            477 limit is enough good Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Qui commodi similique earum reprehenderit,
            praesentium laudantium pariatur quam quo itaque omnis error in,
            natus eaque excepturi nisi tenetur quas vitae provident. Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Qui commodi similique
            earum reprehenderit, praesentium laudantium pariatur quam quo itaque
            omnis error in, natus eaque excepturi nisi tenetur quas vitae
            provident.
          </div>
          <span class="low9999">click to read more &raquo;</span>
        </section>
      </a>
      <a class="p-list-a product-sections dfc-c" href="/" title="abc">
        <section class="product-sec82">
          <span class="badge">NEW</span>
          <span class="db ma sec-title fz9">LittleZabi - 04 / 01 / 2023</span>
          <span class="db ma sec-title">Cozy Valentines Ideas 98 centure</span>
          <img
            src="/images/loading.svg"
            use:lazyLoad={"/images/blogs/blogs.jpg"}
            alt="headphones"
          />
          <div class="dfc-r a9w6b8q">
            477 limit is enough good Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Qui commodi similique earum reprehenderit,
            praesentium laudantium pariatur quam quo itaque omnis error in,
            natus eaque excepturi nisi tenetur quas vitae provident. Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Qui commodi similique
            earum reprehenderit, praesentium laudantium pariatur quam quo itaque
            omnis error in, natus eaque excepturi nisi tenetur quas vitae
            provident.
          </div>
          <span class="low9999">click to read more &raquo;</span>
        </section>
      </a>
    </div>
  </div>
</div>
