
{/* <div id="label" class="text-center"></div> */}
{/* <div id="shopping-cart" class="shopping-cart"></div> */}


let label = document.getElementById("label"); //total
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(sessionStorage.getItem("data")) || [];

//for total items in cart icon while : call===> loading & refreshing, updating , clearing cart and removing items
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerText = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  console.log("count", cartIcon);
};
calculation();


//generate items while loading,
let generateCartItems = () => {
  if (basket.length !== 0) {
    console.log("basket is not empty");
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x; //x= {id:1,item:6} comming from basket
        let search = shopItemsData.find((y) => y.id == id) || [];//use search to populate
        //search={id:1, name:"Cotton Shirt",price:566,desc:"Best Cotton Shirt",img:"images/im1.jpeg"}
        //let {img,name,price}=search : better way to not put dot (destructure)
        return `
          <div class="cart-item">

              <img width="100" src=${search.img} alt="img"/>

              <div class="details">
                  <div class="title-price-x">
                    <h4 class="title-price">
                      <p>${search.name}</p>
                      <p class="cart-item-price">Rs.${search.price}</p>
                    </h4>
                    <i onclick="removeItem(${id})" class="bi bi-x"></i>
                  </div>

                  <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash"></i>
                    <div id="${id}" class="quatity">${item} </div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                  </div>

                  <h3>Rs.${item * search.price}</h3>
                            
              </div>
            
          </div>`}).join(""));
  } else {

    console.log("basket is  empty");
    shoppingCart.innerHTML = "";
    label.innerHTML = `
        <a href="index.html" 
              style="margin:1px;color:red;font-family:Arial;display:block;text-decoration:underline">
              Go and add some items!
        </a>

        <a href="index.html">
              <button class="homeBtn">🏦</button>
        </a>
        `;
  }
};
generateCartItems();


let increment = (id) => {

  let search = basket.find((x) => x.id === id);
  if (search == undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  console.log("basket", basket);
  //rerender with updated data : <h3>Rs.${item * search.price}</h3>
  generateCartItems();

  update(id);//<div id="${id}" class="quatity"> 
  sessionStorage.setItem("data", JSON.stringify(basket));
};

//decrement
let decrement = (id) => {

  let search = basket.find((x) => x.id === id);
  if (search == undefined) return;
  else search.item -= 1;
  update(id);//<div id="${id}" class="quatity"> : id 
  basket = basket.filter((x) => x.item !== 0); 
  generateCartItems(); 
  sessionStorage.setItem("data", JSON.stringify(basket));

  console.log("basket", basket);
};

//<div id="${id}" class="quatity"> : id 
let update = (id) => {
  let search = basket.find((x) => x.id == id);
  document.getElementById(id).innerHTML = search.item; //<div id="${id}" class="quatity"> : id 

  calculation();//for total items in cart icon
  TotalAmount();
};

//remove item

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem);
  calculation();
  generateCartItems();
  TotalAmount();
  sessionStorage.setItem("data", JSON.stringify(basket));
};

// 
const TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket.map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id == id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);

    label.innerHTML = `
        <h2 style="padding:7px;color:red">Total : Rs.${amount}</h2>
        <textarea style="display:block;margin:auto" id="w3review" name="w3review" rows="4" cols="40">
          Type you Address
        </textarea>
        <button class="checkout">💸 Click to Pay</button>
        <button onclick="clearCart()" class="removeAll">X</button> 
         `;
  } else return;
};

TotalAmount();
// 

const clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    sessionStorage.setItem("data", JSON.stringify(basket));
};
