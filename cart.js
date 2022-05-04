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
                      <input type="number" class="form-control product-count" onchange="mychange()"  maxlength="10" value="${getlocal[i].count}"
                          id="qty" style="width: 76px;">
                  </div>
              </td>
              <td class="pdg">
                  <button type="button" class="btn btn-danger btn-sm" onclick="lsdel('basket',${getlocal[i].id})">Remove</button>
              </td>
              <td class="pdg fw-bold" id="headtotal">${total}</td>
          </tr>`
          x.insertAdjacentHTML('beforeend',html)
          }
          let sumprice = 0; for (let i = 0; 
            i < getlocal. length; i++) { sumprice += getlocal[i].price; } 
            console. log(sumprice)

          for(let i=0;i<1;i++) {
          var tax = document.getElementById('tax')
          var tax2=sumprice * 0.05;
          var grandtotal = sumprice-tax2;

              var html1=`  <div class="row" >
                        <div class="col-9 ">
                        </div>
                        <div class="col-2 text-dark">
                            <p>Subtotal</p>
                            <p>Tax(5%)</p>
                            <p>Grand Total</p>
                        </div>
                        <div class="col-1 text-dark fw-bold">
                            <p>${sumprice}$</p>
                            <p>${tax2}$</p>
                            <p>${grandtotal}$</p>
                        </div>
                    </div>`
                    tax.insertAdjacentHTML('beforeend',html1)

          }
        
         

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
        displayfun()
    }   
}  
var mesageagain=document.getElementById('removemesage');


function displayfun() { 
    mesageagain.style.display='block';

    setTimeout(function () { 
        mesageagain.style.display='none';
    }, 2000)
}



var inputchange=document.getElementById("qty")


function mychange() {

  var  getlocal=basket_products();

    for(let i = 0; i<getlocal.length;i++){
       var sum = inputchange.value* getlocal[i].price
      var headtotal =  document.getElementById('headtotal').innerHTML=sum
    }
    
}
