<script lang="ts">
  import { viewItem } from "$lib/context/store";
  import axios from "axios";
    let slug = $viewItem.slugList.slice(-1)[0];
    axios.get('/api/data/', {params:{slug,getItems:1}}).then(e => {
        console.log(e.data)
    }).catch(e => {
        console.log('error: ', e)
    })
  // export let items;
  console.log("view", $viewItem);
</script>

<div>
  <div>
    imgage
    <!-- <img src="" alt=""> -->
  </div>
  <div>so here is the image</div>
</div>
<h1>Modal view</h1>

<style lang="scss">
</style>
