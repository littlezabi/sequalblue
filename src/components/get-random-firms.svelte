<script lang="ts">
  import { viewport } from "$lib/intersection-observer";
  import folderIcon from "$lib/assets/folder.png";
  import { onMount } from "svelte";
  import axios from "axios";
  import StarRating from "svelte-star-rating";
  let folders: any = [];
  let firms: any = [];
  let loading: boolean = true;
  onMount(async () => {
    loading = true;
    await axios
      .get("/api/data", { params: { randomFirms: 1 } })
      .then((res) => {
        loading = false;
        folders = res.data.folders;
        firms = res.data.firms;
      })
      .catch((e) => {
        loading = false;
        console.log(e);
      });
  });
  const __rating__ = {
    emptyColor: "hsl(240, 80%, 85%)",
    fullColor: "#ff0099",
    showText: false,
    size: 14,
  };
</script>

<div class="dfc-r main-89kckk">
  <div class="dfc-r main-item-left">
    {#each folders as item}
      <a
        class="fade-in dfc-c jc-sb cat-view-a render-list-item"
        title="click to open {item.title}"
        href="/firmwares/{item.slug}"
      >
        {#if item.isNew}
          <span class="badge new setNewBadge">NEW</span>
        {/if}
        <img src={folderIcon} alt={item.name} />
        <div class="pb-8">
          <span class="title">{item.title}</span>
          <span class="fz10 fwb"
            >{item.description ? item.description : ""}</span
          >
        </div>
      </a>
    {/each}
    <div class="dfc-r">
      {#if loading}
      <div style="display:block;width:182px;margin-right:15px;">
        <div class="search-loading h20" />
        <div class="search-loading h20 l60" />
        <div class="search-loading h20 l80" />
      </div>
      <div style="display:block;width:182px;margin-right:15px;">
        <div class="search-loading h20" />
        <div class="search-loading h20 l80" />
        <div class="search-loading h30" />
      </div>
      <div style="display:block;width:182px;margin-right:15px;">
        <div class="search-loading h20" />
        <div class="search-loading h20 l80" />
        <div class="search-loading h20 l40" />
      </div>
    {/if}
    </div>
    <div class="firms-files">
      <div class="dfc-r ai-s">
        {#each firms as item}
          <a
            use:viewport
            on:enterViewport={(e) => e.target.classList.add("slide-in-obsrvr")}
            on:exitViewport={(e) =>
              e.target.classList.remove("slide-in-obsrvr")}
            class="fade-in firms-item dfc-c ai-s"
            href="/firmwares/{item.category}/{item.slug}"
            title="Download {item.title}"
          >
            <section>
              <div class="labels">
                {#if item.price > 0}
                  <span class="label-price">{item.price.toFixed(2)}USD</span>
                {/if}
                {#if item.is_featured}
                  <span>featured</span>
                {/if}
              </div>
              <div class="dfc-r ai-s no-wrap">
                <img src="/images/assets/file-icon.png" alt="file icon" />
                <div class="dfc-r js-s d-a3929">
                  <span class="sec-title">{item.title}</span>
                  {#if item.is_new == 0}
                    <span class="badge new">NEW</span>
                  {/if}
                  <div class="dfc-r ai-s">
                    <div class="rating-sec">
                      <StarRating
                        rating={item.rating_points}
                        config={__rating__}
                      />
                    </div>
                    <span class="fz10 mr3">{item.rating_points} rating </span>
                    <span class="fz10 mr3">
                      total {item.rating_count} reviews
                    </span>
                  </div>
                  <div class="dfc-c ai-s a9w6b8q">
                    <span>
                      Price &rarr; {item.price > 0
                        ? `${item.price.toFixed(2)}$`
                        : "Free"}
                    </span>
                    <span class="low9999">click to download &raquo;</span>
                  </div>
                </div>
              </div>
            </section>
          </a>
        {/each}
      </div>
    </div>
  </div>
</div>
