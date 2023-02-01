<script lang="ts">
  import type { PageData } from "./$types";
  import { DisplaySizes } from "$lib/common";
  import RenderSpecs from "$compo/phone-specs-render.svelte";
  import BgColors from "$compo/bg-colors.svelte";
  import Search from "$compo/Search.svelte";
  import Reviews from "$compo/product-reviews.svelte";
  import RenderItems from "$compo/render-list.svelte";
  import featherIcon from '$lib/assets/feather-2.svg'
  import ShareableLinks from "$compo/shareable-links.svelte";
  export let data: PageData;
  $: ({ category, slug, watch, categoryItems } = data);
  export const middleViews = (c: string) => {
    if (c === "camera") {
      let y = watch?.short_detail["main-camera"];
      if (!y || y === "") {
        console.log(y);
        y = watch?.mobile_specs?.filter(
          (e: any) => e.name?.toLowerCase() === "network"
        );
        return y.length > 0 ? y[0].Technology + " Technology | " : "";
      }
      let u = y.split("mp")[0] + "MP main camera | ";
      return u;
    } else if (c === "display") {
      let y = watch?.mobile_specs?.filter(
        (e: any) => e.name.toLowerCase() === "display"
      );
      if (y.length > 0) return DisplaySizes(y[0].Resolution);
      else {
        return watch?.brief_scrap["displayPixles"] + " display";
      }
    } else if (c === "processor") {
      let y = watch?.brief_scrap["Chipset"];
      y += y === "" ? "" : " fast processor";
      if (!y || y === "") {
        let k = watch?.brief_scrap["battery"] + " ";
        k += watch?.brief_scrap["batteryType"]
          ? watch?.brief_scrap["batteryType"] + " powerfull battery"
          : " powerfull battery";
        return k;
      } else {
        return y;
      }
    }
  };
</script>

<BgColors />
<Search />
<div class="page-size product-view fade-in">
  <div class="dfc-r product-top ur9xl">
    <div class="left">
      <div class="left-image">
        <img
          src={watch?.image}
          alt={watch?.name}
          class="layer"
        />
      </div>
      <ShareableLinks fox={{slug,views:watch.views}} />
    </div>
    <div class="mid">
      <h2>
        {watch?.name}
      </h2>
      <h3>
        {watch?.short_detail?.subtitle}
      </h3>
      <h5>
        {middleViews("camera")}
        {middleViews("display")}
      </h5>
      <h5>
        {middleViews("processor")}
      </h5>
    </div>
    <div class="dfc-c right">
      <div class="dfc-r">
        <section>
          <img
            src="/images/calendar.png"
            alt="release date"
          />
          <div>
            <p>Release date</p>
            <span>
              {watch?.short_detail["release"] ?? new Date().toDateString()}
            </span>
          </div>
        </section>
        <section>
          <img
            src="{featherIcon}"
            alt="Smart watch body"
          />
          <div>
            <p>Smart Watch Body</p>
            <span>
              {watch?.brief_scrap["thickness"] ?? "195g, 8.8mm thickness"}
            </span>
          </div>
        </section>
        <section>
          <img src="/images/terminal.png" alt="" />
          <div>
            <p>System Information</p>
            <span>
              {watch?.short_detail["plateform"]?.os ??
                watch?.brief_scrap["os"] ??
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
            <p>watch Memory</p>
            <span>
              {watch?.brief_scrap["Memory"] ??
                watch?.mobile_specs.filter(
                  (e) => e.name.toLowerCase() === "memory"
                )[0]?.Internal ??
                " Enough Storage/Memory"}
            </span>
          </div>
        </section>
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
          {#each watch.mobile_specs as item}
            <RenderSpecs {item} />
          {/each}
        </div>

        <BgColors class_="mt--1000" />
        <section class="a9kcazka spec-desc ternart ternart-c">
          <h2>About {watch?.name}</h2>
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
        <Reviews post_slug={watch.slug} name={watch?.name} />
      </div>
      <BgColors class_="mt--500" />
      <div class="dfc-r mt25 product-view-title">
        <span class="line-h" />
        <span style="text-transform:capitalize;">More {category} watchs</span>
        <span class="line-h" />
      </div>
      <div class="dfc-r main-items-view">
        <div class="dfc-r main-89kckk">
          <div class="dfc-r main-item-left">
            <RenderItems
              items={categoryItems}
              base_url="/watches/{category}"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
