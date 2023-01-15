<script lang="ts">
  import type { PageData } from "./$types";
  import { DisplaySizes } from "$lib/common";
  import RenderSpecs from "$compo/phone-specs-render.svelte";
  import BgColors from "$compo/bg-colors.svelte";
  import Search from "$compo/Search.svelte";
  import Reviews from '$compo/product-reviews.svelte'
  export let data: PageData;
  $: ({ category, slug, phone, categoryItems } = data);
  export const middleViews = (c: string) => {
    if (c === "camera") {
      let y = phone?.short_detail["main-camera"];
      if (!y || y === "") {
        console.log(y);
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
  };
  console.log(data)
</script>

<BgColors />
<Search />
<div class="page-size product-view fade-in">
  <div class="dfc-r product-top">
    <div class="left">
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
      <h3 >
        {phone?.short_detail.subtitle}
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
            title="Phone Release date"
          />
          <div>
            <p>Release date</p>
            <span>
              {phone?.short_detail["release"] ?? new Date().toDateString()}
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
              {phone?.short_detail["plateform"]?.os ??
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
  <div class="mobile-middle">
    <div class="page-size">
      <div class="specifications">
        <div class="dfc-r product-view-title">
          <span class="line-h" />
          <span>SPECIFICATIONS</span>
          <span class="line-h" />
        </div>
        <div class="dfc-r uaweluef">
          {#each phone.mobile_specs as item}
            <RenderSpecs {item} />
          {/each}
        </div>

        <BgColors class_="mt--1000" />
        <section class="a9kcazka spec-desc">
          <h2>About {phone?.name}</h2>
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
        <div class="mobile-title">
          <span class="line-h" />
          <span class="a92yt29b">CHECK IT NOW</span>
          <span class="line-h" />
        </div>
        
        
            <Reviews
              post_slug={phone.slug}
              name={phone?.name}
            />
          
      </div>
    </div>
  </div>
</div>
