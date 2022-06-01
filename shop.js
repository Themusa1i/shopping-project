setProductsToHtml();



function sortFunc(arr, type) {
    if (!arr.length) return arr;

    let pivot = arr[0];
    let left = [];
    let right = [];

    for (let i = 1; i < arr.length; i++) {
            if (arr[i].price >= pivot.price) {
                right.push(arr[i]);
            } else {
                left.push(arr[i])
            }       
    }

    if (type == 1) {
        return [...sortFunc(left, type), pivot, ...sortFunc(right, type)];
    } else {
        return [...sortFunc(right, type), pivot, ...sortFunc(left, type)];
    }


}

function setProductsToHtml() {

    let test = document.getElementById('trending-product');
    test.innerHTML = null;
    
    let minPrice = document.getElementById('minPrice').value;

    let maxPrice = document.getElementById('maxPrice').value;

    let priceSort =  document.getElementById('priceSort').value
    var data = products();
 
    var getlocal = data.filter(product => {

        if (minPrice === null && maxPrice !== null) {
            return (maxPrice >= product.price);
        }

        if (maxPrice === null && minPrice !== null) {
            return (minPrice <= product.price);
        }

        if (maxPrice && minPrice) {
            return (minPrice <= product.price) && (maxPrice >= product.price);
        }

        return true;         
           
    });  

    getlocal = sortFunc(getlocal, priceSort);    

    let length = getlocal.length > 9 ? 9 : getlocal.length;
     
    for (let i = 0; i < length; i++) { 
        let item = getlocal[i];

        var html =`<div class="col-lg-4 col-md-6 ">
        <div class="card text-center card-product ">
            <div class="product-image">
                <img src="assets/images/Home/${item.photo}" alt="" class="card-img-top">
        
                <ul class="product-overlay">
                    <li>
                        <a href="#" class="icon-search btn">
                            <i class="fas fa-search "></i>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="icon-shop-cart btn" onclick="add_to_cart(${item.id})">
                            <i class="fas fa-shopping-cart "></i>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="icon-heart btn">
                            <i class="fas fa-heart "></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="card-body">
                <p>${item.title}</p>
                <h4 class="card-title hd-color">
                    <a href="">${item.title}</a>
                </h4>
                <p class="card-text product-price">$${item.price}</p>
            </div>
        </div>
        </div>`
        
        test.insertAdjacentHTML('beforeend',html);

       }

     

} 

function products() {
    return JSON.parse(localStorage.getItem('data')) || []; // 1-ci varsa 1-cini yoxdusa ikincini gosterecey
} 

 function add_to_cart(id) {
   
    let product = products().filter(item => item.id == id)[0];

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
    
}
updateCardCount()


function updateCardCount() {  
    document.getElementById('countadd').innerText = basket_products().length;
}
 

