<script lang="ts">
  import { __rating__ } from "$lib/constants";
  import { onMount } from "svelte";
  import StarRating from "svelte-star-rating";
  import eyeHeart from "$lib/assets/heart.svg";
  export let data: any = "";
  $: ({ results } = data);
  onMount(() => {
    console.log(data);
  });
</script>

<div class="page-size">
  <div class="dfc-r ai-s world-div">
    <div class="dfc-c ai-s super-key">
      {#each results.phones as item}
        <section class="dfc-r">
          <a href="/smart-phones/{item.category}/{item.slug}" title={item.name}>
            <img src={item.image} alt={item.name} />
          </a>
          <div class="ec92">
            <a href={item.slug} title={item.name}>
              <h3>{item.name}</h3>
            </a>
            <div>
              <StarRating
                rating={item.popularity > 5 ? 5 : item.popularity}
                config={{...__rating__, ...{fullColor:'#ff5722'}}}
              />
              <span class="fz12">{item.popularity > 5 ? (5).toFixed(1) : item.popularity.toFixed(1)} rating</span>
            </div>
            <div>
            <div class="dfc-c">
              <img src="/images/assets/fire.svg" alt="fire icon" />
              <span>{item.hits}</span>
            </div>
            <div class="dfc-c">
              <img src={eyeHeart} alt="heart icon" />
              <span>{item.fans}</span>
            </div>
          </div>
          
          </div>
        </section>
      {/each}
    </div>
    <div class="dfc-c ai-s super-key">
      {#each results.watches as item}
        <section class="dfc-r">
          <a href={item.slug} title={item.name}>
            <img src={item.image} alt={item.name} />
          </a>
          <div class="ec92">
            <a href={item.slug} title={item.name}>
              <h3>{item.name}</h3>
            </a>
            <div>
              <StarRating
                rating={item.popularity > 5 ? 5 : item.popularity}
                config={{...__rating__, ...{fullColor:'#ff5722'}}}
              />
              <span class="fz12">{item.popularity > 5 ? (5).toFixed(1) : item.popularity.toFixed(1)} rating</span>
            </div>
            <div>
            <div class="dfc-c">
              <img src="/images/assets/fire.svg" alt="fire icon" />
              <span>{item.hits}</span>
            </div>
            <div class="dfc-c">
              <img src={eyeHeart} alt="heart icon" />
              <span>{item.fans}</span>
            </div>
          </div>
          
          </div>
        </section>
      {/each}
    </div>
    
  </div>
</div>
