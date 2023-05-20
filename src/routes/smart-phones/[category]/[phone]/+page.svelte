<script lang="ts">
  import type { PageData } from "./$types";
  import { typingAnimations } from "$lib/common";
  import RenderSpecs from "$compo/phone-specs-render.svelte";
  import BgColors from "$compo/bg-colors.svelte";
  import Search from "$compo/Search.svelte";
  import Reviews from "$compo/product-reviews.svelte";
  import RenderItems from "$compo/render-list.svelte";
  import ShareableLinks from "$compo/shareable-links.svelte";
  import BreadCrumb from "$compo/bread-crumb.svelte";
  import StarRating from "$compo/StarRating.svelte";
  import { onMount } from "svelte";
  export let data: PageData;
  $: ({ category, slug, phone, categoryItems } = data);
  onMount(async () => {
    let element: any = document.getElementById("type-here");
    typingAnimations(element);
    console.log(data)
  });
  // export const middleViews = (c: string) => {
  //   try {
  //     if (c === "camera") {
  //       let y = phone?.short_detail["main-camera"];
  //       if (!y || y === "") {
  //         y = phone?.mobile_specs?.filter(
  //           (e: any) => e.name?.toLowerCase() === "network"
  //         );
  //         return y.length > 0 ? y[0].Technology + " Technology | " : "";
  //       }
  //       let u = y.split("mp")[0] + "MP main camera | ";
  //       return u;
  //     } else if (c === "display") {
  //       let y = phone?.mobile_specs?.filter(
  //         (e: any) => e.name.toLowerCase() === "display"
  //       );
  //       if (y.length > 0) return DisplaySizes(y[0].Resolution);
  //       else {
  //         return phone?.brief_scrap["displayPixles"] + " display";
  //       }
  //     } else if (c === "processor") {
  //       let y = phone?.brief_scrap["Chipset"];
  //       y += y === "" ? "" : " fast processor";
  //       if (!y || y === "") {
  //         let k = phone?.brief_scrap["battery"] + " ";
  //         k += phone?.brief_scrap["batteryType"]
  //           ? phone?.brief_scrap["batteryType"] + " powerfull battery"
  //           : " powerfull battery";
  //         return k;
  //       } else {
  //         return y;
  //       }
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  // const data_list = [{'keywords': 'Xiaomi Redmi Note 12S, Xiaomi Redmi Note 12S specs, Xiaomi Redmi Note 12S specification, Xiaomi Redmi Note 12S price, Xiaomi Redmi Note 12S price in pakistan, Xiaomi Redmi Note 12S price in india, Xiaomi Redmi Note 12S price in china, Xiaomi Redmi Note 12S price in turkey, Xiaomi Redmi Note 12S price in iran, Xiaomi Redmi Note 12S price in bangladesh, Xiaomi Redmi Note 12S price in nepal, is Xiaomi Redmi Note 12S good for gaming, what is the RAM of Xiaomi Redmi Note 12S, Xiaomi phones, Xiaomi Redmi Note 12S camera, Xiaomi Redmi Note 12S pictures, '}, {'title': 'Xiaomi Redmi Note 12S'}, {'display': [{'type': 'IPS'}, {'screen': 'IPS LCD, 90Hz'}, {'display height': 6.43}, {'display width': 99.8}, {'screen-to-body': 79.0}, {'screen width': 1080}, {'screen height': 2400}, {'screen ratio': '20:9'}, {'ppi': 409}, {'protection': 'Corning Gorilla Glass 5'}]}, {'comms': [{'wlan': 'Wi-Fi 802.11 a/b/g/n/ac, dual-band'}, {'bluetooth': '5.2, A2DP, LE'}, {'positioning': 'GPS, GLONASS, GALILEO, BDS'}, {'nfc': 'Yes (market/region dependent)'}, {'infrared port': 'Yes'}, {'radio': 'Unspecified'}, {'usb': 'USB Type-C 2.0'}]}, {'network': [{'technology': 'GSM, HSPA, LTE'}, {'2g bands': 'GSM 850, 900, 1800, 1900 - SIM 1 & SIM 2'}, {'3g bands': 'HSDPA 850, 900, 1700(AWS), 1900, 2100'}, {'4g bands': 'LTE'}, {'speed': 'HSPA, LTE-A'}]}, {'platform': [{'os': 'Android 13'}, {'ui': 'MIUI 14'}, {'chipset': 'Mediatek Helio G96 (12 nm)'}, {'cpu': 'Octa-core (2x2.05 GHz Cortex-A76 & 6x2.0 GHz Cortex-A55)'}, {'gpu': 'Mali-G57 MC2'}]}, {'body': [{'height': 76.2, 'width': 165.9, 'thickness': 8.0}, {'weight': 188.0}, {'sim': 'Dual SIM (Nano-SIM, dual stand-by)'}, {'feature': 'IP53, dust and splash resistant'}]}, {'main camera': [{'cameras': ['108 MP, f/1.8, 26mm (wide), 1/1.97", 0.7µm, PDAF', '8 MP, f/2.2, 118˚ (ultrawide), 1/4.0", 1.12µm', '2 MP, f/2.4, (macro)']}, {'features': 'LED flash, HDR, panorama'}, {'video': '1080p@30fps'}]}, {'launch': [{'announced': '06 March 2023'}, {'available': '26 April 2023'}]}, {'memory': [{'card slot': 'microSDXC'}, {'internal': '64GB 6GB RAM, 128GB 6GB RAM, 256GB 8GB RAM'}]}, {'selfie camera': [{'single': '12 MP'}, {'video': '1080p@30fps'}]}, {'sound': [{'loudspeaker': 'Yes, with stereo speakers'}, {'3.5mm jack': 'Yes'}]}, {'features': [{'sensors': 'Fingerprint (side-mounted), accelerometer, gyro, compass'}, {'feature': 'Virtual proximity sensing'}]}, {'battery': [{'type': 'Li-Po 5000 mAh, non-removable'}, {'charging': '33W wired'}]}, {'misc': [{'colors': 'Onyx Black, Ice Blue, Pearl Green'}, {'price': '$249.99'}]}]
  // const data_list = [
  //   {
  //     keywords:
  //       "Xiaomi Redmi Note 12S, Xiaomi Redmi Note 12S specs, Xiaomi Redmi Note 12S specification, Xiaomi Redmi Note 12S price, Xiaomi Redmi Note 12S price in pakistan, Xiaomi Redmi Note 12S price in india, Xiaomi Redmi Note 12S price in china, Xiaomi Redmi Note 12S price in turkey, Xiaomi Redmi Note 12S price in iran, Xiaomi Redmi Note 12S price in bangladesh, Xiaomi Redmi Note 12S price in nepal, is Xiaomi Redmi Note 12S good for gaming, what is the RAM of Xiaomi Redmi Note 12S, Xiaomi phones, Xiaomi Redmi Note 12S camera, Xiaomi Redmi Note 12S pictures, ",
  //   },
  //   { title: "Xiaomi Redmi Note 12S" },
  //   {
  //     display: [
  //       { type: "IPS" },
  //       { screen: "IPS LCD, 90Hz" },
  //       { "display height": 6.43 },
  //       { "display width": 99.8 },
  //       { "screen-to-body": 79.0 },
  //       { "screen width": 1080 },
  //       { "screen height": 2400 },
  //       { "screen ratio": "20:9" },
  //       { ppi: 409 },
  //       { protection: "Corning Gorilla Glass 5" },
  //     ],
  //   },
  //   {
  //     comms: [
  //       { wlan: "Wi-Fi 802.11 a/b/g/n/ac, dual-band" },
  //       { bluetooth: "5.2, A2DP, LE" },
  //       { positioning: "GPS, GLONASS, GALILEO, BDS" },
  //       { nfc: "Yes (market/region dependent)" },
  //       { "infrared port": "Yes" },
  //       { radio: "Unspecified" },
  //       { usb: "USB Type-C 2.0" },
  //     ],
  //   },
  //   {
  //     network: [
  //       { technology: "GSM, HSPA, LTE" },
  //       { "2g bands": "GSM 850, 900, 1800, 1900 - SIM 1 & SIM 2" },
  //       { "3g bands": "HSDPA 850, 900, 1700(AWS), 1900, 2100" },
  //       { "4g bands": "LTE" },
  //       { speed: "HSPA, LTE-A" },
  //     ],
  //   },
  //   {
  //     platform: [
  //       { os: "Android 13" },
  //       { ui: "MIUI 14" },
  //       { chipset: "Mediatek Helio G96 (12 nm)" },
  //       { cpu: "Octa-core (2x2.05 GHz Cortex-A76 & 6x2.0 GHz Cortex-A55)" },
  //       { gpu: "Mali-G57 MC2" },
  //     ],
  //   },
  //   {
  //     body: [
  //       { dimensions: "165.9 x 76.2 x 8 mm (6.53 x 3.00 x 0.31 in)" },
  //       { weight: "188 g (6.63 oz)" },
  //       { sim: "Dual SIM (Nano-SIM, dual stand-by)" },
  //       { feature: "IP53, dust and splash resistant" },
  //     ],
  //   },
  //   {
  //     "main camera": [
  //       {
  //         cameras: [
  //           '108 MP, f/1.8, 26mm (wide), 1/1.97", 0.7µm, PDAF',
  //           '8 MP, f/2.2, 118˚ (ultrawide), 1/4.0", 1.12µm',
  //           "2 MP, f/2.4, (macro)",
  //         ],
  //       },
  //       { features: "LED flash, HDR, panorama" },
  //       { video: "1080p@30fps" },
  //     ],
  //   },
  //   {
  //     launch: [{ announced: "06 March 2023" }, { available: "26 April 2023" }],
  //   },
  //   {
  //     memory: [
  //       { "card slot": "microSDXC" },
  //       { internal: "64GB 6GB RAM, 128GB 6GB RAM, 256GB 8GB RAM" },
  //     ],
  //   },
  //   { "selfie camera": [{ single: "12 MP" }, { video: "1080p@30fps" }] },
  //   {
  //     sound: [
  //       { loudspeaker: "Yes, with stereo speakers" },
  //       { "3.5mm jack": "Yes" },
  //     ],
  //   },
  //   {
  //     features: [
  //       { sensors: "Fingerprint (side-mounted), accelerometer, gyro, compass" },
  //       { feature: "Virtual proximity sensing" },
  //     ],
  //   },
  //   {
  //     battery: [
  //       { type: "Li-Po 5000 mAh, non-removable" },
  //       { charging: "33W wired" },
  //     ],
  //   },
  //   {
  //     misc: [
  //       { colors: "Onyx Black, Ice Blue, Pearl Green" },
  //       { price: "$249.99" },
  //     ],
  //   },
  // ];
  const top_header = ['Helio G96 chip', '108MP main camera', 'IPS 1080p FHD display', 'Android 13 MIUI 14', '5000mAh battery']
  const data_list = {'keywords': 'Xiaomi Redmi Note 12S, Xiaomi Redmi Note 12S specs, Xiaomi Redmi Note 12S specification, Xiaomi Redmi Note 12S price, Xiaomi Redmi Note 12S price in pakistan, Xiaomi Redmi Note 12S price in india, Xiaomi Redmi Note 12S price in china, Xiaomi Redmi Note 12S price in turkey, Xiaomi Redmi Note 12S price in iran, Xiaomi Redmi Note 12S price in bangladesh, Xiaomi Redmi Note 12S price in nepal, is Xiaomi Redmi Note 12S good for gaming, what is the RAM of Xiaomi Redmi Note 12S, Xiaomi phones, Xiaomi Redmi Note 12S camera, Xiaomi Redmi Note 12S pictures, ', 'title': 'Xiaomi Redmi Note 12S', 'display': [{'type': 'IPS'}, {'screen': 'IPS LCD, 90Hz'}, {'display height': 6.43}, {'display width': 99.8}, {'screen-to-body': 79.0}, {'screen width': 1080}, {'screen height': 2400}, {'screen ratio': '20:9'}, {'ppi': 409}, {'protection': 'Corning Gorilla Glass 5'}], 'comms': [{'wlan': 'Wi-Fi 802.11 a/b/g/n/ac, dual-band'}, {'bluetooth': '5.2, A2DP, LE'}, {'positioning': 'GPS, GLONASS, GALILEO, BDS'}, {'nfc': 'Yes (market/region dependent)'}, {'infrared port': 'Yes'}, {'radio': 'Unspecified'}, {'usb': 'USB Type-C 2.0'}], 'network': [{'technology': 'GSM, HSPA, LTE'}, {'2g bands': 'GSM 850, 900, 1800, 1900 - SIM 1 & SIM 2'}, {'3g bands': 'HSDPA 850, 900, 1700(AWS), 1900, 2100'}, {'4g bands': 'LTE'}, {'speed': 'HSPA, LTE-A'}], 'platform': [{'os': 'Android 13'}, {'ui': 'MIUI 14'}, {'chipset': 'Mediatek Helio G96 (12 nm)'}, {'cpu': 'Octa-core (2x2.05 GHz Cortex-A76 & 6x2.0 GHz Cortex-A55)'}, {'gpu': 'Mali-G57 MC2'}], 'body': [{'dimensions': '165.9 x 76.2 x 8 mm \n6.53 x 3.00 x 0.31 inches'}, {'weight': '188 g (6.63 oz)'}, {'sim': 'Dual SIM (Nano-SIM, dual stand-by)'}, {'feature': 'IP53, dust and splash resistant'}], 'main camera': [{'cameras': ['108 MP, f/1.8, 26mm (wide), 1/1.97", 0.7µm, PDAF', '8 MP, f/2.2, 118˚ (ultrawide), 1/4.0", 1.12µm', '2 MP, f/2.4, (macro)']}, {'features': 'LED flash, HDR, panorama'}, {'video': '1080p@30fps'}], 'launch': [{'announced': '06 March 2023'}, {'available': '26 April 2023'}], 'memory': [{'card slot': 'microSDXC'}, {'internal': '64GB 6GB RAM, 128GB 6GB RAM, 256GB 8GB RAM'}], 'selfie camera': [{'single': '12 MP'}, {'video': '1080p@30fps'}], 'sound': [{'loudspeaker': 'Yes, with stereo speakers'}, {'3.5mm jack': 'Yes'}], 'features': [{'sensors': 'Fingerprint (side-mounted), accelerometer, gyro, compass'}, {'feature': 'Virtual proximity sensing'}], 'battery': [{'type': 'Li-Po 5000 mAh, non-removable'}, {'charging': '33W wired'}], 'misc': [{'colors': 'Onyx Black, Ice Blue, Pearl Green'}, {'price': '$249.99'}], 'description': 'Get the Xiaomi Redmi Note 12S with 108 MP camera, Li-Po 5000 mAh battery, and 33W wired fast charging. Available in Onyx Black, Ice Blue, and Pearl Green. Buy now for $249.99.', 'views': 1833649, 'loves': 2548, 'rating': 4.7, 'category': 'xiaomi', 'slug': 'xiaomi-redmi-note-12s', 'original': 'https://www.gsmarena.com/samsung_galaxy_a02-10708.php'}
  
</script>

<BgColors class_="mt180-c3" />
<div class="product-view fade-in">
  <div class="product-top">
    <div class="suc82">
      <img src={phone.image} alt={"background image"} />
    </div>
    <Search />
    <BreadCrumb
      urls={[
        { name: "phones", url: "/smart-phones/" },
        { name: category, url: `/smart-phones/${category}`, disabled: false },
        {
          name: phone.name,
          url: `/smart-phones/${category}/${slug}`,
          disabled: true,
        },
      ]}
    />
    <div class="ur9xl a-ck2 dfc-r">
      <div class="dfc-r left">
        <ShareableLinks
          fox={{
            slug,
            hits: phone.hits,
            fans: phone.fans,
            popularity: phone.popularity,
          }}
        />
        <div class="left-image">
          <img
            src={phone?.image}
            title={phone?.name}
            alt={phone?.name}
            class="layer"
          />
        </div>
      </div>
      <div class="mid">
        <h2>
          {phone?.name}
        </h2>
        <h3 id="type-here">
          {phone?.subtitle}
        </h3>
        {#if top_header[0]}
          <h5>
              {top_header[0]}{top_header[1] ? ' | ' + top_header[1] : ''}
          </h5>
        {/if}
        {#if top_header[2]}
          <h5>
              {top_header[2] ? top_header[2] : ''}{top_header[3] ? ' | ' + top_header[3] : ''}
          </h5>
        {/if}
        {#if top_header[4]}
          <h5>
            {top_header[4] ? top_header[4] : ''}{top_header[5] ? ' | ' + top_header[5] : ''}
          </h5>
        {/if}
        <div class="dfc-r jc-fs d-rating">
          <StarRating rating={phone.popularity} />
          <span class="fwb">{phone.popularity} average rating</span>
        </div>
      </div>
      <div class="dfc-c right">
        <div class="dfc-r">
          <section>
            <img
              src="/images/calendar.png"
              alt="release date"
              title="Phone Release date"
            />
            <div>
              <p>Release date</p>
              {#if data_list.launch.length}
                {#each data_list.launch as element}
                  <span>
                      {Object.keys(element)} {element[Object.keys(element)]}
                  </span>
                {/each}
              {:else}
                  {new Date(1683889798784).toDateString()}
              {/if}
            </div>
          </section>
          <section>
            <img
              src="/images/phone.png"
              alt="phone body"
              title="phone body information"
            />
            <div>
              <p>Mobile Phone</p>
              {#if data_list.body.length}
                {#each data_list.body[0][Object.keys(data_list.body[0])[0]].split('\n') as e} <!--getting first element and spliting with \n to get 2nd line-->
                  <span>{e}</span><br>
                {/each}
              {:else}
                  <span>209.8 g (7.41 oz)</span>
              {/if}
            </div>
          </section>
          <section>
            <img src="/images/terminal.png" alt="" />
            <div>
              <p>System Information</p>
              {#if data_list.platform[0]}<span>{data_list.platform[0][Object.keys(data_list.platform[0])]},</span>{/if}
              {#if data_list.platform[1]}
                <br>
                <span>
                  {data_list.platform[1][Object.keys(data_list.platform[1])]}
                </span>
              {/if}
              {#if data_list.platform.length < 1}<span>Modernized os,</span>{/if}
              {#if data_list.platform.length < 2}<br><span>flexible pure UI</span>{/if}
            </div>
          </section>
          <section>
            <img
              src="/images/chip.png"
              alt="mobile chip"
              title="mobile chip info"
            />
            <div>
              <p>Phone Memory</p>
              {#if data_list.memory.length}
                {#each data_list.memory as element}
                    <span>{element[Object.keys(element)[0]].substring(0, 27)}...</span><br/>
                {/each}
              {:else}<span>Enough Storage/Memory</span>{/if}
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
  <div class="mobile-middle">
    <div class="page-size">
      <div class="specifications">
        <div class="dfc-r product-view-title">
          <span class="line-h" />
          <span>SPECIFICATIONS</span>
          <span class="line-h" />
        </div>
        <div class="dfc-r uaweluef">
          <RenderSpecs items={data_list} />
        </div>

        <section class="a9kcazka ternart ternart-c spec-desc">
          <h2>About {phone?.name}</h2>
          <p>
          <span class="u---88323">{phone?.subtitle}</span>
          {phone.description}
          </p>
        </section>
      </div>
      <div class="mobile-pricing a8j3c">
        <Reviews post_slug={phone.slug} name={phone?.name} />
      </div>
      <div class="dfc-r mt25 product-view-title">
        <span class="line-h" />
        <span style="text-transform:capitalize;">More {category} Phones</span>
        <span class="line-h" />
      </div>
      <div class="dfc-r main-items-view">
        <div class="dfc-r main-89kckk">
          <div class="dfc-r main-item-left">
            <RenderItems
              items={categoryItems}
              base_url="/smart-phones/{category}"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<BgColors class_="mt--1000" />
