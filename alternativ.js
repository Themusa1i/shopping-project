var getlocal=JSON.parse(localStorage.getItem('data'));
      console.log(getlocal[0].photo)
      document.getElementById("card1").setAttribute('src',`assets/images/Home/${getlocal[0].photo}`)
      document.getElementById("a").innerText='Charging Car';
      document.getElementById("p").innerText='Kids Toy'

      document.getElementById("card2").setAttribute('src',`assets/images/Home/${getlocal[1].photo}`)
      document.getElementById("a2").innerText='Bluetooth Speaker';
      document.getElementById("p2").innerText='Accessories';

      document.getElementById("card3").setAttribute('src',`assets/images/Home/${getlocal[2].photo}`)
      document.getElementById("a3").innerText='Room Flash Light';
      document.getElementById("p3").innerText='Decor';

      document.getElementById("card3").setAttribute('src',`assets/images/Home/${getlocal[4].photo}`)
      document.getElementById("a3").innerText='Room Flash Light';
      document.getElementById("p3").innerText='Decor';