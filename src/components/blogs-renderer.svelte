<script lang="ts">
  import { life } from "$lib/common";
  import { lazyLoad, viewport } from "$lib/intersection-observer";
  export let items: any = [];
</script>

  {#each items as item}
    <a
      use:viewport
      on:enterViewport={(e) => e.target.classList.add("slide-in-obsrvr")}
      on:exitViewport={(e) => e.target.classList.remove("slide-in-obsrvr")}
      class="p-list-a product-sections dfc-c opacity"
      href="/blogs/{item.slug}"
      title={item.title}
    >
      <section class="dfc-r product-sec82">
        <div>
        {#if item.isNew}
          <span class="badge">NEW</span>
        {/if}
        <span class="db ma sec-title fz9"
          >{item.author} &#x2022; {life(item.createdAt).format(
            "mm / DD / YYYY"
          )}</span
        >
        <span class="db ic2c32 ma dfc-r  sec-title">{item.title}</span>
        <img
          src="/images/assets/loading.png"
          use:lazyLoad={item.image}
          alt={item.title}
        />
        <div class="dfc-r a9w6b8q">
          {item.subtitle}
        </div>
      </div>
        <span class="low9999">click to read more &raquo;</span>
      </section>
    </a>
  {/each}
