// Start Definition of variables
let productNameInput = document.getElementById("productName");
let productPriceInput = document.getElementById("productPrice");
let productCategoryInput = document.getElementById("productCategory");
let DescriptionInput = document.getElementById("Description");
let productImgInput = document.getElementById("productImg");
let productList = [];
let addBtn = document.querySelector(".add");
let updateBtn = document.querySelector(".updateBtn");
let updateIndex;
let productSearch = document.getElementById("productSearch");
let upload = document.getElementById("upload");

// end Definition of variables


/**
 * If there is any data in the local Storage, put it in the Array [product List] and Display it
 */
if (localStorage.getItem("Products") != null) {
  productList = JSON.parse(localStorage.getItem("Products"));
  sortArray();
  display(productList);
}

/**
 * This function works to take Product information and add to array
 */
function addProduct() {
  if (
    validationInputs(productNameInput) &&
    validationInputs(productPriceInput) &&
    validationInputs(productCategoryInput) &&
    validationInputs(DescriptionInput) &&
    validationInputs(productImgInput)
  ) {
    var product = {
      productName: productNameInput.value,
      productPrice: productPriceInput.value,
      productCategory: productCategoryInput.value,
      productImg: `imgs/${productImgInput.files[0]?.name}`,
      productDescription: DescriptionInput.value,
    };
    console.log(productImgInput.files);
    productList.push(product);
    localStorage.setItem("Products", JSON.stringify(productList));
    sortArray();
    display(productList);
    clearInputs();
  } else {
    Swal.fire({
      icon: "error",
      title: "Error in product data",
      text: "Please check that the data is correct!",
    });
  }
}

/**
 * This function works to Clear All inputs value
 */
function clearInputs() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productImgInput.value = "";
  DescriptionInput.value = "";
  productSearch.value = "";
  upload.innerHTML = "";
  productNameInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-valid");
  productCategoryInput.classList.remove("is-valid");
  DescriptionInput.classList.remove("is-valid");
  productImgInput.classList.remove("is-valid");
}

/**
 * This Function display all data from Array [Product list OR Search List]
 * @param {*} arr
 */
function display(arr) {
  let blackBox = ``;

  for (let i = 0; i < arr.length; i++) {
    blackBox += `<div  class=" col-md-6 col-lg-3 product-card">
                    <div class="card">
                        <img src="${
                          arr[i].productImg
                        }" class="img-fluid img-card">
                        <div class="card-body">
                            <h5 class="card-title">${
                              arr[i].productSearchText
                                ? arr[i].productSearchText
                                : arr[i].productName
                            }</h5>
                            <div class="text-card d-flex  justify-content-between">
                                <span class="badge bg-primary"> ${
                                  arr[i].productCategory
                                }</span>
                                <span class="badge bg-secondary"> ${
                                  arr[i].productPrice
                                } $</span>
                            </div>
                            <p class="pt-4"> ${arr[i].productDescription}</p>
                        </div>
                        <div class="card-footer text-body-secondary d-flex justify-content-between">

                            <button class="btn btn-outline-danger" onclick="deleteProduct(${productList.indexOf(
                              arr[i]
                            )})" ><i class="fa-solid fa-trash"></i> Delete</button>
                            <button class="btn btn-outline-success" onclick="editProduct(${productList.indexOf(
                              arr[i]
                            )})"> <i class="fa-solid fa-pen"></i> Edit</button>
                        </div>
                    </div>
                </div>`;
  }

  document.getElementById("showProduct").innerHTML = blackBox;
}

/**
 * This Function Delete Product from Array [product List]
 * @param {*} del
 */
function deleteProduct(del) {
  productList.splice(del, 1);
  localStorage.setItem("Products", JSON.stringify(productList));
  sortArray();
  display(productList);
  clearInputs();
}

/**
 * this function take value from Array [Product List] and put it in inputs
 * @param {*} editIndex
 */
function editProduct(editIndex) {
  updateIndex = editIndex;

  productNameInput.value = productList[editIndex].productName;
  productPriceInput.value = productList[editIndex].productPrice;
  productCategoryInput.value = productList[editIndex].productCategory;
  DescriptionInput.value = productList[editIndex].productDescription;
  upload.innerHTML = productList[editIndex].productImg;
  toggleBtn(1);
}

function updateProduct() {
  if (
    validationInputs(productNameInput) &&
    validationInputs(productPriceInput) &&
    validationInputs(productCategoryInput) &&
    validationInputs(DescriptionInput) &&
    validationInputs(productImgInput)
  ) {
    productList[updateIndex].productName = productNameInput.value;
    productList[updateIndex].productPrice = productPriceInput.value;
    productList[updateIndex].productCategory = productCategoryInput.value;
    productList[
      updateIndex
    ].productImg = `imgs/${productImgInput.files[0]?.name}`;
    productList[updateIndex].productDescription = DescriptionInput.value;
    localStorage.setItem("Products", JSON.stringify(productList));
    sortArray();
    display(productList);
    toggleBtn(0);
    clearInputs();
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }
}

/**
 * this function to change between btn add , btn update
 */
function toggleBtn(tog) {
  if (tog == 1) {
    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
  } else if (tog == 0) {
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
  }
}

/**
 * this function Search if Product found or not
 * @param {*} inputsearch
 */
function Search(inputsearch) {
  let searchList = [];

  for (let i = 0; i < productList.length; i++) {
    if (inputsearch.charCodeAt(0) <= 90) {
      if (
        productList[i].productName
          .toUpperCase()
          .includes(inputsearch.toUpperCase())
      ) {
        productList[i].productSearchText = productList[i].productName
          .toUpperCase()
          .replaceAll(
            inputsearch,
            `<span class="text-danger">${inputsearch.toUpperCase()}</span>`
          );
        searchList.push(productList[i]);
      }
    }
     else {
      if (
        productList[i].productName
          .toLowerCase()
          .includes(inputsearch.toLowerCase())
      ) {
        productList[i].productSearchText = productList[i].productName
          .toLowerCase()
          .replaceAll(
            inputsearch,
            `<span class="text-danger">${inputsearch.toUpperCase()}</span>`
          );
        searchList.push(productList[i]);
      }
    }
  }

  if (searchList.length == 0) {
    document.getElementById(
      "showProduct"
    ).innerHTML = `                <div class="search-eror text-center text-danger">
                <i class="fa-7x fa-solid fa-circle-exclamation "></i>
                <p class="mt-4 h1">No Product Found</p>

            </div>`;
  } else {
    display(searchList);
  }
}

/**
 * this function To verify the validity of the data being entered
 * @param {*} input
 */
function validationInputs(input) {
  var rexgs = {
    productName: /^[A-Z][a-z]{2,10}$/,
    productPrice: /^([6-9][0-9]{3}|[1-5][0-9]{4}|60000)$/,
    productCategory: /(Phones|Tv|Screens|Laptops)/,
    productImg: /^.{1,}\.(png|jpg){1}$/,
    Description: /^[a-zA-Z]{0,250}$/,
  };

  isvalid = rexgs[input.id].test(input.value);

  if (isvalid) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    input.nextElementSibling.classList.replace("d-block", "d-none");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    input.nextElementSibling.classList.replace("d-none", "d-block");
  }
  console.log(input.nextElementSibling);
  return isvalid;
}

/**
 * this function Sort Array [Product List] Depending on the price
 */
function sortArray() {
  productList.sort((a, b) => a.productPrice - b.productPrice);
}

/**
 * this event take value from image input and put it to span
 */
productImgInput.addEventListener("change", () => {
  if (validationInputs(productImgInput)) {
    upload.innerHTML = productImgInput.files[0]?.name;
  } else {
    upload.innerHTML = "";
  }
});
