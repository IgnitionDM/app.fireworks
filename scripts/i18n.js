function fetchTranslation(language) {
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
