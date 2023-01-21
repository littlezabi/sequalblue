<script lang="ts">
  import Middle from "../components/Middle.svelte";
  import BgColors from "../components/bg-colors.svelte";
  import Search from "../components/Search.svelte";
  import openInNew from "$lib/assets/open-in-new.svg";
  import folder from "$lib/assets/folder.png";
  import StarRating from "svelte-star-rating";
  import { lazyLoad, viewport } from "$lib/intersection-observer";
  import { onMount } from "svelte";
  import axios from "axios";
  export let data: any = "";
  let categories = { phones: [], computers: [], watches: [] };
  const __rating__ = {
    emptyColor: "hsl(240, 80%, 85%)",
    fullColor: "#ff0099",
    showText: false,
    size: 16,
  };
  $: ({ phones, computers } = data);
  onMount(() => {
    axios
      .get("/api/data?get-home-categories=1")
      .then((e) => {
        categories = e.data;
      })
      .catch((e) => {
        console.error(e);
      });
  });
</script>

<Middle />
<Search />
<BgColors />
<div class="page-size">
  <div
    use:viewport
    on:enterViewport={(e) => e.target.classList.add("slide-in-obsrvr")}
    on:exitViewport={(e) => e.target.classList.remove("slide-in-obsrvr")}
    class="dfc-r home-items"
  >
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
    on:enterViewport={(e) => e.target.classList.add("from-right")}
    on:exitViewport={(e) => e.target.classList.remove("from-right")}
    class="product-list"
  >
    <h3>New Arraivals</h3>
    <div class="dfc-r">
      {#each phones as item}
        <a
          class="p-list-a dfc-c"
          href="/smart-phone/{item.slug}"
          title={item.name}
        >
          {#if item.isNew}
            <span class="badge new setNewBadge">NEW</span>
          {/if}
          <img src={item.image} alt="phone" />
          <span>{item.name}</span>
        </a>
      {/each}
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
    class="product-list"
  >
    <h3>New Arraivals Computers</h3>
    <div class="dfc-r a-9lxxxkie">
      {#each computers as item}
        <a
          class="p-list-a dfc-c"
          href="/smart-phone/{item.slug}"
          title={item.name}
        >
          {#if item.isNew}
            <span class="badge new setNewBadge">NEW</span>
          {/if}
          <img src={item.image} alt="phone" />
          <span>{item.name}</span>
          <span class="fz10 fwb">{item.cpu} | {item.ram}</span>
        </a>
      {/each}
    </div>
  </div>
  <BgColors class_={"mt-10"} />
  <div
    use:viewport
    on:enterViewport={(e) => e.target.classList.add("from-right")}
    on:exitViewport={(e) => e.target.classList.remove("from-right")}
    class="dfc-r home-items product-view298"
  >
    <div class="dfc-r cat-332">
      <h3>Top Product Categories</h3>
      {#if categories.phones}
        {#each categories.phones as item}
          <a class="dfc-c" href="/smart-phones/{item.category}">
            <img src='/images/logos/{item.category}.png' alt="folder icon" />
            <span>{item.items}+ items</span>
            <p>{item.category} Phones</p>
          </a>
        {/each}
      {/if}
      {#if categories.computers}
        {#each categories.computers as item}
          <a class="dfc-c" href="/computers/{item.category}">
            <img src='/images/logos/{item.category}.png' alt="folder icon" />
            <span>{item.items}+ items</span>
            <p>{item.category} computers</p>
          </a>
        {/each}
      {/if}
      {#if categories.watches}
        {#each categories.watches as item}
          <a class="dfc-c" href="/watches/{item.category}">
            <img src='/images/logos/{item.category}.png' alt="folder icon" />
            <span>{item.items}+ items</span>
            <p>{item.category} watches</p>
          </a>
        {/each}
      {/if}
    </div>
    <div class="dfc-r home-a-right">
      <div class="home-sec">
        <h2>Buy things in world of internet</h2>
        <span>
          we providing best specification and related information of a smart
          phone. our team creating list of upcomming phones for gamers and
          vloggers so that anyone run with world. in the world of smart phones
          its so hard to find best phones and devices therefore stick with us
          and support. you can check any device for free of cost.
        </span>
        <a href="/" class="dfc-r btn btn-primary open-icon">
          Smart phone list
          <img src={openInNew} class="new_tab_image" alt="open in new" />
        </a>
      </div>
      <img src="/images/controllers.png" class="a993" alt="bg" />
    </div>
  </div>
  <div
    use:viewport
    on:enterViewport={(e) => e.target.classList.add("slide-in-obsrvr")}
    on:exitViewport={(e) => e.target.classList.remove("slide-in-obsrvr")}
    class="product-list"
  >
    <h3>Latest Product Arraivals</h3>
    <div class="dfc-r">
      <a class="p-list-a product-sections dfc-c" href="/" title="abc">
        <section class="product-sec82">
          <span class="badge">NEW</span>
          <span class="db ma sec-title">Cozy Valentines Ideas 98 centure</span>
          <div class="dfc-r sec-stars">
            <StarRating rating={3.35} config={__rating__} />
            <span>3.35</span>
          </div>
          <img src="/images/products/ps5-cont.png" alt="headphones" />
          <div class="dfc-r a9w6b8q">
            <span>Category &rarr; default</span>
            <span>Price &rarr; &dollar;49.99</span>
          </div>
          <span class="low9999">click to go &raquo;</span>
        </section>
      </a>
      <a class="p-list-a product-sections dfc-c" href="/" title="abc">
        <section class="product-sec82">
          <span class="badge">NEW</span>
          <span class="db ma sec-title">Cozy Valentines Ideas 98 centure</span>
          <div class="dfc-r sec-stars">
            <StarRating rating={3.35} config={__rating__} />
            <span>3.35</span>
          </div>
          <img src="/images/products/ps5-cont.png" alt="headphones" />
          <div class="dfc-r a9w6b8q">
            <span>Category &rarr; default</span>
            <span>Price &rarr; &dollar;49.99</span>
          </div>
          <span class="low9999">click to go &raquo;</span>
        </section>
      </a>
      <a class="p-list-a product-sections dfc-c" href="/" title="abc">
        <section class="product-sec82">
          <span class="badge">NEW</span>
          <span class="db ma sec-title">Cozy Valentines Ideas 98 centure</span>
          <div class="dfc-r sec-stars">
            <StarRating rating={3.35} config={__rating__} />
            <span>3.35</span>
          </div>
          <img src="/images/products/ps5-cont.png" alt="headphones" />
          <div class="dfc-r a9w6b8q">
            <span>Category &rarr; default</span>
            <span>Price &rarr; &dollar;49.99</span>
          </div>
          <span class="low9999">click to go &raquo;</span>
        </section>
      </a>
    </div>
  </div>
  <div
    use:viewport
    on:enterViewport={(e) => e.target.classList.add("fade-in")}
    on:exitViewport={(e) => e.target.classList.remove("fade-in")}
    class="df product-list "
  >
    <div class="user-det-left">
      <div class="img-container">
        <img src="/images/my-image.png" alt="my" />
      </div>
    </div>
    <div class="user-det-right">
      <h2>LittleZabi</h2>
      <h4>Computer Programmer | Full-stack web-developer</h4>
      <span class="qout">&ldquo;</span>
      <span>
        whats your need? it's suit on you? you are buying correct thing? is this
        your future? answers of these question is must if you want to buy a
        thing and want to be a perfect person.
      </span>
    </div>
  </div>
  <BgColors class_={"mt-10"} />
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

<style>
  .a993 {
    margin-right: -16px;
  }
</style>
