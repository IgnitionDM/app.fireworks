// PWA installation flow
let deferredPrompt;
function installPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      deferredPrompt = null;
    });
  }
}

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  Swal.fire({
    title: "安装移动应用程序?",
    showDenyButton: false,
    showCancelButton: false,
    confirmButtonText: "安装",
    denyButtonText: `取消`,
    allowOutsideClick: () => {
      const popup = Swal.getPopup();
      popup.classList.remove("swal2-show");
      setTimeout(() => {
        popup.classList.add("animate__animated", "animate__headShake");
      });
      setTimeout(() => {
        popup.classList.remove("animate__animated", "animate__headShake");
      }, 500);
      return false;
    },
  }).then((result) => {
    if (result.isConfirmed) {
      installPWA();
    }
  });
});
