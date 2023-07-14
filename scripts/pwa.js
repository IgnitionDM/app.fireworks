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
  }).then((result) => {
    if (result.isConfirmed) {
      installPWA();
    }
  });
});
