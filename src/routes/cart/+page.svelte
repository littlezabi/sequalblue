<script lang="ts">
  import BgColors from "$compo/bg-colors.svelte";
  import Search from "$compo/Search.svelte";
</script>

<BgColors />
<Search />
<div class="page-size cart-view">
  <div class="inner-cart">
    <div class="title-bar" />
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>
      </tfoot>
      <tbody>
        <tr>
          <td>
            <section class="cart-sec">
              <img src="/images/assets/download.png" alt="dasdf" />
              <div>
                <h4 class="title">title here</h4>
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
                  autem?
                </span>
                <button class="remove-btn">Remove</button>
              </div>
            </section>
          </td>
          <td class="fwb">30.00$</td>
          <td>
            <div class="dfc-r q-btn">
                <button>-</button>
                <span>48</span>
                <button>+</button>
            </div>
          </td>
          <td class="fwb">4000$</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

