function showInstallPromo() {
  const installPopup = document.getElementById("install-popup");
  installPopup.style.display = "flex";
  installPopup.style.justifyContent = "center";
  installPopup.style.alignItems = "center";
  installPopup.style.height = "100vh";
  installPopup.style.background = "#5900b3";
  // installPopup.style.backgroundImage =
  //   "url('images/yunshangtong2021412131628/202141214534.jpg')";
  //   installPopup.style.backgroundSize = "100% auto";
  // installPopup.style.backgroundSize = "cover";

  const installButton = document.getElementById("install-btn");
  installButton.addEventListener("click", installPWA);

  // const cancelButton = document.getElementById("cancel-btn");
  // cancelButton.addEventListener("click", cancelInstall);
}

function installPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      // if (choiceResult.outcome === "accepted") {
      //   console.log("PWA installation accepted");
      // } else {
      //   console.log("PWA installation dismissed");
      // }
      deferredPrompt = null;
      hideInstallPromo();
    });
  }
}

// function cancelInstall() {
//   deferredPrompt = null;
//   hideInstallPromo();
// }

function hideInstallPromo() {
  const installPopup = document.getElementById("install-popup");
  installPopup.style.display = "none";

  const mainContent = document.getElementById("main-content");
  mainContent.style.display = "block";
}

let deferredPrompt;
let installSource;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallPromo();
});
