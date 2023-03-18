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
  import { timeAfterAnnouncmentVisi } from "$lib/constants";
  import Messages from "$compo/messages.svelte";
  import type { PageData } from "./$types";
  export let data:PageData;
  onMount(async () => {
    USER_UPDATE(data.user)
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
  })
</script>

<svelte:head>
  <!-- <meta name="description" content="Get the latest tech specs, firmware updates, troubleshooting tips & product reviews for smartphones, computers & smartwatches on our website."/>
  <meta name="keywords" content="phone specs, mobile devices, smartphones,tablets,firmware updates,laptops,computers,tech specs,smart watches,wearable technology,mobile operating systems,Mobile reviews,mobile comparison,technology news,gadget reviews"/> -->
</svelte:head>


<div id="super-container">
  <Header user={data?.user}/>
  <main>
    <Messages />
    {#if $MODAL_CONTEXT.show}<Modal />{/if}
    <slot />
  </main>
  <Footer />
</div>
<style>
  /* .scroll-to-top {
    display: none;
    position: fixed;
    bottom: 20px;
    right: 30px;
    z-index: 99;
    font-size: 18px;
    border: none;
    outline: none;
    background-color: #555;
    color: white;
    cursor: pointer;
    padding: 15px;
    border-radius: 4px;
  }

  .scroll-to-top:hover {
    background-color: #555;
  } */
</style>