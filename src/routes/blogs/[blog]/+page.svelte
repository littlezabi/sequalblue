<script lang="ts">
  import { life, numberFormat, setUserCharName } from "$lib/common";
  import type { PageData } from "./$types";
  import fbIcon from "$img/facebook.svg";
  import eyeHeart from "$img/heart.svg";
  import twIcon from "$img/twitter.svg";
  import fireIcon from "$img/fire.svg";
  import zoomIn from "$img/zoom-in.png";
  import zoomOut from "$img/zoom-out.png";
  import tagIcon from "$img/tag.png";
  import catIcon from "$img/category.png";
  import BgColors from "$compo/bg-colors.svelte";
  import { lazyLoad } from "$lib/intersection-observer";
  import Search from "$compo/Search.svelte";
  import BlogsRenderer from "$compo/blogs-renderer.svelte";
  export let data: PageData;
  $: ({ slug, blog, related } = data);
  let fontSize = 16
  function handleZoom(e:Event){
    let v = e.target as HTMLInputElement
    const number = Number(v.value)
    fontSize = number >= 40 ? fontSize = 40 : number <= 12 ? fontSize = 12 : fontSize=number
  }
</script>

<div class="blogs-view fade-in">
  <div class="blog-top">
    <div class="image">
      <img src={blog.image} alt={blog.title} />
    </div>
    <div class="shade" />
    <div class="page-size dfc-r jc-sb top-clash">
      <div class="left dfc-c ai-s">
        <h2>{blog.title}</h2>
        <div class="dfc-r c82">
          <span class="s-c322">{setUserCharName(blog.author)}</span>
          <div class="dfc-c ai-s">
            <span>{blog.author}</span>
            <span>{life(blog.createdAt).format("MM  Do  YYYY")}</span>
            <span
              >category &rarr; <a
                href="/blogs?cat={blog.category}"
                title="visit {blog.category}">{blog.category}</a
              ></span
            >
          </div>
        </div>
      </div>
      <div class="right">
        <div class="dfc-c blog-top-icons">
          <a
            href="www.facebook.com/{slug}"
            rel="noreferrer"
            target="_blank"
            title="share on facebook"
          >
            <img src={fbIcon} alt="icon" />
            <span>share</span>
          </a>
          <a
            href="www.twitter.com/{blog.slug}"
            rel="noreferrer"
            target="_blank"
            title="share on twitter"
          >
            <img src={twIcon} alt="icon" />
            <span>share</span>
          </a>
          <div title="total views">
            <img src={fireIcon} alt="icon" />
            <span>{numberFormat(blog.hits)}</span>
          </div>
          <div>
            <button><img src={eyeHeart} alt="icon" /></button>
            <span>{numberFormat(blog.fans)}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <BgColors />
  <div class="blog-search">
    <Search />
  </div>
  <div class="page-size b-main-view">
    <div class="main-content dfc-r ai-s">
      <div class="left">
        <div class="main-top-title dfc-r js-s">
          <span class="dfc-r" style="text-transform:uppercase;"
            ><img src={catIcon} alt="category icon" />{blog.category}</span
          >
          <span>&#x2022; {life(blog.createdAt).format("mm / DD / YYYY")}</span>
          <span>&#x2022; {blog.readTime} minutes read time</span>
          <span>&#x2022; Author &rarr; {blog.author}</span>
        </div>
        <h2 class="sec-title">{blog.title}</h2>
        <div class="main-image">
          <img src={blog.image} alt={blog.title} />
        </div>
        <div class="dfc-r jc-sb zooming">
          <button on:click={()=>fontSize >= 40 ? fontSize: fontSize++}><img src={zoomIn} alt="zoom in" /></button>
          <input type="number" on:keyup={handleZoom} value={fontSize} min="12" max="40" name="zoom" />
          <button on:click={()=>fontSize <= 12 ? fontSize: fontSize--}><img src={zoomOut} alt="zoom out" /></button>
        </div>
        <div class="body" style="font-size: {fontSize}px !important">
          {@html blog.body}
        </div>
        <div class="dfc-r js-s tags">
          <img src={tagIcon} alt="tag icon" />
          {#each blog.tags as tag}
            <span>{tag}</span>
          {/each}
        </div>
      </div>
      <div class="right">
        <h3>Related Articles</h3>
        <BlogsRenderer items={related} />
        <!-- {#each related as blog}
          <a
            class="p-list-a product-sections dfc-c"
            href="/blogs/{blog.slug}"
            title={blog.title}
          >
            <section class="product-sec82">
              {#if blog.isNew}
                <span class="badge">NEW</span>
              {/if}
              <span class="db ma sec-title fz9"
                >{blog.author} &#x2022; {life(blog.createdAt).format(
                  "mm / DD / YYYY"
                )}</span
              >
              <span class="db ma sec-title"
                >{blog.title.length > 80
                  ? blog.title.substring(0, 80) + "..."
                  : blog.title}</span
              >
              <img
                src="/images/assets/loading.png"
                use:lazyLoad={blog.image}
                alt={blog.title}
              />
              <div class="dfc-r a9w6b8q">
                {blog.subtitle.length > 200
                  ? blog.subtitle.substring(0, 200) + "..."
                  : blog.subtitle}
              </div>
              <span class="low9999">click to read more &raquo;</span>
            </section>
          </a>
        {/each} -->
      </div>
    </div>
  </div>
</div>
