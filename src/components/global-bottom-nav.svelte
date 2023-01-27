<script lang="ts">
  import userIcon from "$lib/assets/user.svg";
  import cartIcon from "$lib/assets/cart.svg";
  let isOpen = false;
  const handleNav = () => {
    isOpen = !isOpen;
  };
</script>

<div class="dfc-r global-nav">
  <div class="nav-32 close" class:open={isOpen}>
    <div class="dfc-r links">
      <a href="/" title="Go to home" class="accs">
        <div class="ccse5x">
          <img src="/images/assets/home.svg" alt="home icon" />
        </div>
      </a>
      <span title="See product categories" class="a993xxkeiw accs">
        <div class="ccse5x">
          <img src="/images/assets/tiles.svg" alt="user icon" />
        </div>
        <div class="on-mouse-hover">
          <div class="dfc-c ai-s nav-trash-modal">
            <a href="/smart-phones">Mobile Phones</a>
            <a href="/computers">Computers</a>
            <a href="/watches">Smart Watches</a>
            <a href="/firmwares">Firmwares</a>
          </div>
        </div>
      </span>
      <a href="/profile" title="See profile">
        <div class="ccse5x">
          <img src={userIcon} alt="user i con" />
        </div>
      </a>
      <a href="/contact" title="Contact with us">
        <div class="ccse5x">
          <img src="/images/assets/aeroplane.svg" alt="user icon" />
        </div>
      </a>
      <a href="/cart" title="See your cart">
        <div class="ccse5x">
          <img src={cartIcon} alt="user icon" />
        </div>
        <span class="badge danger">0</span>
      </a>
    </div>
  </div>
  <button  on:click={handleNav} class="dfc-r dxxx93" class:open={isOpen}>
    <img src="/images/assets/menu.png" alt="menu icon" /></button
  >
</div>
