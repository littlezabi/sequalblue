let count = 1;
let followed = 0
function GoOn() {
  let interval = setInterval(() => {
    if (followed >= 200) clearInterval(interval);
    let div = `#main-content-homepage_hot > div:nth-child(1) > div:nth-child(${count})`;
    document.querySelector(div).scrollIntoView();
    let button = document.querySelector(`${div} > div > div.tiktok-1hhj6ie-DivTextInfoContainer.etvrc4k7 > button`)
    if(button.innerHTML == 'Follow'){
        button.click()
        console.log(`Done -> ${followed}`);
        followed++
    }
    count++;
  }, 10000);
  console.log("We Are Done!");
}
GoOn();