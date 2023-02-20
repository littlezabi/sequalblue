<script lang="ts">
  import { viewport } from "$lib/intersection-observer";
  export let items: any = "";
  const keys = Object.keys(items);
</script>

{#each keys as key}
  {#if key == "image" || key == "slug" || key == 'views' || key == 'description' || key=='keywords' || key==='fans' || key==='hits' || key==='popularity'}
    {""}
  {:else}
    <section>
      <div
        use:viewport
        on:enterViewport={(e) => (e.target.className = "from-right")}
        on:exitViewport={(e) => (e.target.className = "from-right-init")}
      >
        <h2 class="title">{key.replaceAll("_", " ")}</h2>
        {#if key === "usbs"}
          {#each items[key] as usb}
            <span class="product-sub">
              <small> {usb}</small>
            </span>
          {/each}
        {:else}
          <span class="product-sub">
            {#if key == "os"}
              {items[key] === false || items[key] === ""
                ? "  Operating system is not installed"
                : items[key]}
            {:else if items[key] == true || items[key] === "yes" || items[key] === "Yes"}
              <span class="check-color">&#10004;</span> Yes
            {:else if items[key] == false || items[key] === "no" || items[key] === "No"}
              <span class="">Not exist</span>
            {:else}
              {items[key]}
            {/if}
          </span>
        {/if}
      </div>
    </section>
  {/if}
{/each}
