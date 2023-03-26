<script lang="ts">
  import starFill from "$img/star-filled.png";
  import starHalf from "$img/star-half.png";
  import starEmpty from "$img/star-empty.png";
  export let rating: number = 1;
  export let __style__:string  = '';
  export let show_rating:boolean = false
</script>

<div id="star-rating" class="dfc-r">
  <img style={__style__} src={rating >= 1 ? starFill : rating >= 0.5 ? starHalf : starEmpty} alt="star icon" />
  <img style={__style__} src={rating >= 2 ? starFill : rating >= 1.5 ? starHalf : starEmpty} alt="star icon" />
  <img style={__style__} src={rating >= 3 ? starFill : rating >= 2.5 ? starHalf : starEmpty} alt="star icon" />
  <img style={__style__} src={rating >= 4 ? starFill : rating >= 3.5 ? starHalf : starEmpty} alt="star icon" />
  <img style={__style__} src={rating >= 5 ? starFill : rating >= 4.5 ? starHalf : starEmpty} alt="star icon" />
  {#if show_rating}
    <span>3.31</span>
  {/if}
</div>
