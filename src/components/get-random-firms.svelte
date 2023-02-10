<script lang="ts">
  import folderIcon from "$lib/assets/folder.png";
  import { onMount } from "svelte";
  import axios from "axios";
  import StarRating from "svelte-star-rating";
  import { __rating__ } from "$lib/constants";
  import { ROTATERY_DATA, ROTATERY_DATA_ADD } from "$lib/context/store";
  let folders: any = [];
  let firms: any = [];
  export let type = '';
  let loading: boolean = true;
  onMount(async () => {
    loading = true;
    if($ROTATERY_DATA.firmwares){
      loading = false;
      firms = $ROTATERY_DATA.firmwares?.firms
      folders = $ROTATERY_DATA.firmwares?.folders
      return 1
    }
    await axios
      .get("/api/data", { params: { randomFirms: 1 } })
      .then((res) => {
        loading = false;
        folders = res.data.folders;
        firms = res.data.firms;
        ROTATERY_DATA_ADD(res.data, type)
      })
      .catch((e) => {
        loading = false;
        console.error(e);
      });
  });
  
</script>
<div class="title-x">ROTATERY FIRMWARES AND BRANDS</div>
<div class="dfc-r yellow-x">
  <div class="dfc-r ai-s">
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
                <img src="/images/assets/file-icon.png" alt="file icon" />
                <div class="dfc-r js-s d-a3929">
                  <span class="sec-title">{item.title}{#if item.is_new == 0}
                    <span class="badge new">NEW</span>
                  {/if}</span>
                
                  <div class="dfc-r ai-s jc-fs">
                    <div class="rating-sec">
                      <StarRating
                        rating={item.rating_points}
                        config={{...__rating__,  size: 14}}
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
