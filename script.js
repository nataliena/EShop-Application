
let products = [];
let companies = [];





var url = 'https://apietrustdev.trustorbits.click/search/get';
var data = {
  "string_value": "pr",

  "latitude": null,

  "longitude": null,

  "member_id": null
};

/*POST AJAX Cal using Fetch */
/*  function getProducts(){
fetch(url, {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  } 
}).then(res => res.json())
.then(response => console.log('Success:', response))
.catch(error => console.error('Error:', error));

}
getProducts();  */





/*POST AJAX Call using AWAIT*/

async function getData() {
  const url = "https://apietrustdev.trustorbits.click/search/get";
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })


  //.then(res => res.json())
  //.then(response => console.log('Success:', response));

  const result = await response.json();
  console.log(result)

  const allCompany = result.response.companies.map(company => ({
    company_legal_status: company.company_legal_status,
    company_logo: company.company_logo,
    company_name: company.company_name

  }));

  const allProducts = result.response.products.map(product => ({
    id: product.product_id,
    price: product.price,
    product_image: product.product_image,
    product_name: product.product_name
  }));

  companies.push(...allCompany)
  products.push(...allProducts)
  /* console.log(companies)
  console.log(products)   */
  showProduct(products);




};

getData();

let addItems = [];
let addItemsPrice = [];

function totalSum(addItemsPrice) {
  let total = 0
  for (let i = 0; i < addItemsPrice.length; i++) {
    total += addItemsPrice[i]
  } return total;
}






/* Function using two buttons ADD and REMOVE Item/s */
/* function showProduct(products) {

  for (let product of products) {

    $("#productList").append(`
  
   <div class="col-xl-3 col-md-4 col-sm-6 col-xs-12 mt-2 mb-2">
    <div class="card">
    <img src="${product.product_image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title text-center nameEllipsis">${product.product_name}</h5>
        <a class="float-left">Price: ${product.price}</a>
      <a href="#" class="btn btn-primary float-right addItem" data-product-id=${product.id} data-product-price="${product.price}">Add to Cart</a>
      <a href="#" class="btn btn-primary float-right removeItem hide" data-product-id=${product.id} data-product-price="${product.price}">Remove Item</a>
      
      </div></div></div>`
    )
  } */

  /* Function showProducts using one button */
  function showProduct(products) {

  for (let product of products) {

    $("#productList").append(`
  
   <div class="col-xl-3 col-md-4 col-sm-6 col-xs-12 mt-2 mb-2">
    <div class="card">
    <img src="${product.product_image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title text-center nameEllipsis">${product.product_name}</h5>
        <a class="float-left">Price: ${product.price}</a>
      <a href="#" class="btn btn-primary float-right addItem" data-product-id=${product.id} data-product-price="${product.price}">Add to Cart</a>
      
      
      </div></div></div>`
    )
  } 

/* Search Input */

$(function () {

  $('#search').keyup(function () {

    var searchText = $(this).val();

    $('.mb-2').each(function () {

      var currentLiText = $(this).text().toLowerCase(),
        showCurrentLi = currentLiText.indexOf(searchText) !== -1;

      $(this).toggle(showCurrentLi);

    });
  });

});





  /*  console.log($(".addItem")) */
  /*Case 01 - two buttons ADD and Remove*/ 

  /* $(".addItem").click(function () { */

    /* let addItem = $(this).attr("data-product-id")
    addItems.push(addItem);
    console.log(addItems)
    $(".numberOfItems").html(`${addItems.length}`)

    let addItemPrice = parseFloat($(this).attr("data-product-price"));
    addItemsPrice.push(addItemPrice)
    console.log(addItemsPrice);
    $(".totalPrice").html(`${totalSum(addItemsPrice)}`)


    $(this).addClass("hide");
    $(this).siblings(".removeItem").removeClass("hide")
    console.log($(this)) 


  })*/


/*Remove button in navbar - remove the last element in card*/ 

  /* $("#removeItem").click(function(){
    let deleteItem=addItems.pop();
    addItems.slice(deleteItem);
    console.log(`Delete Items REMOVE BUTTON ${addItems}`)
    $(".numberOfItems").html(`${addItems.length}`) ;
    let deleteItemPrice=addItemsPrice.pop();
    addItemsPrice.slice(deleteItemPrice);
    $(".totalPrice").html(`${totalSum(addItemsPrice)}`)
    
  
   }) */

   /*Remove button in card*/

  /* $(".removeItem").click(function () {
    $(this).addClass("hide");
    $(this).prev().removeClass("hide");

    let deleteItem = $(this).attr("data-product-id")
    addItems.splice($.inArray(deleteItem, addItems),1);

    console.log(`Delete Items REMOVE BUTTON ${addItems}`)
    $(".numberOfItems").html(`${addItems.length}`);
    let deleteItemPrice = parseFloat($(this).attr("data-product-price"));
    addItemsPrice.splice($.inArray(deleteItemPrice, addItemsPrice),1);
    
    $(".totalPrice").html(`${totalSum(addItemsPrice)}`)


  });*/

/*Case 02 - one button for ADD and Remove Item/s*/ 



  $(".addItem").on("click", function() {
      
    let thisBtn = $(this);
    
    let btnText = thisBtn.text();
   
  
   thisBtn.toggleClass('removeItem');
   console.log(thisBtn,btnText)
  
   if(thisBtn.hasClass('removeItem')) {
    thisBtn.text("Remove Item");
    let addItem = $(this).attr("data-product-id")
    addItems.push(addItem);
    console.log(addItems)
    $(".numberOfItems").html(`${addItems.length}`)
    let addItemPrice = parseFloat($(this).attr("data-product-price"));
    addItemsPrice.push(addItemPrice)
    console.log(addItemsPrice);
    $(".totalPrice").html(`${totalSum(addItemsPrice)}`)
  
    } 
     else if (thisBtn.not('.removeItem')){
    thisBtn.text("Add to Cart");
    let deleteItem = $(this).attr("data-product-id")
    addItems.splice($.inArray(deleteItem, addItems),1);    
    console.log(`Delete Items REMOVE BUTTON ${addItems}`)
    $(".numberOfItems").html(`${addItems.length}`);
    let deleteItemPrice = parseFloat($(this).attr("data-product-price"));
    addItemsPrice.splice($.inArray(deleteItemPrice, addItemsPrice),1);     
    $(".totalPrice").html(`${totalSum(addItemsPrice)}`)
      
    } 
     
  });

  }







