

let shop = document.getElementById("shop");// <div class="shop" id="shop">

let basket = JSON.parse(sessionStorage.getItem("data")) || [];// otherwise assign empty array
console.log("basket from line 5 =>",basket)//{id: id,item: 1}

console.log("cookie",document.cookie)
//console.log(["pp","oo"].join("9"))//pp9oo

// a=["nn","pp"]
// v=a.map(e=>e ).join(" ")
// console.log(v) ==>nn pp

// a=[8,9,6]
// b=a.find(x=>x>8) //returns undefined if nothing is found
// console.log(b) ==> 9

//<i onclick="decrement(${id})" class="bi bi-dash"></i>
console.log("re-render")
//filter =>you should be only using it if you expect to return more than one item that are matching.
let generateShop = () => {  //call generateShop on loading or refreshing only
  return (shop.innerHTML = shopItemsData
    ?.map((e) => {
      let { id, name, price, desc, img } = e;

      //for each id run find method (only for card count)
      let search = basket.find((x) => x.id == id) || [];//update card count while onloading if basket has something otherwise empty array/0
      //usefull while initial loading or refreshing otherwise call update count
      return `<div id="product-id-${id}" class="item">
        <img src=${img} width="200" height="150" alt="img" />
        <div class="details">
          <h2>${name}</h2>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>Rs.${price}</h2>
            <div class="buttons">
              <div id="${id}" class="quatity">
              ${search.item == undefined ? 0 : search.item} 
              </div>
              <i onclick="increment(${id})" class="bi bi-plus-lg">Add</i> 
            </div>
          </div>

    
          <a onclick="decrement(${id})"
          style="padding:3px;color:white;background:red;text-decoration:none;cursor:pointer;border-radius:3px;text-align:center"
          >Reduce Item Count </a>

          <a href="cart.html"
          style="padding:3px;color:white;background:blue;text-decoration:none;cursor:pointer;border-radius:3px;text-align:center"
          >Go to Cart🛒</a>

        </div>
      </div>`;
    }).join(""));
};

let result = generateShop(); //run onload only once because no need to call multiple times to generate cards like in cart
// console.log("res", result);

// increment button ==>onclick
let increment = (id) => {

  let search = basket.find((x) => x.id === id);
  if (search == undefined) {
    basket.push({id: id,item: 1});
  } else {
    search.item += 1;
  }
  update(id);//update the count of card but no impact on basket
  sessionStorage.setItem("data", JSON.stringify(basket));//store updated basket in LS
                                              //basket is from global
};

// a=4
// if(a==4) console.log("if")
// else if(a==4) console.log("else if");
// else console.log("else")
// if
//decrement

let decrement = (id) => {
    let search = basket.find((x) => x.id === id);
    if (search == undefined) return;

    else search.item -= 1;

    update(id);//update the count of card but no impact on basket


     //select all objects which dont have item=0
     //{id: 2,item: 0}
    basket = basket.filter((x) => x.item !== 0);

    sessionStorage.setItem("data", JSON.stringify(basket));
    // console.log("basket", basket);
};

//update the count of card
let update = (id) => { ///** search.item is already increased or decreased in inc or dec fun : just need to update by using id
    let search = basket.find((x) => x.id == id);
    document.getElementById(id).innerHTML = search.item;//<div id="${id}" class="quatity"> 
    calculation();//calculation function extracts item and sums up the cart Icon total value
};


//calculation function extracts item and sums up the cart Icon total value
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");//get element
    cartIcon.innerText = basket.map((x) => x.item).reduce((x, y) => x + y, 0);//extract from basket and update total items
                                        //[2,3,5]=>10
};
calculation();//while onload/refresh ===>extract from basket and update total items
