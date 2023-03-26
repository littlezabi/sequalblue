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
    minimumFilesAllowInImageTools,
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
  const filesAllowLimit = data.user
    ? maximumFilesAllowInImageTools
    : minimumFilesAllowInImageTools;
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
        ev.dataTransfer.items.length > filesAllowLimit ||
        files.length + 1 > filesAllowLimit
      ) {
        message = {
          message: `Select maximum ${filesAllowLimit} files! <a href="/sign-in"><b>Sign In</b></a> to increase this limit up to ${maximumFilesAllowInImageTools} files`,
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
        ev.dataTransfer.files.length >= filesAllowLimit ||
        files.length + 1 >= filesAllowLimit
      ) {
        message = {
          message: `Select maximum ${filesAllowLimit} files! <a href="/sign-in"><b>Sign In</b></a> to increase this limit up to ${maximumFilesAllowInImageTools} files`,
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
    if (f.length > filesAllowLimit || files.length + 1 > filesAllowLimit) {
      message = {
        message: `Select maximum ${filesAllowLimit} files! <a href="/sign-in"><b>Sign In</b></a> to increase this limit up to ${maximumFilesAllowInImageTools} files`,
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
    total_files -= 1
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
<div class="page-size tools-view resize-view">
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
      Total <span>{formatBytes(data.analytics.processed_data, 2, "")} ✔</span> Data
      Processed
    </p>
    <p>
      If you're looking to resize your images online for your website {WEBSITE_NAME}
      🎉, you've come to the right place. Our image resize tool is perfect for web
      designers, bloggers, and anyone who needs to optimize their images for the
      web 👏. Simply upload your image, select the desired dimensions or file size,
      and our tool will do the rest. you can change the size of every image individually.
    </p>
    <p class="error-box fz12">
      If your file size is too high, your browser can hang or encounter
      unexpected errors. Therefore, it is recommended to choose a maximum of 2
      or 4 files.
    </p>
  </div>
  {#if data.user === false}
    <a href={"/sign-in"} class="user-menu">
      <div class="dfc-r">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          shape-rendering="geometricPrecision"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          ><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" /><path
            d="M10 17l5-5-5-5"
          /><path d="M15 12H3" /></svg
        >
        <span class="user-name">Get Unlimited</span>
      </div>
    </a>
  {/if}
  <div class="tools dfc-r ai-s">
    <div class="select-area" />
    <div class="drop-items">
      <h3>
        Select maximum {filesAllowLimit} files 👇
        {#if data.user == false}
          <a href="/sign-up"
            ><b
              >Login to unlock files upto {maximumFilesAllowInImageTools} files.</b
            ></a
          >
        {/if}
      </h3>
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
  <div class="dfc-r ai-s jc-sb a9c-9923a">
    <div class="dfc-c ai-s files-settings">
      {#if files.length === 0}
        <div
          class="dfc-c no-files-38"
          on:mousedown={() => {
            document?.querySelector("#file-input")?.click();
          }}
        >
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
    {#if message}
      <div class="dfc-r mt-5 tool-mess">
        <span class={`${message.variant}-box`}>{@html message.message}</span>
      </div>
    {/if}
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

<div class="page-size">
  <div class="section-x9">
    <div class="heck92">
      <h1>HELLO THERE! FEEL FREE TO USE OUR TOOLS ❤</h1>
      <div class="dfc-r ai-s">
        <span>1 min 30 sec Read</span>
        <span>&#x2022;</span>
        <span>25 MARCH 2023</span>
        <span>&#x2022;</span>
        <span>{WEBSITE_NAME}</span>
      </div>
    </div>
    <p>
      Welcome to {WEBSITE_NAME} Image Converter, your one-stop solution for all your
      image conversion needs! Our website is dedicated to providing you with a fast
      and efficient way to convert images from one format to another. Whether you
      need to convert a JPEG image to a PNG format with a transparent background,
      or a BMP image to a GIF format for web use, our image converter tool makes
      it easy and hassle-free. With just a few clicks, you can upload your image,
      select the desired output format, and download the converted file. Our image
      converter tool is designed to be user-friendly and intuitive, even for those
      who are not tech-savvy. We support a wide range of image formats, including
      JPEG, PNG, GIF, BMP, and TIFF, and our conversion process is fast and reliable.
      You can also convert multiple images at once, making it easy to process large
      batches of images. At
      {WEBSITE_NAME}, we understand the importance of image quality, which is
      why we use advanced algorithms to ensure that the converted images
      maintain their original quality and resolution. We also prioritize the
      security and privacy of our users, so you can rest assured that your
      images are safe with us. So, if you need to convert images from one format
      to another, look no further than {WEBSITE_NAME}. Try our image converter
      tool today and experience the ease and convenience of hassle-free image
      conversion!
    </p>
  </div>
  <div class="section-x9">
    <div class="heck92">
      <h1>WHAT IS IMAGE?</h1>
      <div class="dfc-r ai-s">
        <span>30 sec Read</span>
        <span>&#x2022;</span>
        <span>23 MARCH 2023</span>
        <span>&#x2022;</span>
        <span>{WEBSITE_NAME}</span>
      </div>
    </div>
    <p>
      An image is a visual representation of an object, scene, or concept that
      is captured or created using a camera, scanner, or digital device. Images
      can be stored and displayed in various formats, which define how the image
      data is organized and encoded.
    </p>
  </div>
  <div class="section-x9">
    <div class="heck92">
      <h1>WHAT IS IMAGE FORMATS?</h1>
      <div class="dfc-r ai-s">
        <span>2 min Read</span>
        <span>&#x2022;</span>
        <span>27 MARCH 2023</span>
        <span>&#x2022;</span>
        <span>{WEBSITE_NAME}</span>
      </div>
    </div>
    <p>
      An image format refers to the specific file type used to store and display
      images. Different image formats have unique characteristics, such as
      compression, quality, transparency, and compatibility, which make them
      suitable for different applications and devices. Some common image formats
      include
    </p>
    <ul>
      <li>
        JPEG (Joint Photographic Experts Group): A widely used compressed image
        format that is ideal for photographs and complex images. JPEG files can
        be small in size while maintaining good quality, but the compression can
        lead to some loss of detail.
      </li>
      <li>
        PNG (Portable Network Graphics): A lossless image format that supports
        transparency and is ideal for graphics and illustrations. PNG files can
        be large in size but offer high quality and sharp edges.
      </li>
      <li>
        GIF (Graphics Interchange Format): A format that supports animated
        images and basic animations. GIF files can have a small size and are
        ideal for simple graphics and animations.
      </li>
      <li>
        BMP (Bitmap): A format that stores image data as a grid of pixels
        without compression. BMP files are large in size but offer high quality
        and are suitable for certain applications and devices.
      </li>
      <li>
        TIFF (Tagged Image File Format): A flexible and high-quality format that
        supports multiple layers, transparency, and compression. TIFF files can
        be large in size but are ideal for professional printing and publishing.
      </li>
    </ul>
    <p>
      Other image formats include PSD (Photoshop Document), PDF (Portable
      Document Format), SVG (Scalable Vector Graphics), and RAW (uncompressed
      image format). The choice of image format depends on the intended use,
      image content, and desired quality and compatibility.
    </p>
  </div>
  <div class="section-x9">
    <div class="heck92">
      <h1>WHAT IS IMAGE INVERSION?</h1>
      <div class="dfc-r ai-s">
        <span>40 sec Read</span>
        <span>&#x2022;</span>
        <span>27 MARCH 2023</span>
        <span>&#x2022;</span>
        <span>{WEBSITE_NAME}</span>
      </div>
    </div>
    <p>
      Image inversion refers to the process of reversing the colors of an image.
      Inversion can be applied to an entire image or to selected portions of it.
      Inverting an image can be useful for a variety of purposes. For example,
      it can help to highlight certain details in the image or create a special
      visual effect. convert white color image into black color and black to
      white and use it in web development and other graphic designing.
    </p>
  </div>
  <div class="section-x9">
    <div class="heck92">
      <h1>WHAT'S IMAGE CONVERSION?</h1>
      <div class="dfc-r ai-s">
        <span>1 min 10 sec Read</span>
        <span>&#x2022;</span>
        <span>26 MARCH 2023</span>
        <span>&#x2022;</span>
        <span>{WEBSITE_NAME}</span>
      </div>
    </div>
    <p>
      Image converting refers to the process of changing the format of an image
      from one type to another. Image files can be stored in various formats,
      such as JPEG, PNG, GIF, BMP, and TIFF, each with its unique
      characteristics, such as file size, compression, color depth, and
      transparency. Image converting enables you to change an image file from
      one format to another, either to optimize it for a particular use or to
      make it compatible with different devices, applications, or web browsers.
      The process of image converting can be performed using specialized
      software, such as Adobe Photoshop or GIMP, or online image conversion
      tools that allow you to upload your image, select the output format, and
      download the converted file. The conversion process typically involves
      re-encoding the image data and modifying its metadata, such as resolution,
      compression, color space, and alpha channel. It is essential to choose the
      right output format for your image, as it can affect its quality,
      compatibility, and file size.
    </p>
  </div>
  <div class="section-x9">
    <div class="heck92">
      <h1>CONVERTING IMAGE IS HARMFUL?</h1>
      <div class="dfc-r ai-s">
        <span>1 min 20 sec Read</span>
        <span>&#x2022;</span>
        <span>21 MARCH 2023</span>
        <span>&#x2022;</span>
        <span>{WEBSITE_NAME}</span>
      </div>
    </div>
    <p>
      No, image converting is not harmful in itself. It is a common and
      necessary process that enables users to convert images from one format to
      another to suit their needs or preferences. The process of image
      converting does not alter the content or data of the image but only
      changes its file format, which can be useful in various scenarios.
      However, it is important to note that some online image conversion tools
      may not be trustworthy or secure, and they may pose a risk to your privacy
      and security. Therefore, it is essential to use reputable and reliable
      image conversion tools and avoid downloading or installing software from
      untrusted sources. It is also recommended to scan your downloaded files
      for viruses or malware before opening them. Moreover, the quality of the
      converted image may be affected by various factors, such as the chosen
      output format, compression level, resolution, and color depth. Therefore,
      it is advisable to choose the right output format and configure the
      conversion settings correctly to avoid losing image quality or introducing
      artifacts or distortions. In summary, image converting is not harmful as
      long as you use trusted and secure conversion tools, take appropriate
      precautions, and choose the right output format and settings for your
      images.
    </p>
  </div>
</div>
