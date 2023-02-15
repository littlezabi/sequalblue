<script lang="ts">
  import { __rating__ } from "$lib/constants";
  import StarRating from "svelte-star-rating";
  import eyeHeart from "$img/heart.svg";
  import categoryIcon from "$img/category.png";
  import fileIcon from "$img/file-icon.png";
  import fireIcon from "$img/fire.svg";
  import BgColors from "$compo/bg-colors.svelte";
  import InPageModals from "$compo/in-page-modals.svelte";
  import Search from "$compo/Search.svelte";
  import PageBottomCards from "$compo/page-bottom-cards.svelte";
  import { numberFormat } from "$lib/common";
  export let data: any = "";
  $: ({ results,type } = data);
</script>
<BgColors />
<Search/>
<div class="fade-in page-size">
  <div class="mt55">
    <InPageModals/>
  </div>
  <div class="dfc-r ai-s world-div">
    <div class="dfc-c ai-s super-key">
      <h2 class="s3c929">Smart Phone {type == 'trends' ? type : 'Most ' + type + ' in '} {new Date().getFullYear()} </h2>
      {#each results.phones as item}
        <section class="dfc-r">
          <a href="/smart-phones/{item.category}/{item.slug}" title={item.name}>
            <img src={item.image} alt={item.name} />
          </a>
          <div class="ec92">
            <a  href="/smart-phones/{item.category}/{item.slug}"  title={item.name}>
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
              <img src="{fireIcon}" alt="fire icon" />
              <span>{numberFormat(item.hits)}</span>
            </div>
            <div class="dfc-c">
              <img src={eyeHeart} alt="heart icon" />
              <span>{numberFormat(item.fans)}</span>
            </div>
            <a href="/smart-phones/{item.category}" class="dfc-c ucw-3">
              <img src="{categoryIcon}" alt="heart icon" />
              <span>{item.category}</span>
            </a>
          </div>
          
          </div>
        </section>
      {/each}
    </div>
    <div class="dfc-c ai-s super-key">
      <h2 class="s3c929">Watches {type == 'trends' ? type : 'Most ' + type + ' in '} {new Date().getFullYear()} </h2>
      {#each results.watches as item}
        <section class="dfc-r">
          <a href="/watches/{item.category}/{item.slug}" title={item.name}>
            <img src={item.image} alt={item.name} />
          </a>
          <div class="ec92">
            <a  href="/watches/{item.category}/{item.slug}"  title={item.name}>
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
              <img src="{fireIcon}" alt="fire icon" />
              <span>{numberFormat(item.hits)}</span>
            </div>
            <div class="dfc-c">
              <img src={eyeHeart} alt="heart icon" />
              <span>{numberFormat(item.fans)}</span>
            </div>
            <a href="/smart-phones/{item.category}" class="dfc-c ucw-3">
              <img src="{categoryIcon}" alt="heart icon" />
              <span>{item.category}</span>
            </a>
          </div>
          </div>
        </section>
      {/each}
    </div>
    <div class="dfc-c ai-s super-key comp-38c">
      <h2 class="s3c929">Computers {type == 'trends' ? type : 'Most ' + type + ' in '} {new Date().getFullYear()} </h2>
      {#each results.laptops as item}
        <section class="dfc-r">
          <a href="/computers/{item.category}/{item.slug}" title={item.name}>
            <img src={item.image} alt={item.name} />
          </a>
          <div class="ec92">
            <a  href="/computers/{item.category}/{item.slug}"  title={item.name}>
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
              <img src="{fireIcon}" alt="fire icon" />
              <span>{numberFormat(item.hits)}</span>
            </div>
            <div class="dfc-c">
              <img src={eyeHeart} alt="heart icon" />
              <span>{numberFormat(item.fans)}</span>
            </div>
            <a href="/smart-phones/{item.category}" class="dfc-c ucw-3">
              <img src="{categoryIcon}" alt="heart icon" />
              <span>{item.category}</span>
            </a>
          </div>
          
          </div>
        </section>
      {/each}
    </div>
    <div class="dfc-c ai-s super-key firm-38d-cx">
      <h2 class="s3c929">Firmwares {type == 'trends' ? type : 'Most ' + type + ' in '} {new Date().getFullYear()} </h2>
      {#each results.firmwares as item}
        <section class="dfc-r">
          <a href="/firmwares/{item.category}/{item.slug}" title={item.name}>
            <img src="{fileIcon}" alt="file icon" />
          </a>
          <div class="ec92">
            <a  href="/firmwares/{item.category}/{item.slug}"  title={item.name}>
              <h3>{item.title}</h3>
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
              <img src="{fireIcon}" alt="fire icon" />
              <span>{numberFormat(item.hits)}</span>
            </div>
            <div class="dfc-c">
              <img src={eyeHeart} alt="heart icon" />
              <span>{numberFormat(item.fans)}</span>
            </div>
            <a href="/smart-phones/{item.category}" class="dfc-c ucw-3">
              <img src="{categoryIcon}" alt="heart icon" />
              <span>{item.category}</span>
            </a>
          </div>
          
          </div>
        </section>
      {/each}
    </div>
  </div>
</div>
<BgColors class_={"mt--1000"} />
<PageBottomCards/>