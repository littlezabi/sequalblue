<script lang="ts">
  import fireIcon from "$lib/assets/fire.svg";
  import moment from "moment";
  import penIcon from "$lib/assets/pen.svg";
  import { setUserCharName } from "$lib/common";
  import { onMount } from "svelte";
  export let post_slug = "";
  export let name = "";
  let inlineMessage: {} | boolean = false;
  let loading: boolean = false;
  let reviews:any = [];
  
  const getComments = async () => {
    const res = await fetch(`/api/reviews?post_slug=${post_slug}`)
      .then((e) => e.json())
      .catch((e) => console.error(e));
      console.log(res)
      reviews = res.reviews
  };
  onMount(()=>{
    getComments()
  })
</script>

<div class="reviews-8293">
  <div class="mobile-title">
    <span class="line-h" />
    <span class="a92yt29b">People Reviews</span>
    <span class="line-h" />
  </div>
  <div class="rev-2832">
    <section>
      <div class="profile">
        <div class="pro-987">
          <img src={fireIcon} alt="fire icon" />
        </div>
      </div>
      <div>
        <div class="a92wqi" id="review-section">
          <p>Add your comment</p>
          <div class="add-review">
            <span class="alert-box cmnt-note">
              text that include any abuse or voilating any rules and regulations
              will be remove and one who does that {"can't"}{" "}
              write comments again for a month or more.
            </span>
            <div class="sign-view review-form">
              <div class="form-view">
                <form autocomplete="off">
                  <div class="flex a90023">
                    <img class="img-3992kda" src={penIcon} alt="pen icon" />
                    <textarea
                      name="review"
                      placeholder="Enter your review..."
                      required
                    />
                  </div>
                  <button type="submit" disabled={loading}>
                    {#if loading === true}
                      <div class="loading-spinner" />
                    {:else}
                      SUBMIT
                    {/if}
                  </button>
                  {#if inlineMessage}
                    <span class={`{inlineMessage.variant}-box review-msg`}>
                      {inlineMessage.message}
                    </span>
                  {/if}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {#each reviews as review}
      <section>
        <div class="profile">
          <div class="pro-987">
            {review.image ? review.image : setUserCharName(review.username)}
          </div>
        </div>
        <div>
          <div class="a92wqi">
            <p class="review-username">
              {review.username}
              <span>
                <picture>
                  <img src="/media/assets/location-icon.svg" alt="" />
                </picture>{" "}
                {review.country}
              </span>
              <span class="a-23">
                {moment(review.createdAt).fromNow()}
              </span>
            </p>

            <div>{review.review}</div>
          </div>
        </div>
      </section>
    {/each}

    <section class="no-trail">
      <div class="profile">
        <div class="pro-987">
          <img src={fireIcon} alt="fire icon" />
        </div>
      </div>
      <div>
        <div class="a92wqi">
          <h5>
            see more companion about <b>{name}</b>
          </h5>
          <div class="review-form">
            <button
              disabled={reviews.length < 1 ? true : false}
              class="btn btn-primary"
            >
              {#if reviews.length < 1}
                No Reviews Found
              {:else}
                Load More
              {/if}
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
