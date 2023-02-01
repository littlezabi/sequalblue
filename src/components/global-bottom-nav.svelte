<script lang="ts">
  import userIcon from "$lib/assets/user.svg";
  import cartIcon from "$lib/assets/cart.svg";
  import searchIcon from "$lib/assets/search.svg";
  import { goto } from "$app/navigation";
  let isOpen = false;
  let searchField = false;
  const handleNav = () => {
    searchField = false
    isOpen = !isOpen;
  };
  let searchTerm = "";
  const handleSearch = async () => {
    searchField = false
    if(searchTerm === '') return 0
    await goto(`/search/${searchTerm}`);
  };
  const handleSearchTerm = (e) => {
    let t = e.target.value
    searchTerm = t
    if(t === '') searchField = false
  }
</script>

<div class="dfc-r global-nav">
  <div class="nav-32 close" class:open={isOpen}>
    <div class="dfc-r links">
      <a href="/" title="Go to home" class="accs">
        <div class="ccse5x">
          <img src="/images/assets/home.svg" alt="home icon" />
        </div>
      </a>
      <span title="See product categories" class="trap-c9">
        <button on:click={()=>searchField=true} class="ccse5x">
          <img src={searchIcon} alt="search icon" />
        </button>
      </span>
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
    <div class="glob-search" class:open={searchField}>
      <form class="dfc-r" on:submit|preventDefault={handleSearch}>
        <input type="text" placeholder="Search your term or keyword..." on:keyup={handleSearchTerm} name="q" />
        <button type="submit">
          <img src={searchIcon} alt="search icon" />
        </button>
      </form>
    </div>
  </div>
  <button on:click={handleNav} class="dfc-r dxxx93" class:open={isOpen}>
    <img src="/images/assets/menu.png" alt="menu icon" /></button
  >
</div>
