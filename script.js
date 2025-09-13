(function () {
  function playSound(code){
    const allSounds = document.querySelectorAll("audio");
    allSounds.forEach((audio)=>{
      audio.pause();
      audio.currentTime = 0;
    })
    const audio = document.querySelector(`audio[data-key="${code}"]`);
    const key = document.querySelector(`.key[data-key="${code}"]`)

    if (!audio || !key) return;

    audio.currentTime = 0;
    audio.play();
    key.classList.add("playing");
  }

  window.addEventListener("keydown", (event)=>{
    playSound(event.code);
  });

  

  function removeTransition(e) {
    // console.log(e);
    if (e.propertyName != "transform") return;
    // console.log(e.propertyName);
    e.target.classList.remove("playing");
  }

  const keys = document.querySelectorAll(".key");
  // console.log(keys);
  
  keys.forEach((key) => {
    key.addEventListener("click", () => {
      const code = key.getAttribute("data-key");
      playSound(code);
    });

    key.addEventListener("transitionend", removeTransition);
  });

})();

