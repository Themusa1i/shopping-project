

function add_to_cart(id) {
    event.preventDefault();

    // productu tapaq
    let product = products().filter(item => item.id == id)[0];

    //2 seyi fikirlesmeliyiy bu product artiq sebetde var ya yox .
    // varsa sayini artirmaliyiq. yani tombik diner varsa eynisini click eliyirsen onda 2 dene eliyir onu daa sebetde 2 dene product yaratmiriq
    // deme product.count olmalidi, product.total olamlidi, product.discount a gore product totali hesabliyiriq

    // 1. yoxla basketde varmi
    let basketProduct = basket_products().filter(item => item.id == id)[0];

    // varsa countu artirmali , totali deyismeliyiy
    if (basketProduct) {
        // indi bu hisseni yoxluyaq. iki defe click eliyende , count ve total deyismelidi
        /// islemir 
        // bele yoxluyqa, eyni sebebeden olabiler
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
    // eyer yoxdusa basketde basketi count eleve eliyib, totalt set eliyib yaziriq db-ya
    else {
        // 1-ci defe elave eliyende count 1 eliyiriry , 
        product.count = 1;
        product.total = (product.price - (product.price*product.discount)/100).toFixed(2);
        // indi yene set elemey lazimdi local storage 
        let setAbleProducts = basket_products();
        setAbleProducts.push(product);  

        //nie sence totali null yazir  ?
        // pbasket_products().push(product) / false ve ya true dondurur/ 1 ona gore yazirdiki 1 true du. yani push eliyirdi
        
        save_to_cart(setAbleProducts);
    }

    // okay gedey yoxliuyag, 1 -ci defe set eliyende problem olur , gedey tapaq
    console.log(product);
}


function basket_products() {
    return JSON.parse(localStorage.getItem('basket')) || [];
}

function save_to_cart(products) {
    localStorage.setItem('basket', JSON.stringify(products)); // objectde buna gore yazir
}


   