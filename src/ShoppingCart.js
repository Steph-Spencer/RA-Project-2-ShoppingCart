/**
 * Created by Edward_J_Apostol on 2017-01-29.
 */

export default class ShoppingCart{

    constructor(){
        console.log("creating shopping cart");
        if(Storage){
            // you can create a shoppingCart!
            this.initShoppingCart();
        } else
        {
            console.log("Error! SessionStorage not supported in your browser!");
        }
    }

   initShoppingCart(sku){
           if (sessionStorage.getItem(sku) !== "undefined") {
           if (sessionStorage.quantity) {
           sessionStorage.quantity = Number(sessionStorage.quantity)+1;
            } else { sessionStorage.quantity = 0;
       }
   }

        console.log("finished creating shopping cart");
    }

    addItemToCart(sku){
         console.log("hello"+sku);
       let theSku = sku;
       if (sessionStorage.getItem(sku) == undefined) {
           sessionStorage.setItem(sku, 1);
           return;
       } else {
           for (let i = 0; i <sessionStorage.length; i++) {
               let currentSku = sessionStorage.key(i);
               if (currentSku.toString() == theSku.toString()) {
                   let currentValue = sessionStorage.getItem(currentSku);
                   currentValue = parseInt(currentValue);
                   currentValue = currentValue + 1;
                   sessionStorage.setItem(theSku, currentValue);
               }
               
           }
       }
   }

    removeItemFromCart(sku){
   // replace value of session sku quantity with null//

    }

    updateQuantityofItemInCart(sky,qty){

    }

    clearCart(){
        sessionStorage.clear();
        // clear the entire cart
    }


}
