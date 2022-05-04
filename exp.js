inputchange.addEventListener('change',function() {
    getlocal=basket_products();
    for(let i = 0; i<getlocal.length;i++){
       var sum = inputchange.value* getlocal[i].price
       console.log(sum)

    }
    
})


