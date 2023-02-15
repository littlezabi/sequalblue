<script lang="ts">
  import fireIcon from "$lib/assets/fire.svg";
  import locIcon from "$lib/assets/location.svg";
  import calIcon from "$lib/assets/calendar.png";
  import moment from "moment";
  import penIcon from "$lib/assets/pen.svg";
  import { life, setForm, setUserCharName } from "$lib/common";
  import { onMount } from "svelte";
  import { USER_CONTEXT } from "$lib/context/store";
  import axios from "axios";
  import { add_attribute } from "svelte/internal";
  export let post_slug = "";
  export let name = "";
  let message: {} | boolean = false;
  let loading: boolean = false;
  let reviews: any = [];
  let reviewsCount: number = 0

  const getComments = async () => {
    await axios.get(`/api/reviews?post_slug=${post_slug}`)
      .then((res) => {
        reviews = res.data.reviews;
        reviewsCount = res.data.reviewsCount;
      })
      .catch((e) => console.error(e));
  };
  async function handleMessage(e: any) {
    message = false;
    if ($USER_CONTEXT._id) {
      const review = e.target["review"].value;
      if (review.lenght < 4) {
        message = {
          message: "review must be greater than 3 char",
          variant: "error",
        };
        return 0;
      }
      if (review.lenght < 2) {
        message = {
          message: "Enter minimum 3 characters!",
          variant: "error",
        };
        return 0;
      }
      let _id = $USER_CONTEXT._id;
      let username = $USER_CONTEXT.username;
      let country = $USER_CONTEXT.country;
      axios
        .post(
          "/api/reviews?set-review=1",
          setForm({
            review,
            post_id: post_slug,
            _id,
            username,
            country,
          })
        )
        .then((res) => {
          let y: any = [res.data.reviews, ...reviews];
          e.target["review"].value = "";
          reviewsCount += 1
          message = {
            message: "Successfully added!",
            variant: "success",
          };
          reviews = y;
        })
        .catch((e) => {
          console.error(e);
          message = {
            message:
              e.response?.data?.message ?? "Error occured during processing!",
            variant: "error",
          };
        });
    } else {
      window.location.href = `/sign-in?r=${window.location.href}#review-section`;
      return 1;
    }
  }

  onMount(() => {
    getComments();
  });
</script>

<div class="reviews-8293">
  <div class="dfc-r product-view-title">
    <span class="line-h" />
    <span>PEOPLE REVIEWS  {reviewsCount ? reviewsCount : ''}</span>
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
                <form
                  autocomplete="off"
                  on:submit|preventDefault={handleMessage}
                >
                  <div class="flex a90023">
                    <img class="img-3992kda" src={penIcon} alt="pen icon" />
                    <textarea
                      name="review"
                      placeholder="Enter your review..."
                      required
                    />
                  </div>
                  <button type="submit" on:click={handleMessage} disabled={loading}>
                    {#if loading === true}
                      <div class="loading-spinner" />
                    {:else}
                      SUBMIT
                    {/if}
                  </button>
                  {#if message}
                    <span class="{message.variant}-box review-msg">
                      {message.message}
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
              <span class="dfc-r jc-fs a-23">
                <img src={locIcon} alt="" />
                {" "}
                {review.country}
                <img src={calIcon} alt="" />
                {life(review.createdAt).from()}
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
