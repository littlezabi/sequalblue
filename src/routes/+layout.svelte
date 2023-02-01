<script lang="ts">
  import Header from "../components/Header.svelte";
  import Footer from "../components/Footer.svelte";
  import "$lib/styles/main.scss";
  import Modal from "$compo/modal.svelte";
  import { MODAL_CONTEXT } from "$lib/context/store";
  import { WEBSITE_NAME } from "$lib/constants";
  import GlobalBottomNav from "$compo/global-bottom-nav.svelte";
</script>
<div id="super-container">
  <Header />
  <main>
    {#if $MODAL_CONTEXT.show}<Modal />{/if}
    <slot />
  </main>
  <GlobalBottomNav/>
  <Footer />
</div>
