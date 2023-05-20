<script lang="ts">
  import type { PageData } from "./$types";
  import { DisplaySizes, typingAnimations } from "$lib/common";
  import RenderSpecs from "$compo/phone-specs-render.svelte";
  import BgColors from "$compo/bg-colors.svelte";
  import Search from "$compo/Search.svelte";
  import Reviews from "$compo/product-reviews.svelte";
  import RenderItems from "$compo/render-list.svelte";
  import ShareableLinks from "$compo/shareable-links.svelte";
  import BreadCrumb from "$compo/bread-crumb.svelte";
  import StarRating from "$compo/StarRating.svelte";
  import { onMount } from "svelte";
  export let data: PageData;
  $: ({ category, slug, phone, categoryItems } = data);
  onMount(async () => {
    let element: any = document.getElementById("type-here");
    typingAnimations(element)
  });
  export const middleViews = (c: string) => {
    try {
      if (c === "camera") {
        let y = phone?.short_detail["main-camera"];
        if (!y || y === "") {
          y = phone?.mobile_specs?.filter(
            (e: any) => e.name?.toLowerCase() === "network"
          );
          return y.length > 0 ? y[0].Technology + " Technology | " : "";
        }
        let u = y.split("mp")[0] + "MP main camera | ";
        return u;
      } else if (c === "display") {
        let y = phone?.mobile_specs?.filter(
          (e: any) => e.name.toLowerCase() === "display"
        );
        if (y.length > 0) return DisplaySizes(y[0].Resolution);
        else {
          return phone?.brief_scrap["displayPixles"] + " display";
        }
      } else if (c === "processor") {
        let y = phone?.brief_scrap["Chipset"];
        y += y === "" ? "" : " fast processor";
        if (!y || y === "") {
          let k = phone?.brief_scrap["battery"] + " ";
          k += phone?.brief_scrap["batteryType"]
            ? phone?.brief_scrap["batteryType"] + " powerfull battery"
            : " powerfull battery";
          return k;
        } else {
          return y;
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
</script>
<BgColors class_="mt180-c3" />
<div class="product-view fade-in">
  <div class="product-top">
    <div class="suc82">
      <img src={phone.image} alt={"background image"} />
    </div>
    <Search />
    <BreadCrumb
      urls={[
        { name: "phones", url: "/smart-phones/" },
        { name: category, url: `/smart-phones/${category}`, disabled: false },
        {
          name: phone.name,
          url: `/smart-phones/${category}/${slug}`,
          disabled: true,
        },
      ]}
    />
    <div class="ur9xl a-ck2 dfc-r">
      <div class="dfc-r left">
        <ShareableLinks
        fox={{
          slug,
          hits: phone.hits,
          fans: phone.fans,
          popularity: phone.popularity,
        }}
      />
        <div class="left-image">
          <img
            src={phone?.image}
            title={phone?.name}
            alt={phone?.name}
            class="layer"
          />
        </div>
       
      </div>
      <div class="mid">
        <h2>
          {phone?.name}
        </h2>
        <h3 id="type-here">
          {phone?.subtitle}
        </h3>
        <h5>
          {middleViews("camera") ?? ""}
          {middleViews("display") ?? ""}
        </h5>
        <h5>
          {middleViews("processor") ?? ""}
        </h5>
        <div class="dfc-r jc-fs d-rating">
          <StarRating rating={phone.popularity} />
          <span class="fwb">{phone.popularity} average rating</span>
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
                {phone?.short_detail?.release ?? new Date().toDateString()}
              </span>
            </div>
          </section>
          <section>
            <img
              src="/images/phone.png"
              alt="phone body"
              title="phone body information"
            />
            <div>
              <p>Phone Body</p>
              <span>
                {phone?.brief_scrap["thickness"] ?? "195g, 8.8mm thickness"}
              </span>
            </div>
          </section>
          <section>
            <img src="/images/terminal.png" alt="" />
            <div>
              <p>System Information</p>
              <span>
                {phone?.short_detail?.plateform?.os ??
                  phone?.brief_scrap["os"] ??
                  "Modernized os, "}
                {" flexible pure UI"}
              </span>
            </div>
          </section>
          <section>
            <img
              src="/images/chip.png"
              alt="mobile chip"
              title="mobile chip info"
            />
            <div>
              <p>Phone Memory</p>
              <span>
                {phone?.brief_scrap["Memory"] ??
                  phone?.mobile_specs.filter(
                    (e) => e.name.toLowerCase() === "memory"
                  )[0]?.Internal ??
                  " Enough Storage/Memory"}
              </span>
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
        <div class="dfc-r uaweluef ">
          {#each phone.mobile_specs as item}
            <RenderSpecs {item} />
          {/each}
        </div>

        <section class="a9kcazka ternart ternart-c spec-desc">
          <h2>About {phone?.name}</h2>
          <p>
            <span
              style="display:block;text-transform:uppercase;font-weight:bold;letter-spacing:1px;font-size:18px;"
              >{phone?.subtitle}</span
            >
            {phone.description}
          </p>
        </section>
      </div>
      <div class="mobile-pricing a8j3c">
        <Reviews post_slug={phone.slug} name={phone?.name} />
      </div>
      <div class="dfc-r mt25 product-view-title">
        <span class="line-h" />
        <span style="text-transform:capitalize;">More {category} Phones</span>
        <span class="line-h" />
      </div>
      <div class="dfc-r main-items-view">
        <div class="dfc-r main-89kckk">
          <div class="dfc-r main-item-left">
            <RenderItems
              items={categoryItems}
              base_url="/smart-phones/{category}"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<BgColors class_="mt--1000" />
