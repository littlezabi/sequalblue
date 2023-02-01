<script lang="ts">
    import arrowIcon from '$lib/assets/arrow-down.svg'
    export let urls:any = []
</script>
<div class="bread-crumb">
    {#each urls as bread}
        <a class="dfc-r"  href="{bread.disabled ? '#' : bread.url}" title="go to {bread.name}">
            <span>{bread.name.substring(0, 20)}</span>
            <img src="{arrowIcon}" alt="arrow down icon" />
        </a>
    {/each}
</div>