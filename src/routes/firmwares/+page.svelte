<script lang="ts">
    import SideView from "../../components/side-view.svelte";
    import BgColors from "../../components/bg-colors.svelte";
    import Search from "../../components/Search.svelte";
    import { lazyLoad, viewport } from "$lib/intersection-observer";
    import openInNew from "$lib/assets/open-in-new.svg";
    import type { PageData } from "./$types";
    export let data: PageData;
  import { onMount } from "svelte";
  $: ({ items } = data);
  onMount(() => {
    console.log(items);
  });
</script>

<div class="page-size">
    <BgColors />
    <Search />
    <div class="dfc-r main-items-view">
      <div class="dfc-r main-item-left">
        {#each items as cat}
          <a class="render-list-item" href="/firmwares/{cat.slug}">
            <div class="dfc-c y-899x9l">
              <span class="title fz9">0+ items</span>
              <img src="/images/logos/{cat.slug.split('-')[0]}.png" alt="folder icon" />
              <div>
                <p>{cat.title}</p>
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
    <div use:viewport on:enterViewport={(e)=>e.target.classList.add('slide-in-obsrvr')} on:exitViewport={(e)=>e.target.classList.remove('slide-in-obsrvr')}  class="dfc-r home-items">
      <div class="home-sec">
        <h2>Specs of Smart devices</h2>
        <span>
          we providing best specification and related information of a smart
          phone. our team creating list of upcomming phones for gamers and
          vloggers so that anyone run with world. in the world of smart phones its
          so hard to find best phones and devices therefore stick with us and
          support. you can check any device for free of cost.
        </span>
        <a href="/" class="dfc-r btn btn-primary open-icon">
          Smart phone list
          <img src={openInNew} class="new_tab_image" alt="open in new" />
        </a>
      </div>
      <img src="/images/home-bg.png" class="a993" alt="bg" />
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
