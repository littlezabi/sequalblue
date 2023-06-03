<script lang="ts">
  import Header from "$compo/Header.svelte";
  import Footer from "$compo/Footer.svelte";
  import "$lib/styles/main.scss";
  import Modal from "$compo/modal.svelte";
  import {
    ANNOUNCMENTS_ADD,
    MODAL_CONTEXT,
    SET_MODAL,USER_UPDATE
  } from "$lib/context/store";
  import { onMount } from "svelte";
  import axios from "axios";
  import { showAnnouncement, timeAfterAnnouncmentVisi } from "$lib/constants";
  import Messages from "$compo/messages.svelte";
  import type { PageData } from "./$types";
  export let data:PageData;
  onMount(async () => {
    USER_UPDATE(data.user)
    showAnnouncement && setTimeout(async () => {
      await axios
      .get("/api/data/", { params: { getAnnouncment: 1 } })
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
  })
</script>
<div id="super-container">
  <Header user={data?.user}/>
  <main>
    <Messages />
    {#if $MODAL_CONTEXT.show}<Modal />{/if}
    <slot />
  </main>
  <Footer />
</div>