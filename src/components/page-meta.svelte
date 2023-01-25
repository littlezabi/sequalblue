<script lang="ts">
  export let title = "";
  export let description = "";
</script>

<title>{title}</title>
<meta name="description" content={description} />
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
