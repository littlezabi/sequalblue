<script lang="ts">
  import { __rating__ } from "$lib/constants";
  import eyeHeart from "$img/heart.svg";
  import categoryIcon from "$img/category.png";
  import fileIcon from "$img/file-icon.png";
  import fireIcon from "$img/fire.svg";
  import BgColors from "$compo/bg-colors.svelte";
  import InPageModals from "$compo/in-page-modals.svelte";
  import Search from "$compo/Search.svelte";
  import PageBottomCards from "$compo/page-bottom-cards.svelte";
  import { numberFormat } from "$lib/common";
  import StarRating from "$compo/StarRating.svelte";
  export let data: any = "";
  $: ({ result, type } = data);
</script>

<BgColors />
<Search />
<div class="fade-in page-size">
  <div class="mt55">
    <InPageModals />
  </div>
  <div class="dfc-r ai-s world-div">
    <div class="dfc-c ai-s super-key">
      <h2 class="s3c929">
        Top {type == "trends" ? type : "Most " + type + " in "}
        {new Date().getFullYear()}
      </h2>
      <div class="dfc-r ai-s">
      {#each result as item}
        <section class="dfc-r">
          <a
            href={item.as === "phones"
              ? `/smart-phones/${item.category}/${item.slug}`
              : item.as === "firms"
              ? `/firmwares/${item.category}/${item.slug}`
              : item.as === "watches"
              ? `/watches/${item.category}/${item.slug}`
              : `/computers/${item.category}/${item.slug}`}
            title={item.as === "firms" ? item.title : item.name}
          >
            <img
              src={item.as === "firms" ? fileIcon : item.image}
              alt={item.as === "firms" ? item.title : item.name}
            />
          </a>
          <div class="ec92">
            <a
              href={item.as === "phones"
                ? `/smart-phones/${item.category}/${item.slug}`
                : item.as === "firms"
                ? `/firmwares/${item.category}/${item.slug}`
                : item.as === "watches"
                ? `/watches/${item.category}/${item.slug}`
                : `/computers/${item.category}/${item.slug}`}
                title={item.as === "firms" ? item.title : item.name}
            >
              <h3>{item.as === "firms" ? item.title.length > 44 ? item.title.substring(0, 44) + '...' : item.title : item.name}</h3>
            </a>
            <div>
              <StarRating
                rating={item.popularity > 5 ? 5 : item.popularity}
              />
              <span class="fz12"
                >{item.popularity > 5
                  ? (5).toFixed(1)
                  : item.popularity.toFixed(1)} rating</span
              >
            </div>
            <div>
              <div class="dfc-c">
                <img src={fireIcon} alt="fire icon" />
                <span>{numberFormat(item.hits)}</span>
              </div>
              <div class="dfc-c">
                <img src={eyeHeart} alt="heart icon" />
                <span>{numberFormat(item.fans)}</span>
              </div>
              <a href="/smart-phones/{item.category}" class="dfc-c ucw-3">
                <img src={categoryIcon} alt="heart icon" />
                <span>{item.category.length > 11 ? item.category.substring(0, 11) + '...': item.category}</span>
              </a>
            </div>
          </div>
        </section>
      {/each}
    </div>
    </div>
  </div>
</div>
<BgColors class_={"mt--1000"} />
<PageBottomCards />
