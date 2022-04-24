
  getlocastorage()


  function getlocastorage() {
      const getlocal = JSON.parse(localStorage.getItem('data'));
      console.log(getlocal[0].photo)
      
        for(let i = 0; i<8;i++){
          const test1 = document.getElementById('Trending-Row');
          console.log(getlocal[i].photo);
         const html = `
         <div class="col-12 col-md-4 col-lg-3 test1">
          <div class="card text-center card-product">
              <div class="product-image">
                  <img class="card-img-top" id="Trending" src="assets/images/Home/${getlocal[i].photo}" alt="Card image cap" >
                  <ul class="product-overlay">
                      <li>
                          <a href="#" class="icon-search btn">
                              <i class="fas fa-search"></i>
                          </a>
                      </li>
                      <li>
                          <a href="#" class="icon-shop-cart btn">
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
                  <p >${getlocal[i].title}</p>
                  <h4 class="card-title hd-color">
                      <a href="#" >${getlocal[i].title}</a>
                  </h4>
                  <p class="card-text product-price">${getlocal[i].price}$</p>
              </div>

          </div>
        </div>
         `
         test1.insertAdjacentHTML("beforeend", html);

        }





  }
    

