<script>
  import { WEBSITE_NAME } from "$lib/constants";
  import trends from "$lib/assets/trends.svg";
  import cart from "$lib/assets/cart.svg";
  import heart from "$lib/assets/heart.svg";
  import fireIcon from "$lib/assets/fire.svg";
  import new_ from "$lib/assets/new.svg";
  import cartIcon from "$img/cart.svg";
  import homeIcon from "$lib/assets/home.png";
  import userIcon from "$img/user.svg";
  import middlePhoneImage from "$img/middle-phone.png";
</script>
<div class="middle-view">
  <div class="dfc-r mid-links">
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
  <div class="page-size mid-in dfc-r">
    <div class="left dfc-c">
      <h1>
        LOOK AT SPEC'S FIND THE BEST AND BUY WITH
        <span class="s1">CONFIDENCE!</span>
      </h1>
      <div class="dfc-r ml-btn">
        <a href="/world/new" class="dfc-r btn btn-primary">
          What's New! <span class="mod3el3">&rarr;</span>
        </a>
        <a href="/world/new" class="dfc-r btn btn-primary">
          What's The Future
        </a>
      </div>
      <h1 class="mlb2">WE ARE READY FOR THE FUTURE!</h1>
    </div>
    <div class="right">
      <div class="right-links dfc-c">
        <a href="world/popular" title="see most watched"
          ><img src={trends} alt="star icon" /></a
        >
        <a href="world/trends/" title="see trends"
          ><img src={fireIcon} alt="trends" /></a
        >
        <a href="world/loved" title="most loved in world"
          ><img src={heart} alt="hear icon" /></a
        >
        <a href="world/arrivals" title="see new arrivals"
          ><img src={new_} alt="new" /></a
        >
        <a href="/cart" title="see your cart"><img src={cart} alt="cart" /></a>
      </div>
      <svg
        class="svg-terror"
        viewBox="0 0 976 787"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_13_7)">
          <path
            d="M16.5 15L968 17L954.626 713.5C954.626 713.5 661.806 715.719 472.685 762C456.34 766 357.772 785.5 301.306 762C266.964 742.373 231.321 670.5 260.69 544.5C345.884 179 235.633 54.7914 16.5 15Z"
            fill="white"
            class="svg-path-x"
          />
        </g>
        <g filter="url(#filter1_d_13_7)">
          <path
            d="M229.981 15L968 17.0359L957.627 726.034C957.627 726.034 730.505 728.292 583.815 775.404C571.137 779.476 494.684 799.326 450.887 775.404C424.25 755.425 396.604 682.262 419.384 554.001C485.464 181.943 399.949 55.5054 229.981 15Z"
            fill="yellow"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_13_7"
            x="0.5"
            y="4"
            width="975.5"
            height="782.391"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="-4" dy="1" />
            <feGaussianBlur stdDeviation="6" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_13_7"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_13_7"
              result="shape"
            />
          </filter>
          <filter
            id="filter1_d_13_7"
            x="215.981"
            y="0"
            width="752.019"
            height="787"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="-8" dy="-9" />
            <feGaussianBlur stdDeviation="3" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.13 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_13_7"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_13_7"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
      <img src={middlePhoneImage} class="__-mid--38" alt="middle phone" />
    </div>
  </div>
</div>
