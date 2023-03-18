<script lang="ts">
  import ArrowDown from "$img/arrow-down.svg";
  import uploadIcon from "$img/upload.png";
  import { formatBytes } from "$lib/common";
  import { WEBSITE_NAME } from "$lib/constants";
  import cartIcon from "$img/cart.svg";
  import homeIcon from "$lib/assets/home.png";
  import userIcon from "$img/user.svg";
  import Search from "$compo/Search.svelte";
  let buttons = [
    { name: "PNG to JPG", ops: "png-to-jpg" },
    { name: "JPG to PNG", ops: "jpg-to-png" },
    { name: "PNG to ICO", ops: "png-to-ico" },
    { name: "Compress PNG Image", ops: "png-compresser" },
    { name: "Compress JPG Image", ops: "jpg-compresser" },
  ];
  let selected = buttons[0];
  let toggle = false;
  let files: any = [];
  let selectedSize = 0;
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
  const removeImage = (name:string)=>{
    alert(name)
  }
  const showImages = () => {
    let dropArea: any = document.querySelector(".file-view");
    dropArea.innerHTML = "";
    for (let i = 0; i < files.length; i++) {
      let fileReader = new FileReader();
      selectedSize += files[i].size;
      fileReader.onload = () => {
        let fileURL = fileReader.result;
        let imgTag = `
                <section class="dfc-c">
                    <button id="remove-image" data-image-name="${files[i].name}">&times;</button>
                    <img src="${fileURL}" alt="image">
                    <div class="dfc-c ai-c">
                        <span>${
                          files[i].name.length > 42
                            ? files[i].name.substring(0, 35) +
                              "....." +
                              files[i].name.substring(
                                files[i].name.length - 7,
                                files[i].name.length
                              )
                            : files[i].name
                        }</span>
                        <span>${formatBytes(files[i].size)}</span>
                    </div>
                </section>
                `;
        dropArea.innerHTML += imgTag;
      };
      fileReader.readAsDataURL(files[i]);
    }
  };
  const handleSelect = (ops: string) => {
    toggle = !toggle;
    if (selected.ops == ops) return 0;
    selected = buttons.filter((e) => e.ops === ops)[0];
  };
  function dropHandler(ev: any) {
    console.log("File(s) dropped");
    ev.preventDefault();
    if (ev.dataTransfer.items) {
      [...ev.dataTransfer.items].forEach((item, i) => {
        if (item.kind === "file" && validExtensions.includes(item.type)) {
          const file = item.getAsFile();
          let isExist = false;
          files.map((f: any) => {
            if (f.name === file.name) {
              isExist = true;
              return 0;
            }
          });
          if (!isExist) files.push(file);
          else alert(`file already exist ${file.name}`);
          console.log(`… file[${i}].name = ${file.name}`);
        } else {
          alert("not valid format");
        }
      });
    } else {
      [...ev.dataTransfer.files].forEach((file, i) => {
        if (validExtensions.includes(file.type)) {
          files.push(file);
          console.log(`… file[${i}].name = ${file.name}`);
        } else {
          alert("not valid format");
        }
      });
    }

    showImages();
  }
  function dragOverHandler(ev: Event) {
    ev.preventDefault();
    //     dropArea.classList.add("active");
    //   dragText.textContent = "Release to Upload File";
  }

  //   dropArea.addEventListener("dragleave", ()=>{
  //   dropArea.classList.remove("active");
  //   dragText.textContent = "Drag & Drop to Upload File";
  // });
</script>
<Search/>

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
    <p class="d3kc32">Total <span>{formatBytes(3834230000000.0, 2, "")} ✔</span> Data Processed</p>
    <p>
      Welcome to {WEBSITE_NAME} Image Converter 🎉, the best online image converter
      tool! Easily convert your images from one format to another with just a few
      clicks. We support all popular image formats, and our advanced algorithms ensure
      that the quality of your images is maintained during conversion 👏. Try us out
      now and experience the convenience of hassle-free image conversion!
    </p>
  </div>
  <div class="tools dfc-r ai-s">
    <div class="select-area">
      <p>Select image format ✅</p>
      <div
        class="custom-select"
        style={`--button-height: ${41 * buttons.length}px`}
        class:open={toggle}
      >
        <button
          style={`transition: transform 300ms`}
          on:click={() => handleSelect(selected.ops)}
        >
          {selected.name}
          <img src={ArrowDown} alt="arrow down" />
        </button>
        {#each buttons as btn, i}
          {#if selected.ops != btn.ops}
            <button
              style={`transition: transform ${(i ? i + 1 : 1) * 250}ms`}
              on:click={() => handleSelect(btn.ops)}>{btn.name}</button
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
      <h3>Select files 👇</h3>
      <div>
        <div
          class="dfc-c drop-zone"
          on:mousedown={() => {
            document?.querySelector("#file-input")?.click();
          }}
          on:drop={dropHandler}
          on:dragover={dragOverHandler}
        >
          <p>Drag one or more files to this <i>drop zone</i>.</p>
          <img src={uploadIcon} alt="upload icon" />
          <span>OR click to select files</span>
          <input type="file" name="" id="file-input" />
        </div>
      </div>
    </div>
  </div>
  <div class="dfc-r ai-s file-view" />
  <div>
    <h1>Here's We Are ❤</h1>
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
  <div>
    <h1>What is image?</h1>
    <p>
      An image is a visual representation of an object, scene, or concept that
      is captured or created using a camera, scanner, or digital device. Images
      can be stored and displayed in various formats, which define how the image
      data is organized and encoded.
    </p>
  </div>
  <div>
    <h1>What is image Formats?</h1>
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
  <div>
    <h1>What's Image Converting?</h1>
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
  <div>
    <h1>Converting image is harmful?</h1>
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
