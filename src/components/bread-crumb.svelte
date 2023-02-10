<script lang="ts">
  import arrowIcon from "$lib/assets/arrow-down.svg";
  export let urls: any = [];
  import homeIcon from "$img/home1.png";
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
        <span>{bread.name.length > 11 ? bread.name.substring(0,11) + '...': bread.name}</span>
        {#if !bread.disabled}
          <img src={arrowIcon} alt="arrow down icon" />
        {/if}
      </a>
    {/if}
  {/each}
</div>
