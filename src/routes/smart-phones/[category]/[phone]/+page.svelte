<script lang="ts">
  import type { PageData } from "./$types";
  import { typingAnimations } from "$lib/common";
  import RenderSpecs from "$compo/phone-specs-render.svelte";
  import BgColors from "$compo/bg-colors.svelte";
  import Search from "$compo/Search.svelte";
  import Reviews from "$compo/product-reviews.svelte";
  import RenderItems from "$compo/render-list.svelte";
  import ShareableLinks from "$compo/shareable-links.svelte";
  import BreadCrumb from "$compo/bread-crumb.svelte";
  import StarRating from "$compo/StarRating.svelte";
  import { onMount } from "svelte";
  import PageMeta from "$compo/page-meta.svelte";
  import { WEBSITE_NAME, WEBSITE_URL } from "$lib/constants";
  export let data: PageData;
  $: ({ category, slug, phone:data_list, categoryItems } = data);
  onMount(async () => {
    typingAnimations(document.getElementById("type-here"));
    console.log('phone: ', data_list)
  });
</script>
<svelte:head>
  <PageMeta
    title={`${data_list.title} | ${WEBSITE_NAME.toUpperCase()}`}
    description={data_list.description}
    keywords={data_list.keywords}
    createdAt={data_list.createdAt}
    updatedAt={data_list.updatedAt}
    ogType={"product"}
    articleTags={["phones", "electronic devices", "laptops"]}
    image={WEBSITE_URL + data_list.image}
    page_url={`${WEBSITE_URL}${category}/${data_list.slug}`}
  />
</svelte:head>
<BgColors class_="mt180-c3" />
<div class="product-view fade-in">
  <div class="product-top">
    <div class="suc82">
      <img src={data_list.image} alt={"background image"} />
    </div>
    <Search />
    <BreadCrumb
      urls={[
        { name: "phones", url: "/smart-phones/" },
        { name: category, url: `/smart-phones/${category}`, disabled: false },
        {
          name: data_list.title,
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
            hits: data_list.views,
            fans: data_list.loves,
            popularity: data_list.rating,
          }}
        />
        <div class="left-image">
          <img
            src={data_list?.image}
            title={data_list?.title}
            alt={data_list?.title}
            class="layer"
          />
        </div>
      </div>
      <div class="mid">
        <h2>
          {data_list?.title}
        </h2>
        <h3 id="type-here"/>
        {#if data_list.headers[0]}
          <h5>
              {data_list.headers[0]}{data_list.headers[1] ? ' | ' + data_list.headers[1] : ''}
          </h5>
        {/if}
        {#if data_list.headers[2]}
          <h5>
              {data_list.headers[2] ? data_list.headers[2] : ''}{data_list.headers[3] ? ' | ' + data_list.headers[3] : ''}
          </h5>
        {/if}
        {#if data_list.headers[4]}
          <h5>
            {data_list.headers[4] ? data_list.headers[4] : ''}{data_list.headers[5] ? ' | ' + data_list.headers[5] : ''}
          </h5>
        {/if}
        <div class="dfc-r jc-fs d-rating">
          <StarRating rating={data_list.rating} />
          <span class="fwb">{data_list.rating} average rating</span>
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
              {#if data_list.launch.length}
                {#each data_list.launch as element}
                  <span>
                      {Object.keys(element)} {element[Object.keys(element)]}
                  </span>
                {/each}
              {:else}
                  {new Date(1683889798784).toDateString()}
              {/if}
            </div>
          </section>
          <section>
            <img
              src="/images/phone.png"
              alt="phone body"
              title="phone body information"
            />
            <div>
              <p>Mobile Phone</p>
              {#if data_list.body.length}
                {#each data_list.body[0][Object.keys(data_list.body[0])[0]].split('\n') as e} <!--getting first element and spliting with \n to get 2nd line-->
                  <span>{e}</span><br>
                {/each}
              {:else}
                  <span>209.8 g (7.41 oz)</span>
              {/if}
            </div>
          </section>
          <section>
            <img src="/images/terminal.png" alt="" />
            <div>
              <p>System Information</p>
              {#if data_list.platform[0]}<span>{data_list.platform[0][Object.keys(data_list.platform[0])]},</span>{/if}
              {#if data_list.platform[1]}
                <br>
                <span>
                  {data_list.platform[1][Object.keys(data_list.platform[1])]}
                </span>
              {/if}
              {#if data_list.platform.length < 1}<span>Modernized os,</span>{/if}
              {#if data_list.platform.length < 2}<br><span>flexible pure UI</span>{/if}
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
              {#if data_list.memory.length}
                {#each data_list.memory as element}
                    <span>{element[Object.keys(element)[0]].substring(0, 27)}...</span><br/>
                {/each}
              {:else}<span>Enough Storage/Memory</span>{/if}
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
          <RenderSpecs items={data_list} />
        </div>
        <section class="a9kcazka ternart ternart-c spec-desc">
          <h2>About {data_list?.title}</h2>
          <p>{data_list.description}</p>
        </section>
      </div>
      <div class="mobile-pricing a8j3c">
        <Reviews post_slug={data_list.slug} name={data_list?.title} />
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
