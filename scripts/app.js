function generateProductHTML(product) {
  var html = `
      <div class="item" style="margin-bottom: 12px; box-shadow: 0 0 7px rgba(0, 0, 0, 0.2);">
        <div class="gd_li" id="product${product.id}">
          <a href="product_xq.html?id=${product.id}">
            <div class="pro_bg" style="background: url('images/yunshangtong2021412131628/202291295458.png') no-repeat; background-size: 100%;">
              <img class="img" mode="widthFix" src="images/yunshangtong2021412131628/${product.image}" />
            </div>
          </a>
          <span class="dh_overpro gd_li_title">
            <span
                style="
                    width: 30px;
                    height: 20px;
                    display: block;
                    float: left;
                    font-size: 11px;
                    text-align: center;
                    line-height: 20px;
                    border-radius: 5px;
                    margin-right: 4px;
                    color: #fff;
                    background: #cc0;
                "
                >新品</span> 
            ${product.title}</span>
          <div class="params" style="overflow: hidden">            
            <span class="gd_li_txt">
            <span class="dot" style="background: #ff4361"></span>

            规格：${product.dimensions}</span
            ><span class="gd_li_txt">
            <span class="dot" style="background: #ff4361"></span>
            含量：${product.content}
            </span>
          </div>
          <div class="goods_an">
            <a href="video.html?url=${product.video}" class="goods_anzuo" style="background: ">
              <img src="images/pro_bo.png" />视频
            </a>
            <a href="product_xq.html?id=${product.id}" class="goods_anyou">
              <img src="images/pro_xx.png" />详情
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
  anchorElement.textContent = title;

  const closeButton = document.createElement("span");
  closeButton.textContent = "×";

  anchorElement.appendChild(closeButton);
  newElement.appendChild(anchorElement);

  return newElement;
}

function renderProductList(products) {
  const productContainer = document.getElementById("productContainer");
  const productCountElement = document.getElementById("productCount");
  const productHeader = document.getElementById("productHeader");
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const query = urlParams.get("k");
  let filteredProducts;

  if (query !== null) {
    filteredProducts = products.filter((product) =>
      product.title.includes(query)
    );
    productCountElement.innerHTML = filteredProducts.length;

    var tagHTML = generateSearchTagHTML(query);
    productHeader.prepend(tagHTML);
  } else {
    filteredProducts = products;
    productCountElement.innerHTML = filteredProducts.length;
  }

  filteredProducts.forEach(function (product) {
    var productHTML = generateProductHTML(product);
    productContainer.innerHTML += productHTML;
  });
}
