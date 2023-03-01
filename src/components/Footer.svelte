<script>
  import { WEBSITE_NAME } from "$lib/constants";
  import logoIcon from "$img/logo.png";
  import github from "$lib/assets/github.svg";
  import youtube from "$lib/assets/youtube.svg";
  import facebook from "$lib/assets/facebook.svg";
  import twitter from "$lib/assets/twitter.svg";
</script>

<footer>
  <div class="page-size">
    <div class="dfc-r ai-s jc-fs">
      <section>
        <div class="dfc-c ai-s left-x3x">
          <img src={logoIcon} alt="logo" />
          <span class="fz12">WE ARE READY FOR THE FUTURE!</span>
          <span class="c824c"
            >Stay ahead of the curve and know before you buy with {WEBSITE_NAME}.</span
          >
          <div class="c824c">
            <a href="https://github.com/LittleZabi" rel="noopener"><img class="invert" src={github} alt="github" /></a>
            <a href="https://www.youtube.com/channel/UCMJTfB8cZLxjvUht3o0E3qQ" rel="noopener"><img class="invert" src={youtube} alt="youtube" /></a>
            <a href="https://web.facebook.com/zohaibjozvi/about_contact_and_basic_info"><img class="invert" src={facebook} alt="facebook" /></a>
            <a href="https://twitter.com/Little_Zabi_" rel="noopener"><img class="invert" src={twitter} alt="twitter" /></a>
          </div>
          <div class="c824c">
            <p>
              Copyright &copy; {new Date().getFullYear()}. {WEBSITE_NAME} Services
            </p>
            <p>
              <a href="/privacy-policy" title="privacy policy">Privacy Policy</a
              >
              | <a href="/sitemap" title="privacy policy">Site Map</a>
            </p>
          </div>
        </div>
      </section>
      <section>
        <div class="dfc-c ai-s links">
          <span>COMPANY</span>
          <a href="/about">About</a>
          <a href="https://www.youtube.com/channel/UCMJTfB8cZLxjvUht3o0E3qQ" rel="noopener">Blueterminal</a>
          <a href="/contact">Contact us</a>
        </div>
      </section>
      <section>
        <div class="dfc-c ai-s links">
          <span>PRODUCTS</span>
          <a href="/smart-phones">Smart Phones</a>
          <a href="/watches">Smart Watches</a>
          <a href="/computers">Desktop & Laptops Pc</a>
          <a href="/firmwares">Mobile Firmwares</a>
        </div>
      </section>
      <section>
        <div class="dfc-c ai-s links">
          <span>FIND OUT</span>
          <a href="/blogs" title="blogs page">Blogs</a>
          <a href="/search" title="Search page">Search</a>
          <a href="/sign-in" title="sign in page">Sign in</a>
          <a href="/cart" title="your cart">Home</a>
        </div>
      </section>
      <section>
        <div class="dfc-c ai-s links">
          <span>AIM</span>
          <p>
            What is your need? Is it suitable for you? Are you buying the
            correct thing? Is this something you will use in your future?
            Answering these questions is crucial if you want to make a wise
            purchase and become a responsible consumer. therefore stay with us.
          </p>
        </div>
      </section>
    </div>
  </div>
</footer>
