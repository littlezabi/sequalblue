<script lang="ts">
  import { onMount } from "svelte";

  export let class_: string = "";
  onMount(() => {
    var container = document.querySelector(".in-page-modals");
    function centerElement(element: any) {
      var container = element.parentNode;
      var containerWidth = container.offsetWidth;
      var elementWidth = element.offsetWidth;
      var elementLeft = element.offsetLeft;
      var scrollLeft = elementLeft - (containerWidth - elementWidth) / 2;
      return scrollLeft;
    }

    function smoothScrollLeft(
      container: any,
      targetPosition: number,
      duration: number
    ) {
      const startPosition = container.scrollLeft;
      const distance = targetPosition - startPosition;
      const startTime = performance.now();
      function scroll(timestamp: number) {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easing = easeInOutQuad(progress);
        container.scrollLeft = startPosition + distance * easing;
        if (progress < 1) {
          window.requestAnimationFrame(scroll);
        }
      }
      function easeInOutQuad(t: number) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      }
      window.requestAnimationFrame(scroll);
    }
    const duration = 1000;
    const elements = document.querySelectorAll(".in-page-modals .modal-y-2");
    let i = 0;
    setInterval(() => {
      smoothScrollLeft(container, i > 0 ? centerElement(elements[i]) - 23 : 10, duration);
      i++;
      if (i >= elements.length) i = 0;
    }, 3000);
  });
</script>

<div class="page-size modal-outside">
  <div class="in-page-modals {class_}">
    <div class="modal-y-2">
      <span class="title">Subscribe with us to get more 👇</span>
      <span class="sub-text">
        Get the latest News and Updates right now. Enter your email address and
        subscribe to get email notifications and other features ✔
      </span>
      <div class="mt25">
        <input type="email" placeholder="Your email address" />
        <button class="btn-x">SUBSCRIBE</button>
      </div>
    </div>
    <div class="modal-y-2">
      <span class="title">NEED YOUR HELP! 👻</span>
      <span class="sub-text"
        >This website launched recently we providing best experience. we trying
        to remove bug's and other unwanted things and add new features here.
        please give us a feedback so we can upgrade our services. Thanks"</span
      >
      <div class="mt25">
        <a
          class="btn-x"
          style="margin-right:10px;"
          href="/contact"
          title="feedback form">GIVE A FEEDBACK ✔</a
        >
      </div>
    </div>
    <div class="modal-y-2">
      <span class="title">Learn How To Code!🎀</span>
      <span class="sub-text">
        The ultimate destination for mastering binary coding techniques. As a
        professional programmer, I share my knowledge and expertise in simple
        binary language on blueterminal. Whether you're a beginner or an
        advanced programmer, you'll find valuable resources and tutorials to
        help you improve your skills. Join me and learn to code like a pro! 💞
      </span>
      <div class="mt25">
        <a
          class="btn-x"
          style="margin-right:10px;"
          rel="noreferrer"
          href="https://www.youtube.com/@blueterminal"
          target="_blank"
          title="feedback form">SUBSCRIBE BLUETERMINAL ▶</a
        >
      </div>
    </div>
  </div>
</div>
