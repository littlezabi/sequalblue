<script lang="ts">
  import { ANNOUNCMENTS } from "$lib/context/store";
</script>

<div>
  {@html $ANNOUNCMENTS.title}
</div>
<div>{@html $ANNOUNCMENTS.body}</div>
<div><img class="modal-ann-img-1" src={$ANNOUNCMENTS.image} alt="announcment" /></div>
