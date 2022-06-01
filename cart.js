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
          for(let i=0;i<getlocal.length;i++) {

       
           var inr = document.querySelector('.hover-metod')
           var html4=`<div class="card border-0 rounded-0 productH hoverhtml_${getlocal[i].id}" style="width: 350px;">
           <div class="media d-flex mx-3 my-2">
               <img src="assets/images/Home/${getlocal[i].photo}" alt="Image" class="pe-3" style="width:80px;">
               <div class="media-body d-flex align-items-center me-2">
                   <p class="fw-bold">${getlocal[i].title}</p>
               </div>
               <div class="card-body d-flex justify-content-evenly ">
                   <div class="d-flex justify-content-center" style="margin-top:10px;">
                       <i class="fa-solid fa-minus pe-1"
                           style="font-size:10px; margin-top:1px; color:red; cursor: pointer;" onclick="lsmin(${getlocal[i].id})"></i>
                       <p class="hoverp_${getlocal[i].id}" style="font-size:15px; margin-top:-6px">${getlocal[i].count}</p> <i
                           class="fa-solid fa-plus fs ps-1"
                           style="font-size:10px; color:#21C916; margin-top: 1px; cursor:pointer" onclick="lsplus(${getlocal[i].id})"></i>
                   </div>
                   <p class="price_${getlocal[i].id}" style="font-size:14px; margin-top: 5px;">$${getlocal[i].price}</p>
                   <i class="fa-regular fa-trash-can" onclick="trashdel('basket',${getlocal[i].id})"
                       style="font-size:12px; margin-top:9px; color:red; cursor:pointer;"></i>
               </div>
           </div>
       </div>
      `

      inr.insertAdjacentHTML("afterbegin",html4)

     } 
       const subtotal =  getlocal.reduce((cal, item) => cal + item.price * item.count, 0).toFixed(2);
       document.querySelector('.subt').innerHTML=subtotal + '$';
      

     
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
    

    if (!ls_data) return false;
    
    var index = ls_data.findIndex(product => product.id == id); 
    

    if (index != -1) {
        ls_data.splice(index,1);
       
        localStorage.setItem(storage_name, JSON.stringify(ls_data));  
        
        const el = document.getElementsByClassName('product_' + id);
        el[0].remove();
       

        updateCardCount();
        displayfun();
        calculate_totals();
    }   
}  

function trashdel(storage_name, id) {
    var ls_data = JSON.parse(localStorage.getItem(storage_name));
    

    if (!ls_data) return false;
    
    var index = ls_data.findIndex(product => product.id == id); 
   

    if (index != -1) {
        ls_data.splice(index,1);
        console.log(ls_data);
        localStorage.setItem(storage_name, JSON.stringify(ls_data));  
        
        const el = document.getElementsByClassName('hoverhtml_' + id);
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
 
  function checking(st_name,id) {
      var getlocal=localStorage.getItem(st_name)
       console.log(getlocal)

 const el = document.getElementsByClassName('product_' + id);
 el[0].remove();  

    var mesage2=document.querySelector('.endmesage');

    mesage2.style.display="block";

    setTimeout(function () {

        mesage2.style.display="none"

    },5000)

  }
    
  function lsmin(id) {
      
    var getlocal = basket_products();
    
    const index = getlocal.findIndex(item => item.id == id);
    const product = getlocal[index];
    product.count -= 1;
    
    if (product.count <= 1) {
        product.count = 1;
    }
    
    var sum = product.price * product.count;
    var headtotal =  document.querySelector('.hoverp_' + id);
    headtotal.innerHTML = product.count; 

    getlocal[index].count = product.count;

    sevaDb(getlocal);

    var price = document.querySelector(".price_" + id)
    price.innerHTML = sum.toFixed(2)

    const subtotal =  getlocal.reduce((cal, item) => cal + item.price * item.count, 0).toFixed(2);
       document.querySelector('.subt').innerHTML=subtotal + '$';

    
  }

   
  function lsplus(id) {
  var getlocal = basket_products();

  const index = getlocal.findIndex(item => item.id == id);

  const product = getlocal[index];
  
  product.count += 1;

  var sum = product.price * product.count;
  var headtotal =  document.querySelector('.hoverp_' + id);
  headtotal.innerHTML = product.count;

  var price = document.querySelector(".price_" + id)
    price.innerHTML = sum.toFixed(2)  
  
  getlocal[index].count = product.count;

  const subtotal =  getlocal.reduce((cal, item) => cal + item.price * item.count, 0).toFixed(2);
       document.querySelector('.subt').innerHTML=subtotal + '$';

  sevaDb(getlocal);

   
}

  function removeAll() {
    var x= document.querySelector('.hover-metod').innerHTML = null;
    document.getElementById('cart-shop').innerHTML = 0
    console.log(x)
      getlocal=[];
    sevaDb(getlocal); 
    

    var hovermesage = document.querySelector('.hovermesage');

    hovermesage.style.display = 'block';

    setTimeout(function () {
 
     hovermesage.style.display = 'none';
 
    },5000)

   
    
  }



  function removeAlltwo() {

    var x= document.querySelector('.parentTR').innerHTML = null;
    document.getElementById('cart-shop').innerHTML = 0
    
    getlocal=[];

    sevaDb(getlocal); 

   var endmesage = document.querySelector('.endmesage');

   endmesage.style.display = 'block';

   setTimeout(function () {

    endmesage.style.display = 'none';

   },5000)

   document.getElementById('subtotal').innerHTML = 0;
    document.getElementById('taxx').innerHTML = 0;
    document.getElementById('grand').innerHTML = 0

    removeAll()
   
  }
  

  
 
  

  




        
