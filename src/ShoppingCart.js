/**
 * Created by Edward_J_Apostol on 2017-01-29.
 */

export default class ShoppingCart{

    constructor(){
        console.log("creating shopping cart");
        if(Storage){
            // you can create a shoppingCart!
            //this.initShoppingCart();
        } else
        {
            console.log("Error! SessionStorage not supported in your browser!");
        }
    }

   /*initShoppingCart(sku){
           if (sessionStorage.getItem(sku) !== "undefined") {
           if (sessionStorage.quantity) {
           sessionStorage.quantity = Number(sessionStorage.quantity)+1;
            } else { sessionStorage.quantity = 0;
       }
   }*/

    //    console.log("finished creating shopping cart");
    //}

    addItemToCart(sku){
      console.log("hello");
      console.log(sku);

       //let theSku = sku;
       sku = sku.toString();
       console.log(sessionStorage.getItem(sku));
       if (parseInt(sessionStorage.getItem(sku)) >0) {
        sessionStorage.setItem(sku, parseInt(sessionStorage.getItem(sku)) + 1);

       } else {
          sessionStorage.setItem(sku, 1);
                  
        }               
    }

    updateQuantityofItemInCart(sku,qty){
      //Let sessions

    }

    removeItemFromCart(sku){
   // replace value of session sku quantity with null//

    }

   // clearCart(){
     //   $(document).on('click', '#clearcart',function(evt){
      //    console.log("I don't want this shit!");
 //         storage.clear();         
   //   });
  
    }


//}
