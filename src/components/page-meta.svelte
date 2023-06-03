<script lang="ts">
  import { WEBSITE_NAME } from "$lib/constants";

  export let createdAt:string|Date = Date()
  export let updatedAt = Date()
  export let title = "";
  export let description = "";
  export let image = "";
  export let keywords = "";
  export let ogType = 'article'
  export let page_url = "";
  export let author = "LittleZabi";
  export let articleTags:any = []
  
</script>

<title>{title}</title>
<meta name="description" content={description} />
<meta name="keywords" content={keywords} />
<meta name="author" content={author} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={image} />
<meta property="og:url" content={page_url} />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="{WEBSITE_NAME}" />
<meta property="og:type" content="{ogType}" />
{#each articleTags as tag}
  <meta property="article:tag" content="{tag}" />
{/each}
<meta property="article:published_time" content="{createdAt}" />
<meta property="article:modified_time" content="{updatedAt}" />
<meta property="article:publisher" content="{WEBSITE_NAME}" />
<meta name="twitter:label1" content="created by" />
<meta name="twitter:data1" content="{author}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content={image} />
<meta name="twitter:title" content={title} />
<meta name="twitter:site" content="@sequalblue" />
<meta name="twitter:creator" content="@{author}" />
<meta name="twitter:description" content={description} />
