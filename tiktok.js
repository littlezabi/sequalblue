{
  let idCounter = 0;
  let followers = 0;
  let buttons = [];
  let buttonsLen = 0;

  const init = () => {
    console.log('initializing....')
    buttons = [];
    idCounter = 0;
    buttonsLen = 0;
    let b = document.querySelectorAll("button");
    b.forEach((e) => {
      if (e.innerText === "Follow") buttons.push(e);
    });
    buttonsLen = buttons.length;
  };
  const Follow = () => {
    setInterval(() => {
      const btn = buttons[idCounter];
      try {
        if (btn.innerText === "Follow") {
          btn.scrollIntoView();
          // for(let i = 0; i<100000000;i++){console.log()}
          btn.click();
          console.log("___DONE -> ", idCounter, " total -> ", followers);
          idCounter++;
          followers++;
        }
        if (idCounter >= buttonsLen) {
          throw ''
        }
      } catch (e) {
        if (idCounter >= buttonsLen) {
          document.body.scrollTop = document.body.scrollHeight;
          document.documentElement.scrollTop =
            document.documentElement.scrollHeight;
          init();
        }
      }
    }, 6000);
  };
  init();
  Follow();
}
