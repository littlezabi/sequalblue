<script lang="ts">
  import { DisplaySizes } from "$lib/common";
  import { viewport } from "$lib/intersection-observer";
  export let items: any;
  const num_abr = [
    "single",
    "dual",
    "triple",
    "quadruple",
    "quintuple",
    "sextuple",
  ];
  const item_keys = Object.keys(items);
  const remove_features = [
    "description",
    "headers",
    "image",
    "updatedAt",
    "isActive",
    "isNew",
    "title",
    "keywords",
    "category",
    "slug",
    "loves",
    "views",
    "rating",
    "original",
    "hits",
    "fans",
    "popularity",
    "integrity",
    'createdAt', 
    'updatedAt'
  ];
</script>
{#each item_keys as item_key}
  {#if !remove_features.includes(item_key)}
    <section>
      <div class="super--99922">
        <h2 class="title">{item_key}</h2>
        {#each items[item_key] as value}
          {#each Object.keys(value) as val_key}
            {#if value[val_key]}
              <div
                use:viewport
                on:enterViewport={(e) => (e.target.className = "from-right")}
                on:exitViewport={(e) => (e.target.className = "from-right-init")}
              >
                <span class="product-sub">
                  {#if val_key === "ui" || val_key === "os"}
                    Device {val_key}
                  {:else if val_key === "cameras"}
                    {num_abr[value[val_key].length - 1]
                      ? num_abr[value[val_key].length - 1]
                      : ""}
                    {val_key}
                  {:else}
                    {val_key}
                  {/if}
                </span>
                <span class="product-text">
                  {#if item_key == "display"}
                    {#if val_key == "display height"}{value[val_key]} inches
                    {:else if val_key == "display width"}{value[val_key]} cm<sup
                        >2</sup
                      >
                    {:else if val_key == "screen-to-body"}{value[val_key]}%
                      screen ratio
                    {:else if val_key == "screen width"}<span
                        class="tag-888321 c2"
                        >{DisplaySizes(value[val_key])}</span
                      >
                    {:else if val_key == "screen height"}{value[val_key]}px
                    {:else if val_key == "screen ratio"}{value[val_key]} aspect ratio
                    {:else if val_key == "ppi"}{value[val_key]} PPI density
                    {:else if val_key == "type"}{value[val_key]} Display
                    {:else if val_key == "screen"}
                      {#each value[val_key].split(",") as x}
                        <span class="tag-888321 c1">{x}</span>
                      {/each}
                    {:else}
                      {value[val_key]}
                    {/if}
                  {:else if item_key === "memory"}
                    {#if val_key == "internal"}
                      {#each value[val_key].split(",") as x, i}
                        <span class="tag-888321 c{i}">{x}</span>
                      {/each}
                    {:else}
                      {value[val_key]}
                    {/if}
                  {:else if item_key === "misc"}
                    {#if val_key == "colors" || val_key == "price"}
                      {#each value[val_key].split(",") as x}
                        <span class="tag-888321 c5">{x}</span>
                      {/each}
                    {:else}{value[val_key]}{/if}
                  {:else if item_key === "battery"}
                    {#if val_key == "type" || val_key == "charging"}
                      {#each value[val_key].split(",") as x}
                        <span class="tag-888321 c5">{x}</span>
                      {/each}
                    {:else}{value[val_key]}{/if}
                  {:else if item_key === "main camera"}
                    {#if val_key == "cameras"}
                      {#each value[val_key] as x, i}
                        {#each x.split(",") as q}
                          <span class="tag-888321 c{i}">{q}</span>
                        {/each}
                        <hr />
                      {/each}
                    {:else if val_key == "video"}
                      <span class="tag-888321 c6">{value[val_key]}</span>
                    {:else}
                      {value[val_key]}
                    {/if}
                  {:else if item_key === "comms"}
                    {#if val_key == "usb"}
                      <span class="tag-888321 c1">{value[val_key]}</span>
                    {:else}
                      {value[val_key]}
                    {/if}
                  {:else if item_key === "platform"}
                    {#if val_key == "chipset"}
                      <span class="tag-888321 c2">{value[val_key]}</span>
                    {:else if val_key == "os"}
                      <span class="tag-888321 c4">{value[val_key]}</span>
                    {:else}
                      {value[val_key]}
                    {/if}
                  {:else if item_key === "network"}
                    {#if val_key == "technology"}
                      {#each value[val_key].split(",") as x}
                        <span class="tag-888321 c3">{x}</span>
                      {/each}
                    {:else if val_key == "speed"}
                      {#each value[val_key].split(",") as x}
                        <span class="tag-888321 c3">{x}</span>
                      {/each}
                    {:else}
                      {value[val_key]} Bands
                    {/if}
                  {:else if value[val_key] === true || value[val_key] == "Yes" || value[val_key] == "yes"}
                    {value[val_key]}
                    <span style="color:green">&#10004;</span>
                  {:else}
                    {value[val_key]}
                  {/if}
                </span>
              </div>
            {/if}
          {/each}
        {/each}
      </div>
    </section>
  {/if}
{/each}
