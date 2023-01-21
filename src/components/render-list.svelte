<script lang="ts">
  export let base_url = "/";
  export let items: any = "";
  export let for_:string = 'phone'
</script>

{#each items as item}
  <a class="dfc-c cat-view-a render-list-item" href="{base_url}/{item.slug}" title="abc">
    {#if item.isNew}
      <span class="badge new setNewBadge">NEW</span>
    {/if}
    <img src={item.image} alt={item.name} />
    <span class="title">{item.name}</span>
    {#if for_ === 'computers'}
      <span class="fz10 fwb">{item.cpu} | {item.ram}</span>
    {/if}
  </a>
{/each}
