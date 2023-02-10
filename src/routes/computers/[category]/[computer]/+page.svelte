<script lang="ts">
  import type { PageData } from "./$types";
  import RenderSpecs from "$compo/computer-specs-render.svelte";
  import BgColors from "$compo/bg-colors.svelte";
  import Search from "$compo/Search.svelte";
  import Reviews from "$compo/product-reviews.svelte";
  import RenderItems from "$compo/render-list.svelte";
  import memoryIcon from '$lib/assets/memory.svg'
  import ShareableLinks from "$compo/shareable-links.svelte";
  import BreadCrumb from "$compo/bread-crumb.svelte";
  export let data: PageData;
  $: ({ category, slug, computer, categoryItems } = data);
</script>

<BgColors />
<Search />
<BreadCrumb
      urls={[
        { name: "computers", url: "/computers/" },
        { name: category, url: `/computers/${category}` },
        { name: computer.name, url: `/computers/${category}/${slug}`, disabled: true },
      ]}
    />
<div class="page-size product-view fade-in computers">
  <div style="background-image: url({computer.image})" class="suc82">
  <div class="dfc-r product-top">
    <div class="left">
      <div class="left-image">
        <img
          src={computer?.image}
          title={computer?.name}
          alt={computer?.name}
          class="layer"
        />
      </div>
      <ShareableLinks fox={{slug,views:computer.views}} />
    </div>
    <div class="mid">
      <h2>
        {computer?.name}
      </h2>
      <h3>
        {computer.subtitle ? computer.subtitle : ''}
      </h3>
      <h5>
        {computer.cpu} CPU
      </h5>
      <h5>
        {computer["ram"]} RAM
      </h5>
      <h5>
        {computer["display"]} Wide Display
      </h5>
    </div>
    <div class="dfc-c right">
      <div class="dfc-r">
        <section>
          <img
            src="/images/calendar.png"
            alt="release date"
            title="Phone Release date"
          />
          <div>
            <p>Release date</p>
            <span>
              {computer["release"] ?? new Date().toDateString()}
            </span>
          </div>
        </section>
        <section>
          <img
            src="{memoryIcon}"
            alt="computer body"
            title="computer body information"
          />
          <div>
            <p>Laptop Memory</p>
            <span>
              {computer["ram"] ?? "Enough Storage/Memory"}
            </span>
          </div>
        </section>
        <section>
          <img src="/images/assets/chip.png" alt="chip icon" />
          <div>
            <p>CPU Information</p>
            <span>
                {computer["cpu"] ?? "Intel Celeron"}
            </span>
          </div>
        </section>
        <section>
          <img
          src='/images/assets/wifi.png'
            alt="wifi"
            title="wifi info"
          />
          <div>
            <p>Wifi</p>
            <span>{computer["wifi"]}</span>
          </div>
        </section>
      </div>
    </div>
  </div>
  </div>
  <div class="mobile-middle">
    <div class="page-size">
      <div class="specifications">
        <div class="dfc-r product-view-title">
          <span class="line-h" />
          <span>SPECIFICATIONS</span>
          <span class="line-h" />
        </div>
        <div class="dfc-r uaweluef">
            <RenderSpecs items={computer} />
        </div>

        <BgColors class_="mt--1000" />
        <section class="a9kcazka spec-desc">
          <h2>About {computer?.name}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa
            voluptates beatae alias. Facere excepturi odit magnam consectetur
            aliquid accusantium est beatae quidem! Vel praesentium aperiam
            tempora iste incidunt, recusandae rem! Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Ipsa voluptates beatae alias. Facere
            excepturi odit magnam consectetur aliquid accusantium est beatae
            quidem! Vel praesentium aperiam tempora iste incidunt, recusandae
            rem!
          </p>
        </section>
      </div>
      <BgColors class_="mt--500" />
      <div class="mobile-pricing a8j3c">
        <Reviews post_slug={computer.slug} name={computer?.name} />
      </div>
      <BgColors class_="mt--500" />
      <div class="dfc-r mt25 product-view-title">
        <span class="line-h" />
        <span style="text-transform:capitalize;">More {category} Computers</span>
        <span class="line-h" />
      </div>
      <div class="dfc-r main-items-view">
        <div class="dfc-r main-89kckk">
          <div class="dfc-r main-item-left">
            <RenderItems
              items={categoryItems}
              base_url="/computers/{category}"
              for_='computers'
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
