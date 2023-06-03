<script lang="ts">
  import StarRating from "$compo/StarRating.svelte";
  import eyeHeart from "$img/heart.svg";
  import favoIcon from "$img/favorite.png";
  import eyeIcon from "$img/eye.svg";
  import fireIcon from "$img/fire.svg";
  import { addItemSlug, addViewItem, viewItem } from "$lib/context/store";
  import axios from "axios";
  import { numberFormat } from "$lib/common";
  console.log($viewItem.itemsList);
  export let slug = "";
  let loading = false;

  // if (!$viewItem.slugList.includes(slug))
  //   axios
  //     .get("/api/data/", { params: { slug, getItems: 1 } })
  //     .then((e) => {
  //       addViewItem(e.data);
  //       addItemSlug(slug);
  //     })
  //     .catch((e) => {
  //       console.log("error: ", e);
  //     });
  const handleViewItem = (index: number) => {
    const elementsWidth: any = document.querySelector(
      ".ecca-main section:nth-child(1)"
    )?.clientWidth;
    let x: any = document.querySelector(".ecca-main .ecca-wrap");
    let sections: any = document.querySelectorAll(
      ".ecca-main .ecca-wrap .ecca-sec"
    );
    let btn = document.querySelectorAll(`.button-list button`);
    sections.forEach((e) => e.classList.remove("in-view"));
    sections[index - 1]?.classList.add("in-view");
    btn.forEach((e) => e.classList.remove("open"));
    btn[index]?.classList.add("open");
    x.style.transform = `translateX(-${elementsWidth * index}px)`;
  };
</script>

<div class="ecca-main">
  <div class="button-list">
    {#each $viewItem.itemsList as k, i}<button
        on:click={() => handleViewItem(i)}
      >
        <!-- {++i} -->
      </button>
    {/each}
  </div>
  <div class="ecca-wrap">
    {#each $viewItem.itemsList as item, index (index)}
      <section class="ecca-sec">
        <div class="ecca-left">
          <img src={item.image} alt={item.title} />
          <div class="a003s__ dfc-c">
            <a class="a003s__btn dfc-r" href="/smart-phone/{item.category}">
              <img
                src="/images/logos/{item.category}.png"
                alt="{item.category} logo"
              />
              <span>{item.category} phone's</span>
            </a>
            <button class="a003s__btn dfc-r">
              <img src={favoIcon} alt="favorite" />
              <span>Add to favorite</span>
            </button>
            <a class="a003s__btn dfc-r" href="/smart-phone/{item.slug}">
              <img src={eyeIcon} alt="favorite" />
              <span>Phone specification</span>
            </a>
          </div>
        </div>
        <div class="ecca-right">
          <h3>{item.title}</h3>
          <div>
            <ul class="cam--999323">
              {#each item["main camera"] as camera}
                {#each Object.keys(camera) as cam}
                  {#if cam === "cameras"}
                    {#each camera.cameras as c}
                      <li>{c}</li>
                    {/each}
                  {:else}
                    <li>{camera[cam]}</li>
                  {/if}
                {/each}
              {/each}
              <div class="wire" />
              {#each item["battery"] as bt}
                <li>Battery {Object.keys(bt)} {bt[Object.keys(bt)]}</li>
              {/each}
              <div class="wire" />
              {#each item["memory"] as bt}
                <li>Memory {Object.keys(bt)} {bt[Object.keys(bt)]}</li>
              {/each}
              <div class="wire" />
            </ul>
          </div>
          <p>{item.description}</p>
          <div class="dates">
            {#each item["launch"] as bt}
              <span>{Object.keys(bt)} {bt[Object.keys(bt)]}</span>
            {/each}
          </div>
          <div class="e9932z">
            <StarRating show_rating={true} rating={item.rating} />
            <span>
              <img src={eyeHeart} alt="hearts" />
              {numberFormat(item.loves)}
            </span>
            <span>
              <img src={fireIcon} alt="fire" />
              {numberFormat(item.views)}
            </span>
            <span>{item.category.toUpperCase()}</span>
          </div>
        </div>
      </section>
    {/each}
  </div>
</div>

<style lang="scss">
  .ecca-main {
    background: white;
    padding: 10px;
    border-radius: 8px;
    max-width: 100%;
    margin-top: 0px;
    max-height: 95vh;
    overflow: scroll;
    & .a003s__ {
      margin: 10px auto;
      border-left: 1px solid #e4e4e4;
      padding-left: 8px;
      & .a003s__btn {
        padding: 3px 5px;
        border-radius: 3px;
        color: #2d2d2d;
        font-size: 13px;
        width: 100%;
        justify-content: flex-start;
        margin-top: 2px;
        text-transform: capitalize;
        &:hover {
          background: #eef5ff;
        }
        & img {
          width: 33px;
          margin-right: 12px;
        }
      }
      & a {
        & img {
          width: 29px;
        }
      }
    }
    & .dates {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin: 14px 0;
      text-transform: capitalize;
      font-size: 14px;
      color: #5e5e5e;
    }
    & .button-list {
      position: fixed;
      left: 0;
      top: 0;
      width: 90%;
      right: 0;
      margin: auto;
      background: #ffffff73;
      z-index: 1;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(30px);
      & button {
        background: black;
        width: 23px;
        height: 23px;
        color: white;
        font-size: 14px;
        margin: 0 2px;
        border-radius: 50%;
        border: 2px solid transparent;
        &:hover {
          background: #ffffff00 !important;
          border-color: #898989;
        }
      }
    }
    & .cam--999323 {
      margin: 8px 0;
      & .wire {
        margin: 7px 0;
      }
      & li {
        list-style: circle;
        font-size: 14px;
      }
    }
    & .e9932z {
      display: flex;
      background: #00a9ff24;
      align-items: center;
      border-radius: 6px;
      justify-content: center;
      margin: 8px 0;
      & img {
        width: 25px;
        margin-right: 2px;
      }
      & span {
        display: flex;
        align-items: center;
        font-size: 14px;
        margin: 2px 11px;
      }
    }

    & .ecca-wrap {
      overflow: scroll;
      display: flex;
      flex-wrap: nowrap;
      width: -moze-max-content;
      width: max-content;
      margin-top: 31px;
      transition: 500ms cubic-bezier(0.84, -0.88, 0.73, 1.23);
    }
    & .ecca-sec {
      transition: 800ms ease-in-out;
      &.in-view {
        filter: blur(0px);
      }
      width: 100vw;
      padding: 3px 0;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }
    & .ecca-left {
      margin-right: 46px;
      display: flex;
      flex-direction: column;
      align-items: center;
      & img {
        max-width: 204px;
        filter: saturate(1.5);
      }
    }
    & .ecca-right {
      padding: 10px 18px;
      & h3 {
        font-size: 39px;
        text-transform: uppercase;
        font-weight: 500;
        letter-spacing: 1px;
        margin-left: -17px;
      }
      & p {
        max-width: 425px;
        background: #0000ff17;
        padding: 9px;
        font-size: 14px;
        border-radius: 6px;
        line-height: 1.4;
      }
    }
  }
  @media (max-width: 992px) {
    .ecca-main  .ecca-right {
      max-width: 423px;
      margin-right: 30px;
      & h3{
        font-size: 32px;
        letter-spacing: 0;
      }
    }
  }
  @media (max-width: 768px) {
    .ecca-main  .ecca-right {
      max-width: 433px;
      margin-right: 49px;
     
    }
    .ecca-left{
      margin-right: 28px;
    }
  
  }
  @media (max-width: 680px) {
    .ecca-main  .ecca-right {
      max-width: 398px;
    margin-right: 52px;
    }
  }
  @media (max-width: 620px) {
    .ecca-main  .ecca-right {
      max-width: 337px;
      margin-right: 43px;
    }
  }
</style>
