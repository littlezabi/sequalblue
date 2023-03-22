<script lang="ts">
  import ArrowDown from "$img/arrow-down.svg";
  import processIcon from "$img/process.png";
  import uploadIcon from "$img/upload.png";
  import { formatBytes, trimTitle } from "$lib/common";
  import {
    flaskApiBaseUrl,
    maximumFilesAllowInImageTools,
    WEBSITE_NAME,
  } from "$lib/constants";
  import cartIcon from "$img/cart.svg";
  import homeIcon from "$lib/assets/home.png";
  import userIcon from "$img/user.svg";
  import Search from "$compo/Search.svelte";
  import type { PageData } from "./$types";
  import axios from "axios";
  export let data: PageData;
  let message: any = false;
  let files: any = [];
  let loading_files: any = [];
  let total_files = 0;
  let session_name = "";
  let selectedSize = 0;
  function dropHandler(ev: any) {
    dropLeave(ev);
    message = false;
    const files_list: any = [];
    ev.preventDefault();
    if (ev.dataTransfer.items) {
      if (
        ev.dataTransfer.items.length > maximumFilesAllowInImageTools ||
        files.length + 1 > maximumFilesAllowInImageTools
      ) {
        message = {
          message: `Select maximum ${maximumFilesAllowInImageTools} files! you are selecting ${
            ev.dataTransfer.items.length + files.length
          } files.`,
          variant: "alert",
        };
        return 0;
      }
      [...ev.dataTransfer.items].forEach((item, i) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          let isExist = false;
          files.map((f: any) => {
            if (f.input_name === file.name) {
              isExist = true;
              return 0;
            }
          });
          if (!isExist) {
            files_list.push(file);
            selectedSize += file.size;
            total_files += 1;
          } else alert(`file already exist ${file.name}`);
        }
      });
    } else {
      if (
        ev.dataTransfer.files.length >= maximumFilesAllowInImageTools ||
        files.length + 1 >= maximumFilesAllowInImageTools
      ) {
        message = {
          message: `Select maximum ${maximumFilesAllowInImageTools} files! you are selecting ${
            ev.dataTransfer.files.length + files.length
          } files.`,
          variant: "alert",
        };
        return 0;
      }
      [...ev.dataTransfer.files].forEach((file, i) => {
        files_list.push(file);
        selectedSize += file.size;
        total_files += 1;
      });
    }
    files = [...files, ...files_list]
    sendToTheServer(files_list);
  }
  function dragOverHandler(ev: any) {
    ev.preventDefault();
    ev.target.classList.add("active");
    try {
      let k: any = document?.getElementById("m3c2x99k");
      k.textContent = "Release to Upload File's";
    } catch (e) {}
  }
  const dropLeave = (event: any) => {
    event.target.classList.remove("active");
    try {
      let k: any = document?.getElementById("m3c2x99k");
      k.textContent = "Drag one or more files to this";
    } catch (e) {}
  };
  const handleFileInput = async (ev: any) => {
    message = false;
    let f = ev.target.files;
    if (
      f.length > maximumFilesAllowInImageTools ||
      files.length + 1 > maximumFilesAllowInImageTools
    ) {
      message = {
        message: `Select maximum ${maximumFilesAllowInImageTools} files! you are selecting ${
          f.length + files.length
        } files.`,
        variant: "alert",
      };
      return 0;
    }
    let dup = [];
    for (let i = 0; i < f.length; i++) {
      let item = f[i];
      let isExist = false;
      files.map((f: any) => {
        if (f.name === item.name) {
          isExist = true;
          return 0;
        }
      });
      if (!isExist) {
        files.push(item);
        total_files += 1;
      } else dup.push(item.name);
    }
    if (dup.length > 0)
      message = {
        message: "Duplicates upload found: " + dup.join(", "),
        variant: "error",
      };
  };
  const sendToTheServer = async (list: any) => {
    if (list.length === 0) return 1;
    loading_files = Array(list.length);
    const formData = new FormData();
    list.map((file: any) =>
      formData.append(
        `${file.size}-${String(Math.floor(Math.random() * 99999))}`,
        file
      )
    );
    formData.append("datasize", String(selectedSize));
    formData.append("totalfiles", String(list.length));
    formData.append("session_name", session_name);
    let api_url = `${flaskApiBaseUrl}/resize/}`;
    await axios
      .post(api_url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (res: any) => {
        console.log(res.data);
        loading_files = [];
        let response = res.data;
        session_name = response.session_name;
        files = [...files, ...response.output];
      })
      .catch((e) => {
        loading_files = [];
        console.log(e);
        message = {
          message: `Error: ${e.message}`,
          variant: "error",
        };
      });
  };
</script>

<Search />
<div class="page-size tools-view">
  <div class="page-size dfc-r mid-links">
    <a href="/">
      <img src={homeIcon} alt="homeIcon" />
    </a>
    <div class="dfc-r" />
    <a href="/cart">
      <img src={cartIcon} alt="cart" />
    </a>
    <a href="/profile">
      <div class="dfc-r">
        <img src={userIcon} alt="cart" />
        <span>Profile</span>
      </div>
    </a>
    <a href="/about">About</a>
    <a href="/blogs">Blogs</a>
  </div>
  <div class="tools-top">
    <h1>Convert Images Free</h1>
    <p class="d3kc32">
      Total <span>{formatBytes(3834230000000.0, 2, "")} ✔</span> Data Processed
    </p>
    <p>
      Welcome to {WEBSITE_NAME} Image Converter 🎉, the best online image converter
      tool! Easily convert your images from one format to another with just a few
      clicks. We support all popular image formats, and our advanced algorithms ensure
      that the quality of your images is maintained during conversion 👏. Try us
      out now and experience the convenience of hassle-free image conversion!
    </p>
  </div>
  <div class="tools dfc-r ai-s">
    <div class="select-area">

    </div>
    <div class="drop-items">
      <h3>Select maximum {maximumFilesAllowInImageTools} files 👇</h3>
      <div>
        <div
          class="dfc-c drop-zone"
          on:mousedown={() => {
            document?.querySelector("#file-input")?.click();
          }}
          on:drop={dropHandler}
          on:dragleave={dropLeave}
          on:dragover={dragOverHandler}
        >
          <p>
            <span id="m3c2x99k">Drag one or more files to this</span>
            <i>drop zone</i>.
          </p>
          <img src={uploadIcon} alt="upload icon" />
          <span>OR click to select files</span>
          <input
            type="file"
            accept="image/*"
            multiple
            on:change={handleFileInput}
            name=""
            id="file-input"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="dfc-r" style="margin:10px auto;">
    {#if message}
      <span class={`${message.variant}-box`}>{message.message}</span>
    {/if}
  </div>
  <div class="dfc-r ai-s file-resize-view">
    <section>
        <img src={userIcon} alt="cart" />
    </section>
    <!-- {#each files as file}
      <section title={file.output_name}>
        <img src={file.thumbnail} alt="abc" />
        <span class="ext-3c">
          {#if selected.ops.split("-")[2] == "compress"}
            {`${Math.ceil(file.compress_percent - 100)}%`}
            <small>size reduce</small>
          {:else}
            selected.ops.split("-")[2]
          {/if}
        </span>
        <div class="dfc-c output-a">
          <a href={file.file_url} title="download file" rel="noreferrer"
            >DOWNLOAD</a
          >
          <span>{trimTitle(file.output_name)}</span>
          <span class="a9cx">{formatBytes(file.output_size)}</span>
        </div>
      </section>
    {/each} -->
    {#each loading_files as load}
      <section class="dfc-c search-loading loading">
        <span class="load-txt">PROCESSING</span>
        <img src={processIcon} alt="processing" />
      </section>
    {/each}
  </div>
</div>
