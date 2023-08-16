function generateProductHTML(product) {
  const defaultImage = "images/pyrotechnics20230802/product-placeholder.png";
  const imageUrl =
    product.image && product.image.trim() !== ""
      ? `images/pyrotechnics20230802/${product.tags[0]}/${product.image}`
      : defaultImage;

  let productName;
  const savedLanguage = localStorage.getItem("selectedLanguage");
  switch (savedLanguage) {
    case "ch":
      productName = product.chinese;
      break;
    default:
      productName = product.english;
      break;
  }

  var html = `
      <div class="item" style="margin-bottom: 12px; box-shadow: 0 0 7px rgba(0, 0, 0, 0.2);">
        <div class="gd_li" id="product${product.id}">
          <a href="product_xq.html?id=${product.id}">
            <div class="pro_bg" style="background: url('images/pyrotechnics20230802/product-bg.png') no-repeat; background-size: 100%;">
                <img style="opacity: 0.7" class="img" mode="widthFix" src="${imageUrl}" />
            </div>
          </a>
          <span class="dh_overpro gd_li_title">
            ${productName}
          </span>
          <div class="params" style="overflow: hidden">    
                  
            <span class="gd_li_txt">
              <span class="dot" style="background: #ff4361"></span>
                SKU：${product.sku}
            </span>

            <span class="gd_li_txt">
              <span class="dot" style="background: #ff4361"></span>
                Spec / Packaging：${product.packaging}
            </span>

          </div>
          <div class="goods_an">
          ${
            product.video && product.video.trim() !== ""
              ? `
          <a href="video.html?video=${encodeURIComponent(
            product.video
          )}" class="goods_anzuo" style="background: ">
            <img src="images/pro_bo.png" /><span data-translate="productDetail.video">Video</span>
          </a>
        `
              : ""
          }
            <a href="product_xq.html?id=${product.id}" class="goods_anyou">
              <img src="images/pro_xx.png" /><span data-translate="productDetail.details">Details</span>
            </a>
          </div>
        </div>
      </div>
      <strong></strong>
    `;

  return html;
}

function generateSearchTagHTML(title) {
  const newElement = document.createElement("div");
  newElement.setAttribute("onclick", "window.location='product.html';");
  newElement.classList.add("ttitle");
  newElement.style.background =
    "linear-gradient(to right, rgba(255, 0, 62, 1) 0%, rgba(253, 15, 111, 1) 0%, rgba(255, 0, 62, 1) 100%)";

  const anchorElement = document.createElement("a");
  anchorElement.style.cursor = "pointer";
  anchorElement.textContent = title;

  const closeButton = document.createElement("span");
  closeButton.textContent = "×";

  anchorElement.appendChild(closeButton);
  newElement.appendChild(anchorElement);

  return newElement;
}

function cleanString(query) {
  return query.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, " ");
}

function hasMatch(text, cleanedQuery) {
  return text.replace(/[^a-zA-Z0-9\s]/g, " ").includes(cleanedQuery);
}

function searchProducts(products, query) {
  const cleanedQuery = cleanString(query);

  return products.filter((product) => {
    const englishMatch = hasMatch(cleanString(product.english), cleanedQuery);
    const chineseMatch = hasMatch(product.chinese, cleanedQuery);
    const tagsMatch = product.tags.some((tag) =>
      tag.toLowerCase().includes(cleanedQuery)
    );

    return englishMatch || chineseMatch || tagsMatch;
  });
}

function renderProductList(products) {
  const productContainer = document.getElementById("productContainer");
  const productCountElement = document.getElementById("productCount");
  const productHeader = document.getElementById("productHeader");
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const query = urlParams.get("k");
  let listProducts;

  if (query !== null) {
    listProducts = searchProducts(products, query);
    productCountElement.innerHTML = listProducts.length;

    var tagHTML = generateSearchTagHTML(query);
    productHeader.prepend(tagHTML);
  } else {
    listProducts = products;
    productCountElement.innerHTML = listProducts.length;
  }

  listProducts.forEach(function (product) {
    var productHTML = generateProductHTML(product);
    productContainer.innerHTML += productHTML;
  });
}

function fetchProductsFromJsonFile(jsonFileUrl) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", jsonFileUrl, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const products = JSON.parse(xhr.responseText);
          resolve(products);
        } else {
          reject(new Error("Error fetching products: " + xhr.status));
        }
      }
    };
    xhr.send();
  });
}

// function fetchAllProducts() {
//   const adultProductsUrl = "data/adult-inv.json";
//   const kidProductsUrl = "data/kid-inv.json";

//   return Promise.all([
//     fetchProductsFromJsonFile(adultProductsUrl),
//     fetchProductsFromJsonFile(kidProductsUrl),
//   ]).then(([adultProducts, kidProducts]) => {
//     const allProducts = [...adultProducts, ...kidProducts];
//     return allProducts;
//   });
// }

function fetchAllProducts() {
  const inventoryProductsUrl = "data/inventory.json";
  return fetchProductsFromJsonFile(inventoryProductsUrl);
}

function getRandomProducts(productList, numberOfProducts) {
  const shuffledProducts = [...productList];
  for (let i = shuffledProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledProducts[i], shuffledProducts[j]] = [
      shuffledProducts[j],
      shuffledProducts[i],
    ];
  }
  return shuffledProducts.slice(0, numberOfProducts);
}
