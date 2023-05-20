<script lang="ts">
  import type { PageData } from "./$types";
  import RenderSpecs from "$compo/computer-specs-render.svelte";
  import BgColors from "$compo/bg-colors.svelte";
  import { typingAnimations } from "$lib/common";
  import Search from "$compo/Search.svelte";
  import Reviews from "$compo/product-reviews.svelte";
  import RenderItems from "$compo/render-list.svelte";
  import memoryIcon from "$img/memory.svg";
  import chipIcon from "$img/chip.png";
  import wifiIcon from "$img/wifi.png";
  import ShareableLinks from "$compo/shareable-links.svelte";
  import BreadCrumb from "$compo/bread-crumb.svelte";
  import StarRating from "$compo/StarRating.svelte";
  import PageMeta from "$compo/page-meta.svelte";
  import { WEBSITE_NAME, WEBSITE_URL } from "$lib/constants";
  import { onMount } from "svelte";
  export let data: PageData;
  $: ({ category, slug, computer, categoryItems } = data);
  let html_desc = "";
  $:computer, getDesc()
  onMount(async () => {
    let element: any = document.getElementById("type-here");
    typingAnimations(element)
  });
  const getDesc = () => {
    let desc = computer.description.split(".");
    let new_ = ''
    if (desc.length > 2) {
      new_ = (desc.slice(2, (desc.length - 1)).join()).trim()
    }
    html_desc = new_.substring(0, 155)+'...'
  };
</script>

<svelte:head>
  <PageMeta
    title={`${computer.name} | ${WEBSITE_NAME.toUpperCase()}`}
    description={computer.description}
    html_desc={html_desc}
    keywords={computer.keywords}
    pub_time={computer.createdAt}
    ogType={'product'}
    articleTags={['computers', 'electronic devices', 'laptops']}
    image={WEBSITE_URL + computer.image}
    page_url={`${WEBSITE_URL}${category}/${computer.slug}`}
  />
</svelte:head>
<BgColors />
<div class="product-view fade-in computers">
  <div class="product-top">
    <div class="suc82">
      <img src={computer.image} alt={"background image"} />
    </div>
    <Search />
    <BreadCrumb
      urls={[
        { name: "computers", url: "/smart-computers/" },
        { name: category, url: `/smart-computers/${category}`, disabled: false },
        {
          name: computer.name,
          url: `/smart-computers/${category}/${slug}`,
          disabled: true,
        },
      ]}
    />
    <div class="ur9xl a-ck2 dfc-r">
      <div class="dfc-r left">
        <ShareableLinks
        fox={{
          slug,
          hits: computer.hits,
          fans: computer.fans,
          popularity: computer.popularity,
        }}
      />
        <div class="left-image">
          <img
            src={computer?.image}
            title={computer?.name}
            alt={computer?.name}
            class="layer"
          />
        </div>
       
      </div>
      <div class="mid">
        <h2>
          {computer?.name}
        </h2>
        <h3 id="type-here">
          {computer.subtitle ? computer.subtitle : ""}
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
        <div class="dfc-r jc-fs d-rating">
          <StarRating rating={computer.popularity} />
          <span class="fwb">{computer.popularity} average rating</span>
        </div>
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
              src={memoryIcon}
              class="invert"
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
            <img src={chipIcon} 
            class="invert" alt="chip icon" />
            <div>
              <p>CPU Information</p>
              <span>
                {computer["cpu"] ?? "Intel Celeron"}
              </span>
            </div>
          </section>
          <section>
            <img src={wifiIcon} alt="wifi" title="wifi info" />
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
            {computer.description}
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
        <span style="text-transform:capitalize;">More {category} Computers</span
        >
        <span class="line-h" />
      </div>
      <div class="dfc-r main-items-view">
        <div class="dfc-r main-89kckk">
          <div class="dfc-r main-item-left">
            <RenderItems
              items={categoryItems}
              base_url="/computers/{category}"
              for_="computers"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
