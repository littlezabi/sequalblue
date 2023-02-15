<script lang="ts">
  import { __rating__ } from "$lib/constants";
  export let base_url = "/";
  export let items: any = "";
  export let for_:string = 'phone'
  import StarRating from "$compo/StarRating.svelte";
</script>

{#each items as item}
  <a class="dfc-c cat-view-a render-list-item terno" href="{base_url}/{item.slug}" title="{item.name}">
    {#if item.isNew}
      <span class="badge new setNewBadge">NEW</span>
    {/if}
    <img src={item.image} alt={item.name} />
    <span class="title">{item.name}</span>
    {#if for_ === 'computers'}
      <span class="fz10 fwb">{item.cpu} | {item.ram}</span>
    {/if}
    <div class="rating dfc-r">
      <StarRating rating={item.popularity}/>
      <span>{item.popularity}</span>
    </div>
  </a>
{/each}
