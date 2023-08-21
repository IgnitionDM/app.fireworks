function fetchTranslation(language) {
  updateImageSource(language);
  fetch(`i18n/${language}.json`)
    .then((response) => response.json())
    .then((translation) => {
      applyTranslation(translation);
    });
}

function applyTranslation(translation) {
  const elementsToTranslate = document.querySelectorAll("[data-translate]");
  elementsToTranslate.forEach((element) => {
    const translationKey = element.getAttribute("data-translate");
    const translationValue = getTranslationValue(translationKey, translation);
    if (translationValue) {
      if (translationKey === "search.placeholder") {
        element.setAttribute("placeholder", translationValue);
      } else {
        element.textContent = translationValue;
      }
    }
  });
}

function updateImageSource(language) {
  const img1 = document.getElementById("banner-body-translate");
  const img2 = document.getElementById("banner-header1-translate");
  const img3 = document.getElementById("banner-header2-translate");

  if (img1) {
    const img1Name =
      language === "ch" ? "Pyrotechnics-01-ch.png" : "Pyrotechnics-01.png";
    img1.src = `images/pyrotechnics20230802/${img1Name}`;
  }

  if (img2) {
    const img2Name =
      language === "ch" ? "Pyrotechnics-03-ch.png" : "Pyrotechnics-03.png";
    img2.src = imagePath = `images/pyrotechnics20230802/${img2Name}`;
  }

  if (img3) {
    const img3Name =
      language === "ch" ? "Pyrotechnics-08-ch.png" : "Pyrotechnics-08.png";
    img3.src = `images/pyrotechnics20230802/${img3Name}`;
  }
}

function getTranslationValue(key, translationData) {
  const keys = key.split(".");
  let value = translationData;

  keys.forEach((nestedKey) => {
    value = value[nestedKey];
  });

  return value;
}

// Check if there's a saved language in local storage and set the select box accordingly
document.addEventListener("DOMContentLoaded", function () {
  const languageSelect = document.getElementById("languageSelect");
  const savedLanguage = localStorage.getItem("selectedLanguage");

  if (savedLanguage) {
    if (languageSelect) {
      languageSelect.value = savedLanguage;
    }

    fetchTranslation(savedLanguage);
  } else {
    languageSelect.value = "en";
    localStorage.setItem("selectedLanguage", "en");
  }
});
