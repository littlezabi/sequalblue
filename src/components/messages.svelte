<script lang="ts">
  import { MESSAGE, REMOVE_MESSAGE } from "$lib/context/store";
  import categoryIcon from "$img/dot6.svg";
  const clearAll = () => $MESSAGE.map((e: any) => handleClose(e.id));
  const handleClose = (id: number) => {
    try {
      const el = document.getElementById(`mes-${id}`);
      el?.classList.remove("anim-from-right");
      el?.classList.add("close");
      setTimeout(() => {
        el?.remove();
        REMOVE_MESSAGE(id);
      }, 300);
    } catch (e) {
      console.error(e);
    }
  };
</script>

<div class="Messages dfc-c">
  {#each $MESSAGE as message}
    <div
      id="mes-{message.id}"
      class="dfc-r sec5c anim-from-right {message.variant}"
    >
      {#if message.variant == "error" || message.variant == "alert"}
        <span class="warning">&#9888;</span>
      {:else}
        <span class="check">&#x2713;</span>
      {/if}
      <img src={categoryIcon} alt="category icon" />
      <span class="mess0-3">
        {message.message}
      </span>
      <button on:click={() => handleClose(message.id)}>&times;</button>
    </div>
  {/each}
  {#if $MESSAGE.length > 0}<button on:click={clearAll} class="clear-all fade-in">Clear All</button>{/if}
</div>
