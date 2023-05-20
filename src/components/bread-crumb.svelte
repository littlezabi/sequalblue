<script lang="ts">
  import arrowIcon from "$lib/assets/arrow-down.svg";
  export let urls: any = [];
  import homeIcon from "$img/home.png";
  import { trimTitle } from "$lib/common";
</script>

<div class="page-size bread-crumb">
  <a
    class="dfc-r"
    href='/'
    title="go to home"
  >
    <img src={homeIcon} class="s3cs" alt="home icon" />
    <img src={arrowIcon} alt="arrow down icon" />
  </a>
  {#each urls as bread}
    {#if bread}
      <a
        class="dfc-r"
        href={bread.disabled ? "#" : bread.url}
        title="go to {bread.name}"
      >
        <span>{trimTitle(bread.name, 6, 3, '..')}</span>
        {#if !bread.disabled}
          <img src={arrowIcon} alt="arrow down icon" />
        {/if}
      </a>
    {/if}
  {/each}
</div>
