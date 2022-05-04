getlocastorage() 


const mesageagain = document.getElementById('message')
console.log(mesageagain)
  
function products() {
    return JSON.parse(localStorage.getItem('data')) || []; // 1-ci varsa 1-cini yoxdusa ikincini gosterecey
}   

function getlocastorage() {
      const getlocal = products();
      console.log(getlocal[0].photo)
      
        for(let i = 0; i<8;i++){
          const test1 = document.getElementById('Trending-Row');
          console.log(getlocal[i].photo);
          let item = getlocal[Math.floor(Math.random()*getlocal.length)];
        
         const html = `
         <div class="col-12 col-md-4 col-lg-3 test1">
          <div class="card text-center card-product">
              <div class="product-image">
                  <img class="card-img-top" id="Trending" src="assets/images/Home/${item.photo}" alt="Card image cap" >
                  <ul class="product-overlay">
                      <li>
                          <a href="#" class="icon-search btn">
                              <i class="fas fa-search"></i>
                          </a>
                      </li>
                      <li>
                          <a href="#" class="icon-shop-cart btn" onclick="add_to_cart(${item.id})">
                              <i class="fas fa-shopping-cart" id="shopping-cart"  style="transform: rotateY(150deg);"></i>
                          </a>
                      </li>
                      <li>
                          <a href="#" class="icon-heart btn">
                              <i class="far fa-heart"></i>
                          </a>
                      </li>
                  </ul>
              </div>
              <div class="card-body">
                  <p >${item.title}</p>
                  <h4 class="card-title hd-color">
                      <a href="#" >${item.title}</a>
                  </h4>
                  <p class="card-text product-price">${item.price}$</p>
              </div>

          </div>
        </div>
         `
         test1.insertAdjacentHTML("beforeend", html);

         
        }
           
        
        for(let i=0;i<3;i++){
          const row = document.getElementById('row2');
          let item = getlocal[Math.floor(Math.random()*getlocal.length)];
          console.log(item.photo);
          var html1=`
          <div class="col-lg-4 col-md-6 mb-2 mb-lg-0 px-1">
              <div class="card product">
                  <div class="card-img-box">
                      <img src="assets/images/Home/${item.photo}" alt="Image" class="img-responsive"
                          img-responsive>
                  </div>
              </div>
          </div> `
      row.insertAdjacentHTML('beforeend',html1);
  }

  for(let i=0;i<4;i++) {
      var test4=document.getElementById('bestseller');
      let item = getlocal[Math.floor(Math.random()*getlocal.length)];
      var html3=`<div class="col-12 col-md-4 col-lg-3">
      <div class="card text-center card-product">
          <div class="product-image">
              <img class="card-img-top" src="assets/images/Home/${item.photo}" alt="Card image cap">
              <ul class="product-overlay">
                  <li>
                      <a href="#" class="icon-search btn">
                          <i class="fas fa-search"></i>
                      </a>
                  </li>
                  <li>
                      <a href="#" class="icon-shop-cart btn click" onclick="add_to_cart(${item.id})">
                          <i class="fas fa-shopping-cart" style="transform: rotateY(150deg);"></i>
                      </a>
                  </li>
                  <li>
                      <a href="#" class="icon-heart btn">
                          <i class="far fa-heart"></i>
                      </a>
                  </li>
              </ul>
          </div>
          <div class="card-body">
              <p>${item.title}</p>
              <h4 class="card-title hd-color">
                  <a href="#">${item.title}</a>
              </h4>
              <p class="card-text product-price">${item.price}$</p>
          </div>
      </div>
  </div>`

  test4.insertAdjacentHTML('beforeend',html3)


  }


}

function add_to_cart(id) {
   

    // productu tapaq
    let product = products().filter(item => item.id == id)[0];

    //2 seyi fikirlesmeliyiy bu product artiq sebetde var ya yox .
    // varsa sayini artirmaliyiq. yani tombik diner varsa eynisini click eliyirsen onda 2 dene eliyir onu daa sebetde 2 dene product yaratmiriq
    // deme product.count olmalidi, product.total olamlidi, product.discount a gore product totali hesabliyiriq

    // 1. yoxla basketde varmi
    let basketProduct = basket_products().filter(item => item.id == id)[0];

    
    if (basketProduct) {
       
        let setAbleProducts = basket_products();
        setAbleProducts.map(item => {
                if (item.id == id) {
                    item.count += 1;
                    let totalPriceWithoutDiscount = item.price * item.count;
                    item.total = totalPriceWithoutDiscount - (totalPriceWithoutDiscount*item.discount)/100;
                    
                }
        });

        save_to_cart(setAbleProducts);

    } 
    
    else {
        // 1-ci defe elave eliyende count 1 eliyiriry , 
        product.count = 1;
        product.total = (product.price - (product.price*product.discount)/100).toFixed(2);
       
        let setAbleProducts = basket_products();
        setAbleProducts.push(product);  

        save_to_cart(setAbleProducts);
    }

    console.log(product);
}

function basket_products() {
    return JSON.parse(localStorage.getItem('basket')) || [];
}

function save_to_cart(products) {
    localStorage.setItem('basket', JSON.stringify(products));
    updateCardCount(); 
    displayfun(); 
}


function updateCardCount() {  
    document.getElementById('cardCount').innerText = basket_products().length;
}

updateCardCount()


function displayfun() { 
    mesageagain.style.display='block'
    
    setTimeout(function () {
        mesageagain.style.display='none'
    }, 3000)
}



   
      
 

