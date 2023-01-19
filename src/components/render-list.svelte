<script lang="ts">
  export let base_url = "/";
  export let items: any = "";
</script>

{#each items as item}
  <a class="dfc-c cat-view-a render-list-item" href="{base_url}/{item.slug}" title="abc">
    {#if item.isNew}
      <span class="badge new setNewBadge">NEW</span>
    {/if}
    <img src={item.image} alt={item.name} />
    <span class="title">{item.name}</span>
  </a>
{/each}
