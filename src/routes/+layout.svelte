<script lang="ts">
  import Header from "../components/Header.svelte";
  import Footer from "../components/Footer.svelte";
  import "$lib/styles/main.scss";
</script>

<div id="super-container">
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
</div>
