// PWA installation flow
let deferredPrompt;
let interactionTimer;
let isUserInteracting = false;

// window.addEventListener("click", handleUserInteraction);
// window.addEventListener("touchstart", handleUserInteraction);
// window.addEventListener("scroll", handleUserInteraction);
// window.addEventListener("wheel", handleUserInteraction);
window.addEventListener("beforeinstallprompt", (e) => {
  deferredPrompt = e;
  startInteractionTimer();
});

function startInteractionTimer() {
  interactionTimer = setTimeout(showPopupMessage, 30000); // 1 minute (60,000 milliseconds)
}

function handleUserInteraction() {
  isUserInteracting = true;
  interactionTimer = setTimeout(setUserInteractionOFF, 10000);
}

function setUserInteractionOFF() {
  isUserInteracting = false;
}

function showPopupMessage() {
  if (!isUserInteracting) {
    Swal.fire({
      title: "安装移动应用程序?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "安装",
      denyButtonText: `取消`,
      // allowOutsideClick: () => {
      //   const popup = Swal.getPopup();
      //   popup.classList.remove("swal2-show");
      //   setTimeout(() => {
      //     popup.classList.add("animate__animated", "animate__headShake");
      //   });
      //   setTimeout(() => {
      //     popup.classList.remove("animate__animated", "animate__headShake");
      //   }, 500);
      //   return false;
      // },
    }).then((result) => {
      if (result.isConfirmed) {
        installPWA();
      }
    });
  }
}

function installPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      deferredPrompt = null;
    });
  }
}
