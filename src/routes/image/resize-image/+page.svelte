<script lang="ts">
  import resizeImage from "$img/resize-image.png";
  import clearBrushIcon from "$img/clear-brush.png";
  import resizeImageIcon from "$img/resize-image.svg";
  import arrowDown from "$img/arrow-down.svg";
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
  let loading_files: any = 0;
  let total_files = 0;
  let session_name = "";
  let byPercent = false;
  let percentValue = 50;
  let aspectRatioToggler = true;
  let enlargeIfSmaller = false;
  let width = 128;
  let height = 128;
  let filesuploaded = 0;
  let downloads_list: any = [];
  const getImageContent = (image: any) => URL.createObjectURL(image);
  function addingInputFilesIntoList(image: any) {
    downloads_list = [];
    loading_files = 0;
    filesuploaded = 0;
    var img = new Image();
    img.src = getImageContent(image);
    img.onload = () => {
      let ratio = maintainAspectRatio(img.width, img.height, width, height);
      files = [
        ...files,
        {
          content: image,
          filesize: image.size,
          actual_width: img.width,
          actual_height: img.height,
          width: ratio.width,
          height: ratio.height,
          customized: false,
        },
      ];
      img.src = "";
      total_files += 1;
    };
  }
  function dropHandler(ev: any) {
    dropLeave(ev);
    message = false;
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
          if (!isExist) addingInputFilesIntoList(file);
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
      [...ev.dataTransfer.files].forEach((file, i) =>
        addingInputFilesIntoList(file)
      );
    }
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
      if (!isExist) addingInputFilesIntoList(item);
    }
  };
  const sendToTheServer = async (formData: any, file: any) => {
    let api_url = `${flaskApiBaseUrl}/resize/`;
    files.slice(filesuploaded, 1);
    files = files;
    filesuploaded += 1;
    formData.append("session_name", session_name);
    formData.append(
      `${String(Math.floor(Math.random() * 99999))}`,
      file.content
    );
    formData.append(`filesize`, file.filesize);
    formData.append(`width`, file.width);
    formData.append(`height`, file.height);
    await axios
      .post(api_url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (res: any) => {
        loading_files = Math.floor((filesuploaded / files.length) * 100);
        let response = res.data;
        session_name = response.session_name;
        console.log(res.data);
        let formData = new FormData();
        formData.append("session_name", session_name);
        downloads_list = [...downloads_list, ...res.data.output];
        if (filesuploaded < files.length)
          sendToTheServer(formData, files[filesuploaded]);
        else files = [];
      })
      .catch((e) => {
        loading_files = 0;
        message = {
          message: `Error: ${e.message}`,
          variant: "error",
        };
      });
  };
  const createForm = async (list: any) => {
    filesuploaded = 0;
    const formData = new FormData();
    sendToTheServer(formData, files[filesuploaded]);
  };
  function maintainAspectRatio(
    actual_width: number,
    actual_height: number,
    desiredWidth: number,
    desiredHeight: number
  ) {
    const aspectRatio = actual_width / actual_height;
    let newWidth, newHeight;
    if (desiredWidth && !desiredHeight) {
      newWidth = desiredWidth;
      newHeight = Math.round(newWidth / aspectRatio);
    } else if (desiredHeight && !desiredWidth) {
      newHeight = desiredHeight;
      newWidth = Math.round(newHeight * aspectRatio);
    } else {
      const widthRatio = desiredWidth / actual_width;
      const heightRatio = desiredHeight / actual_height;
      if (widthRatio < heightRatio) {
        newWidth = desiredWidth;
        newHeight = Math.round(newWidth / aspectRatio);
      } else {
        newHeight = desiredHeight;
        newWidth = Math.round(newHeight * aspectRatio);
      }
    }
    return { width: newWidth, height: newHeight };
  }
  const handleSettingsInputs = (event: any, type_: string) => {
    let updated: any;
    const new_files = files.map((e: any) => {
      if (e.customized === false) {
        if (aspectRatioToggler) {
          width = event.target.value;
          height = event.target.value;
          let ratio = maintainAspectRatio(
            e.actual_width,
            e.actual_height,
            width,
            height
          );
          if (enlargeIfSmaller) {
            if (ratio.width > e.actual_width || ratio.height > e.actual_height)
              updated = { width: e.actual_width, height: e.actual_height };
            else updated = { width: ratio.width, height: ratio.height };
          } else {
            updated = { width: ratio.width, height: ratio.height };
          }
        } else {
          updated = {};
          if (type_ === "width") {
            updated.width = event.target.value;
            if (enlargeIfSmaller)
              updated.width =
                updated.width > e.actual_width ? e.actual_width : updated.width;
          } else {
            updated.height = event.target.value;
            if (enlargeIfSmaller)
              updated.height =
                updated.height > e.actual_height
                  ? e.actual_height
                  : updated.height;
          }
        }
        return { ...e, ...updated };
      } else return e;
    });
    files = new_files;
  };
  const handleImageInputs = (
    element: any,
    index: number,
    type_: string,
    actual_size: { width: number; height: number }
  ) => {
    let mod_file = files[index];
    let width, height;
    if (aspectRatioToggler) {
      if (type_ === "width") {
        width = element.target.value;
        height = width;
      } else {
        height = element.target.value;
        width = height;
      }
      let ratio = maintainAspectRatio(
        actual_size.width,
        actual_size.height,
        width,
        height
      );
      width = ratio.width;
      height = ratio.height;
    } else {
      width = type_ === "width" ? element.target.value : mod_file.width;
      height = type_ === "height" ? element.target.value : mod_file.height;
    }
    files.splice(index, 1, { ...mod_file, width, height, customized: true });
    files = files;
  };
  const removeIndividualSetting = (index: number) => {
    let a = files[index];
    let ratio = aspectRatioToggler
      ? maintainAspectRatio(a.actual_width, a.actual_height, width, height)
      : { width, height };
    files.splice(index, 1, {
      ...files[index],
      customized: false,
      width: ratio.width,
      height: ratio.height,
    });
    files = files;
  };
  const removeFile = (index: number) => {
    files.splice(index, 1);
    files = files;
  };
  const handleAspectRatio = () => {
    aspectRatioToggler = !aspectRatioToggler;
    let f = files.map((e: any) => {
      if (e.customized) return e;
      let ratio = { width, height };
      if (aspectRatioToggler) {
        height = width;
        ratio = maintainAspectRatio(
          e.actual_width,
          e.actual_height,
          width,
          height
        );
      }

      return { ...e, width: ratio.width, height: ratio.height };
    });
    files = f;
  };
  const handlerEnlargeOption = () => {
    enlargeIfSmaller = !enlargeIfSmaller;
    let f = files.map((e: any) => {
      if (e.customized) return e;
      let size = { width: e.width, height: e.height };
      if (enlargeIfSmaller) {
        if (e.width > e.actual_width) size["width"] = e.actual_width;
        if (e.height > e.actual_height) size["height"] = e.actual_height;
        return { ...e, width: size.width, height: size.height };
      } else {
        return { ...e, width, height };
      }
    });
    files = f;
  };
  const handlePercentage = (event: any) => {
    let percent = event.target.value;
    let f = files.map((e: any) => {
      if (e.customized) return e;
      const _width = e.actual_width * (1 - percent / 100);
      const _height = e.actual_height * (1 - percent / 100);
      const ratio = maintainAspectRatio(
        e.actual_width,
        e.actual_height,
        _width,
        _height
      );
      return {
        ...e,
        width: Math.floor(ratio.width),
        height: Math.floor(ratio.height),
      };
    });
    files = f;
  };
  const downloadAllImages = () => {
    message = {
      message: "Wait until download is complete...",
      variant: "success",
    };
    downloads_list.map((file: any) => {
      window.open(file.file_url, "_self");
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
    <h1>Resize Unlimited and Free Images</h1>
    <p class="d3kc32">
      Total <span>{formatBytes(99999990000000.0, 2, "")} ✔</span> Data Processed
    </p>
    <p>
      If you're looking to resize your images online for your website {WEBSITE_NAME}
      🎉, you've come to the right place. Our image resize tool is perfect for web
      designers, bloggers, and anyone who needs to optimize their images for the
      web 👏. Simply upload your image, select the desired dimensions or file size,
      and our tool will do the rest. you can change the size of every image individually.
    </p>
    <p class="error-box fz12">If your file size is too high, your browser can hang or encounter unexpected errors. Therefore, it is recommended to choose a maximum of 2 or 4 files.</p>
  </div>
  <div class="tools dfc-r ai-s">
    <div class="select-area" />
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
  {#if message}
  <div class="dfc-r mt-5 tool-mess">
      <span class={`${message.variant}-box`}>{message.message}</span>
  </div>
{/if}
  <div class="dfc-r ai-s jc-sb">
    <div class="dfc-c ai-s files-settings">
      {#if files.length === 0}
        <div class="dfc-c no-files-38">
          NO FILES SELECTED
          <br />
          <img src={resizeImageIcon} alt="icon" />
        </div>
      {/if}
      <div
        class="dfc-r add-files-glob-btn"
        on:mousedown={() => {
          document?.querySelector("#file-input")?.click();
        }}
      >
        <span class="dfc-r">{total_files}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          stroke-linecap="round"
          stroke-width="2"
          stroke="#fff"
          fill="none"
          stroke-linejoin="round"
          ><desc>Upload your file and transform it.</desc><path
            d="M10 1.833v16.333"
          /><path d="M1.833 10h16.333" /></svg
        >
      </div>
      <div class="drc-r">
        <div class="dfc-r a138cx">
          <img src={resizeImageIcon} alt="" />
          <span>Resize Options</span>
        </div>
        <input
          type="radio"
          value="1"
          checked={true}
          on:change={() => (byPercent = !byPercent)}
          name="smaller-by"
          id="by-pixles"
        />
        <label for="by-pixles">By Pixles</label>
        <input
          type="radio"
          on:change={() => (byPercent = !byPercent)}
          name="smaller-by"
          id="by-percent"
        />
        <label for="by-percent">By Percentage</label>
      </div>
      {#if byPercent === false}
        <div class="dfc-c ai-s by-pixles">
          <div>
            <input
              type="checkbox"
              name="aspcet-ratio"
              on:change={handleAspectRatio}
              id="aspcet-ratio"
              checked={aspectRatioToggler}
            />
            <label for="aspcet-ratio">Maintain aspect ratio</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={enlargeIfSmaller}
              on:change={handlerEnlargeOption}
              name="not-enlarge"
              id="not-enlarge"
            />
            <label for="not-enlarge">Don't enlarge smaller size image</label>
          </div>
          <br />
          <div class="dfc-r jc-sb input-res">
            <label for="width">Width (px)</label>
            <input
              type="number"
              on:change={(element) => handleSettingsInputs(element, "width")}
              bind:value={width}
              name="width"
              id="width"
            />
          </div>
          <div class="dfc-r jc-sb input-res">
            <label for="height">Height (px)</label>
            <input
              type="number"
              on:change={(element) => handleSettingsInputs(element, "height")}
              bind:value={height}
              name="height"
              id="height"
            />
          </div>
        </div>
      {:else}
        <div class="dfc-r by-percent">
          <label for="percent">Smaller By Percentage</label>
          <input
            type="range"
            min={5}
            max={95}
            bind:value={percentValue}
            on:change={handlePercentage}
            name="percent"
            id="percent"
          />
          <span class="a83cc92">{percentValue}% Smaller</span>
        </div>
      {/if}
      <div class="input-res image-btn-28">
        <button class="dfc-r btn btn-primary" on:click={createForm}>
          RESIZE IMAGES &rarr; <img src={resizeImage} alt="icon" />
        </button>
        <button class="dfc-r btn btn-primary" on:click={() => (files = [])}>
          CLEAR ALL IMAGES
          <img src={clearBrushIcon} alt="icon" />
        </button>
      </div>
    </div>
    <div class="dfc-r ai-s file-view file-resize-view">
      {#if loading_files > 0}
        <div class="loading-wire">
          <div style={`width: ${loading_files}%`} />
          <span>{loading_files}%</span>
        </div>
      {/if}
      {#if files.length === 0 && downloads_list.length === 0}
        <h2 class="dfc-c a83c0-1">
          <img src={arrowDown} alt="arrow" />
          Add Files
        </h2>
      {/if}
      {#if downloads_list.length > 0}
        <div class="dfc-c a83c0-1 a9c22k">
          <button on:click={downloadAllImages} class="btn btn-primary"
            >Download {downloads_list.length > 1
              ? `All ${downloads_list.length} image's`
              : "image"}</button
          >
        </div>
      {/if}
      {#each downloads_list as file}
        <section title={file.output_name}>
          <img src={file.thumbnail} alt="abc" />
          <div class="dfc-c output-a">
            <a href={file.file_url} title="download file" rel="noreferrer"
              >DOWNLOAD</a
            >
            <span>{trimTitle(file.output_name)}</span>
            <div class="dfc-r">
              <div class="dfc-r size-old">
                <span>{file.width}</span>
                <span>&times;</span>
                <span>{file.height}</span>
              </div>
            </div>
          </div>
        </section>
      {/each}
      {#if loading_files === 0}
        {#each files as file, i}
          <section class="dfc-c">
            <button class="dfc-r close-btn" on:click={() => removeFile(i)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                ><polygon
                  fill="#fff"
                  fill-rule="evenodd"
                  points="12 1.208 10.79 0 6 4.792 1.21 0 0 1.208 4.79 6 0 10.792 1.21 12 6 7.208 10.79 12 12 10.792 7.21 6"
                /></svg
              >
            </button>
            <img src={getImageContent(file.content)} alt="cart" />
            <span>{trimTitle(file.content.name)}</span>
            <div class="dfc-r">
              <div class="dfc-r size-old">
                <span>{file.actual_width}</span>
                <span>&times;</span>
                <span>{file.actual_height}</span>
              </div>
              <div class="dfc-r new-old">
                <div class="dfc-c">
                  <label for="width">Width</label>
                  <input
                    type="number"
                    min={5}
                    value={file.width}
                    on:change={(element) =>
                      handleImageInputs(element, i, "width", {
                        width: file.actual_width,
                        height: file.actual_height,
                      })}
                    name="width"
                    id="width"
                  />
                </div>
                <span class="x83343x">&times;</span>
                <div class="dfc-c">
                  <label for="height">Height</label>
                  <input
                    type="number"
                    min={5}
                    value={file.height}
                    name="height"
                    on:change={(element) =>
                      handleImageInputs(element, i, "height", {
                        width: file.actual_width,
                        height: file.actual_height,
                      })}
                    id="height"
                  />
                </div>
              </div>
              {#if file.customized}
                <div class="a999c82">
                  <span>click to remove individual setting.</span>
                  <button
                    class="a999c82"
                    on:click={() => {
                      removeIndividualSetting(i);
                    }}>Remove</button
                  >
                </div>
              {/if}
            </div>
          </section>
        {/each}
      {/if}
    </div>
  </div>
</div>
