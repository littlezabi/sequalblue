<script lang="ts">
  import ArrowDown from "$img/arrow-down.svg";
  import processIcon from "$img/process.png";
  import uploadIcon from "$img/upload.png";
  import { formatBytes, setForm, trimTitle } from "$lib/common";
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
  let buttons: any = data.buttons;
  let message: any = false;
  let selected: any = buttons[0];
  let toggle = false;
  let files: any = [];
  let loading_files: any = [];
  let total_files = 0;
  let session_name = "";
  let selectedSize = 0;
  let extension = data.validExtension;
  const handleSelect = () => (toggle = !toggle);
  function dropHandler(ev: any) {
    dropLeave(ev);
    message = false;
    const files_list: any = [];
    ev.preventDefault();
    let ext = extension;
    if (ext == "image/jpg") ext = "image/jpeg";
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
          if (data.proc_type === "converting" && ext !== item.type) {
            message = {
              message: `Invalid format your image must be (.${
                extension.split("/")[1]
              }) fromat.`,
              variant: "error",
            };
            return 0;
          }
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
          }
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
        if (data.proc_type === "converting" && ext !== file.type) {
          message = {
            message: `Invalid format your image must be (.${
              extension.split("/")[1]
            }) fromat.`,
            variant: "error",
          };
          return 0;
        }
        files_list.push(file);
        selectedSize += file.size;
        total_files += 1;
      });
    }
    sendToTheServer(files_list);
  }
  function dragOverHandler(ev: any) {
    ev.preventDefault();
    ev.target.classList.add("active");
    ev.dataTransfer.dropEffect = "copy";
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
    for (let i = 0; i < f.length; i++) {
      let item = f[i];
      let e =
        item.type === "image/jpeg" && extension === "image/jpg"
          ? "image/jpg"
          : item.type;
      if (e === extension) {
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
        }
      } else {
        message = {
          message: `Invalid format your image must be (.${
            extension.split("/")[1]
          }) fromat.`,
          variant: "error",
        };
      }
    }
    sendToTheServer(files);
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
    if (data.proc_type === "converting") {
      formData.append("image-to", "." + selected.ops.split("-")[2]);
      formData.append("image-from", "." + selected.ops.split("-")[0]);
    }
    let api_url = `${flaskApiBaseUrl}/convert/${data.proc_type}`;
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
      <p>Select image format ✅</p>
      <div
        class="custom-select"
        style={`--button-height: ${35 * buttons.length}px`}
        class:open={toggle}
      >
        <button
          style={`transition: transform 300ms`}
          on:click={() => handleSelect()}
        >
          {selected.name} is selected
          <img src={ArrowDown} alt="arrow down" />
        </button>
        {#each buttons as btn, i}
          {#if selected.ops != btn.ops}
            <a
              href={`/image/${btn.ops}`}
              data-sveltekit-reload
              style={`transition: transform ${(i ? i + 1 : 1) * 250}ms`}
              >{btn.name}</a
            >
          {/if}
        {/each}
      </div>
      <div class="yel-de">
        <h1>{formatBytes(selectedSize)} Selected</h1>
        <span>({selected.name}) is selected</span>
      </div>
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
          <button class="fc922 btn btn-primary">SELECT</button>
          <input
            type="file"
            accept={extension === "image/jpg"
              ? "image/jpeg,image/jpg"
              : extension}
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
  <div class="dfc-r ai-s file-view {data.proc_type === 'inverting' ? 'filter-invert' : ''}">
    {#each files as file}
      <section class="dfc-c" title={file.output_name}>
        <img src={file.thumbnail} alt="abc" />
        <span class="ext-3c">
          {#if data.proc_type === 'compressing'}
            {`${Math.ceil(file.compress_percent - 100)}%`}
            <small>size reduce</small>
          {:else}
            {
              data.proc_type === 'inverting' ? 'inverted' : selected.ops.split("-")[2]
            }
          {/if}
        </span>
        <div class="dfc-c output-a">
          <a href={file.file_url} title="download file" rel="noreferrer"
            >DOWNLOAD</a>
          <span>{trimTitle(file.output_name)}</span>
          <span class="a9cx">{formatBytes(file.output_size)}</span>
        </div>
      </section>
    {/each}
    {#each loading_files as load}
      <section class="dfc-c search-loading loading">
        <span class="load-txt">PROCESSING</span>
        <img src={processIcon} alt="processing" />
      </section>
    {/each}
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
      Image inversion refers to the process of reversing the colors of an image. Inversion can be applied to an entire image or to selected portions of it.
      Inverting an image can be useful for a variety of purposes. For example, it can help to highlight certain details in the image or create a special visual effect.
      convert white color image into black color and black to white and use it in web development and other graphic designing.
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
