<script lang="ts">
  import Header from "../components/Header.svelte";
  import Footer from "../components/Footer.svelte";
  import "$lib/styles/main.scss";
  import Modal from "$compo/modal.svelte";
  import {
    ANNOUNCMENTS_ADD,
    MODAL_CONTEXT,
    SET_MODAL,
  } from "$lib/context/store";
  import GlobalBottomNav from "$compo/global-bottom-nav.svelte";
  import { onMount } from "svelte";
  import axios from "axios";
  import { timeAfterAnnouncmentVisi } from "$lib/constants";
  onMount(async () => {
    setTimeout(async () => {
      await axios
      .get("/api/data", { params: { getAnnouncment: 1 } })
      .then((res) => {
        let x = res.data.announcments;
        if (x) {
          ANNOUNCMENTS_ADD(x);
          SET_MODAL({
            isClosing: false,
            show: true,
            title: x.title,
            children: "announcments",
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
    }, timeAfterAnnouncmentVisi);
  });
</script>



<div id="super-container">
  <Header />
  <main>
    {#if $MODAL_CONTEXT.show}<Modal />{/if}
    <slot />
  </main>
  <GlobalBottomNav />
  <Footer />
</div>
