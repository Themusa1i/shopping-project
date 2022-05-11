getlocastorage()
  
function products() {
    return JSON.parse(localStorage.getItem('data')) || []; // 1-ci varsa 1-cini yoxdusa ikincini gosterecey
}   

function getlocastorage() {
      const getlocal = basket_products(); 
      

          for(let i=0;i<getlocal.length;i++) {
              var x=document.querySelector('.parentTR');
              var total = getlocal[i].price * getlocal[i].count

              var html=` <tr class="product_${getlocal[i].id}">
              <td class="pdg">
                  <div class="media d-flex">
                      <img src="assets/images/Home/${getlocal[i].photo}" alt="" class="me-4"
                          style="width: 80px; height: 80px;">
                      <div class="media-body">
                          <p>${getlocal[i].title}</p>
                      </div>
                  </div>
              </td>
              <td class="pdg">
                  ${getlocal[i].price}
              </td>
              <td class="pdg">
                  <div class="m-0">

                      <input type="number" class="form-control product-count  inputchange"  onchange="mychange(this,${getlocal[i].id})"  maxlength="10" minlength="1" value="${getlocal[i].count}"
                           style="width: 76px;">
                  </div>
              </td>
              <td class="pdg">
                  <button type="button" class="btn btn-danger btn-sm" onclick="lsdel('basket',${getlocal[i].id})">Remove</button>
              </td>
              <td class="pdg fw-bold headtotal_${getlocal[i].id}">${total}</td>
          </tr>`
          x.insertAdjacentHTML('beforeend',html)
          }
 }

calculate_totals();

function calculate_totals() {
    const products = basket_products(); 

    const subtotal =  products.reduce((cal, item) => cal + item.price * item.count, 0).toFixed(2);

    const tax =  products.reduce((cal, item) => {
        let total = item.price * item.count;
        return cal + (total * item.discount) / 100;
    }, 0).toFixed(2);

    document.getElementById('subtotal').innerHTML = subtotal;
    document.getElementById('taxx').innerHTML = tax;
    document.getElementById('grand').innerHTML = (subtotal - tax).toFixed(2);    
}


function basket_products() {
    return JSON.parse(localStorage.getItem('basket')) || [];
}


function updateCardCount() {  
    document.getElementById('cart-shop').innerText = basket_products().length;
}
 
updateCardCount()

function lsdel(storage_name, id) {
    var ls_data = JSON.parse(localStorage.getItem(storage_name));
    console.log(ls_data, "ls_data");

    if (!ls_data) return false;
    
    var index = ls_data.findIndex(product => product.id == id); 
    console.log(index)

    if (index != -1) {
        ls_data.splice(index,1);
        console.log(ls_data);
        localStorage.setItem(storage_name, JSON.stringify(ls_data));  
        
        const el = document.getElementsByClassName('product_' + id);
        el[0].remove();

        updateCardCount();
        displayfun();
        calculate_totals();
    }   
}  
var mesageagain=document.getElementById('removemesage');


function displayfun() { 
    mesageagain.style.display='block';

    setTimeout(function () { 
        mesageagain.style.display='none';
    }, 2000)
}


// my change function


 function mychange(element, id) { 
    var getlocal = basket_products();
    var inputvalue = element.value

    if (inputvalue < 1) {
        inputvalue = element.value = 1;
    }

    const product = getlocal.find(item =>  item.id == id);
    var sum = product.price * inputvalue;
    var headtotal =  document.querySelector('.headtotal_' + id);
    headtotal.innerHTML = sum.toFixed(2);

    const index = getlocal.findIndex(item => item.id == id);
    getlocal[index].count = inputvalue;
    sevaDb(getlocal);
    calculate_totals();
}


function sevaDb(data) {
    localStorage.setItem('basket', JSON.stringify(data));
} 

 
var check=document.getElementById("check");

check.addEventListener('click',function () {
    var mesage2=document.querySelector('.endmesage');

    mesage2.style.display="block";

    setTimeout(function () {

        mesage2.style.display="none"

    },5000)
});

   

        
