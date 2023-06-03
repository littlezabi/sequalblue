<script lang="ts">
  import folderIcon from "$img/folder.png";
  import fileIcon from "$img/file-icon.png";
  import { onMount } from "svelte";
  import axios from "axios";
  import { ROTATERY_DATA, ROTATERY_DATA_ADD } from "$lib/context/store";
  import StarRating from "./StarRating.svelte";
  import { numberFormat, trimTitle } from "$lib/common";
  let folders: any = [];
  let firms: any = [];
  export let type = "";
  let loading: boolean = true;
  onMount(async () => {
    loading = true;
    if ($ROTATERY_DATA.firmwares) { 
      loading = false;
      firms = $ROTATERY_DATA.firmwares?.firms;
      folders = $ROTATERY_DATA.firmwares?.folders;
      return 1;
    }
    await axios
      .get("/api/data/", { params: { randomFirms: 1 } })
      .then((res) => {
        loading = false;
        folders = res.data.folders;
        firms = res.data.firms;
        ROTATERY_DATA_ADD(res.data, type);
      })
      .catch((e) => {
        loading = false;
        console.error(e);
      });
  });
</script>

<div class="title-x">ROTATERY FIRMWARES AND BRANDS</div>
<div class="dfc-r yellow-x">
  <div class="dfc-r ai-str">
    {#each folders as item}
      <a
        class="fade-in cat-view-a render-list-item folders"
        title="click to open {item.title}"
        href="/firmwares/{item.slug}"
      >
        {#if item.is_new}
          <span class="badge new setNewBadge">NEW</span>
        {/if}
        <img src={folderIcon} alt={item.name} />
        <div>
          <span class="title fz14">{item.title}</span>
          <span class="cic0c02 fz12">{numberFormat(item.items)}+ items</span>
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
              <div class="dfc-r ai-s no-wrap ion-32x">
                <img src={fileIcon} alt="file icon" />
                <div class="dfc-r js-s d-a3929">
                  <span class="sec-title">
                  {trimTitle(item.title)}
                    {#if item.is_new == 0}
                      <span class="badge new">NEW</span>
                    {/if}
                  </span>
                  <div class="dfc-r ai-s jc-fs">
                    <div class="rating-sec">
                      <StarRating rating={item.rating} />
                    </div>
                    <span class="fz12 mr3">{item.rating} rating </span>
                    <span class="fz12 mr3">
                      total {numberFormat(item.loves)} people love this.
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
