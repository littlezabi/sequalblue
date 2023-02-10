<script lang="ts">
  export let title = "";
  export let description = "";
  export let keywords = "";
</script>

<title>{title}</title>
<meta name="description" content={description} />
<meta name="keywords" content={keywords} />
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
