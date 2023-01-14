<script>
  import cartIcon from "$lib/assets/cart.svg";
  import userIcon from "$lib/assets/user.svg";
  import arrowDown from "$lib/assets/arrow-down.svg";
  import feather from "$lib/assets/feather.svg";
</script>

<header class="">
  <svg
    class="header-bg"
    viewBox="0 0 1366 93"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 41V0L1365.5 1.5V41C1272.5 41 1199.38 86.4601 1170.5 90C1093 99.5 1047.5 71.5 986.5 76C956 78.25 884 90 860 90C824.345 90 785 100.5 695 76C626.295 57.2968 507.5 68.5 474.5 76C422.328 87.8572 366 89.5 322 76C244.085 52.0942 175.5 47.5 123.5 54C47.5986 63.4877 25.1667 40 0 41Z"
      fill="black"
    />
  </svg>
  <nav class="page-size dfc-r  nav">
    <ul class="dfc-r">
      <li class="logo">
        <a href="/" class="fwb">
          <span>Blue</span>
          <img src={feather} alt="feather" />
          <span>Sequal</span>
        </a>
      </li>
    </ul>
    <ul class="dfc-r">
      <li>
        <a class="active" href="/">Collections</a>
      </li>
      <li class="show-on-hover">
        <a class="dfc-r" href="/"
          ><span>Products</span>
          <img class="arrow-down" src={arrowDown} alt="arrow down" /></a
        >
        <div class="on-mouse-hover">
          <div class="nav-trash-modal">
            <ul class="dfc-r">
              <li><a href="/smart-phones">Mobile Phones</a></li>
              <li><a href="/">Laptops Pc's</a></li>
              <li><a href="/">Smart Watches</a></li>
            </ul>
            <ul class="dfc-r">
              <li><a href="/">category a</a></li>
              <li><a href="/">category a</a></li>
              <li><a href="/">category a</a></li>
              <li><a href="/">category a</a></li>
              <li><a href="/">category a</a></li>
              <li><a href="/">category a</a></li>
              <li><a href="/">category a</a></li>
              <li><a href="/">category a</a></li>
              <li><a href="/">category a</a></li>
            </ul>
          </div>
        </div>
      </li>
      <li>
        <a href="/cart" class="dfc-r">
          <img src={cartIcon} alt="cart" />
          <span class="badge danger">99+</span></a
        >
      </li>
      <li class="show-on-hover a889ka-9932">
        <a href="/" class="dfc-r">
            <span class="user dfc-r">
              <img src={userIcon} alt="user" />
              <span class="user-name">Login</span>
            </span>
            <img class="arrow-down" src={arrowDown} alt="arrow down" />
        </a>
        <div class="on-mouse-hover">
          <div class="nav-trash-modal">
            <ul class="dfc-r">
              <li><a href="/profile">Profile</a></li>
              <li><a href="/reset-password">Reset Password</a></li>
              <li><a href="/sign-out">Sign Out</a></li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </nav>
</header>

<style lang="scss">
  .user {
    font-size: 12px;
  }
  .user-name {
    margin-left: 5px;
  }
  .badge.danger {
    position: absolute;
    top: -4px;
    left: 24px;
  }
  a {
    position: relative;
  }
</style>
