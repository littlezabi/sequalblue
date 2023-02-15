<script lang="ts">
  import { lazyLoad, viewport } from "$lib/intersection-observer";
  import StarRating from "$compo/StarRating.svelte";
</script>

<div class="overflow-h">
  <div
    use:viewport
    on:enterViewport={(e) => e.target.classList.add("slide-in-obsrvr")}
    on:exitViewport={(e) => e.target.classList.remove("slide-in-obsrvr")}
    class="product-list opacity"
  >
    <h3>Latest Product Arraivals</h3>
    <div class="dfc-r">
      <a class="p-list-a product-sections dfc-c" href="/" title="abc">
        <section class="product-sec82">
          <span class="badge">NEW</span>
          <span class="db ma sec-title">Cozy Valentines Ideas 98 centure</span>
          <div class="dfc-r sec-stars">
            <StarRating rating={3.35} />
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
            <StarRating rating={3.35}  />
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
            <StarRating rating={3.35}  />
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
    on:enterViewport={(e) => e.target.classList.add("from-right")}
    on:exitViewport={(e) => e.target.classList.remove("from-right")}
    class="dfc-c laptops-items opacity"
  >
    <div class="dfc-c home-sec">
      <h2>Buy Your Dream Computer</h2>
      <span>
        Welcome to our website, where you can learn about computers before
        making a purchase. Whether you're looking for a computer or laptop for
        video editing, gaming, office work or home use, we've got you covered.
        Our team provides all the information and specifications you need to
        make an informed decision. From high-performance gaming laptops to
        versatile machines for video editing, we'll help you find the perfect
        computer for your needs. Don't make a purchase before checking our
        website, get access to all the information you need to make an informed
        decision.
      </span>
      <a href="/computers" class="dfc-r btn btn-primary open-icon">
        Computers & Laptops
      </a>
    </div>
    <img src="/images/laptop.jpg" alt="bg" />
  </div>
  <div
    use:viewport
    on:enterViewport={(e) => e.target.classList.add("slide-in-obsrvr")}
    on:exitViewport={(e) => e.target.classList.remove("slide-in-obsrvr")}
    class="product-list blog articles-section lazyloading-img opacity"
  >
    <h3>Read Latest Articles</h3>
    <div class="dfc-r">
      <a class="p-list-a product-sections dfc-c" href="/" title="abc">
        <section class="product-sec82">
          <span class="badge">NEW</span>
          <span class="db ma sec-title fz9">LittleZabi - 04 / 01 / 2023</span>
          <span class="db ma sec-title">Cozy Valentines Ideas 98 centure</span>
          <img
            src="/images/assets/loading.png"
            use:lazyLoad={"/images/sign-back.jpg"}
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
            src="/images/assets/loading.png"
            use:lazyLoad={"/images/sign-back.jpg"}
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
