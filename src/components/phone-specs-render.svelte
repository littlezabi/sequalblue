<script lang="ts">
  import { viewport } from "$lib/intersection-observer";
  export let item = "";
  const values: any = Object.values(item);
  const keys = Object.keys(item);
</script>

<div  
  use:viewport
  on:enterViewport={(e) => (e.target.className = "a9kcazka ternart from-right")}
  on:exitViewport={(e) => (e.target.className = "a9kcazka ternart from-right-init")}
class="a9kcazka ternart">
  <section>
    <h2 class="title">{values[0]}</h2>
    {#each keys as e, i}
      {#if i !== 0}
        {#if e !== ""}<span class="product-sub"
            >{e}
            {#if values[i] === true || values[i].toLowerCase() === "yes"}
              &#10004;{/if}</span
          >{/if}
        {#if values[i] !== true || values[i].toLowerCase() !== "yes"}
          <span class="product-text">{values[i]}</span>
        {/if}
      {/if}
    {/each}
    <span class="line-h" />
  </section>
</div>
