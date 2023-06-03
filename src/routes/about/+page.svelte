<script lang="ts">
  import github from "$lib/assets/github.svg";
  import youtube from "$lib/assets/youtube.svg";
  import facebook from "$lib/assets/facebook.svg";
  import twitter from "$lib/assets/twitter.svg";
  import BgColors from "../../components/bg-colors.svelte";
  import PageMeta from "$compo/page-meta.svelte";
  import { WEBSITE_NAME, WEBSITE_URL } from "$lib/constants";
</script>
<svelte:head>
  <PageMeta
    title={`About | ${WEBSITE_NAME.toUpperCase()}`}
    description="I'm Zohaib aka LittleZabi full-stack web-developer, computer programmer and computer science student at hazara university battagram campus."
    keywords="Muhammad Zohaib, LittleZaib, littlezabi, zohaib, zohaib jozvi, muhammad zohaib jozvi, blueterminal, littlezabi blueterminal, who's littlezabi, zohaib zabi, blueterminal zohaib"
    createdAt={Date()}
    updatedAt={Date()}
    ogType={"website"}
    articleTags={["web-developer", "python programmer", "AI Engineer", WEBSITE_NAME]}
    image={`${WEBSITE_URL}images/my-image.png`}
    page_url={`${WEBSITE_URL}about`}
  />
</svelte:head>
<BgColors />
<div class="page-size df product-list ">
  <div class="user-det-left">
    <div class="img-container">
      <img src="/images/my-image.png" alt="my" />
    </div>
  </div>
  <div class="user-det-right">
    <h2>LittleZabi</h2>
    <h4>Computer Programmer | Full-stack web-developer</h4>
    <span class="qout">&ldquo;</span>
    <span>
      whats your need? it's suit on you? you are buying correct thing? is this
      your future? answers of these question is must if you want to buy a thing
      and want to be a perfect person.
    </span>
    <span>
      <h3>About me</h3>
      I'm Zohaib aka LittleZabi full-stack web-developer, computer programmer and
      computer science student at hazara university battagram campus. I am the developer
      of this website. I have about
      {new Date().getFullYear() - 2018} years of experience in Development, software
      architecture, and Web Development I created many projects. currently, I am
      working in Blueterminal as a senior Web Developer for 3 years. I love automation
      and I am an expert in automation, therefore, I love Python and its libraries.
      I can create websites in ReactJS, AngularJS, Sveltekit, Django, Flask, NodeJS,
      PHP, Laravel, SQL, MongoDB, etc. I want to learn more and utilize my experience
      in real complex projects. I love to code.
      <h3>What's I Learned since 2015</h3>
      I started programming from 2015 as self learner. my first languages is HTML,
      CSS and JavaScript then for backend i learned php and MySql. in 2016 I learned
      node.js, Mongo DB and start the Python. in 2017 I learned many libraries and
      frameworks of JS and python like Django, flask, React.js and etc. from 2018
      i started to make money. after this I learned many other things like Next.js,
      React Native, Kotlin and finally Svelte. I created this website in sveltekit
      it's very easy and best framework.
    </span>
    <div class="a889ckkwop">
      <a href="/"><img src={github} alt="github" /></a>
      <a href="/"><img src={youtube} alt="youtube" /></a>
      <a href="/"><img src={facebook} alt="facebook" /></a>
      <a href="/"><img src={twitter} alt="twitter" /></a>
    </div>
  </div>
</div>
<br/>
<br/>

<style lang="scss">
  .product-list {
    margin-top: 100px;
    & h3 {
        margin-top: 20px;
      padding: 0;
      font-size: 23px;
      text-transform: capitalize;
    }
  }
</style>
