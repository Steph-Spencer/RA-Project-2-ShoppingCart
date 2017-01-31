/**
 * Created by Edward_J_Apostol on 2017-01-27.
 */

export default class BestBuyWebService{

    constructor(){
        this.url ="";
        this.apiKey = "";
        this.productData = null;
        this.products = null;
    }


    getData(theApp){
        // theApp is a reference to the main app
        // we can pass information to it, including data
        // that is returned from this service

        let serviceChannel = new XMLHttpRequest();
        let url = this.url;

        /*
        // *** To solve the issue of passing the data back to the main app...
        // *** and eventually, to catalogView
        // *** You could the addEventListener to call
        // *** a different function which will have both
        // *** the event object and dataPlaceHolder as parameters
        // *** see http://bit.ly/js-passmoreargsevent
         */

        serviceChannel.addEventListener("readystatechange",this.resultsPreprocessor(theApp),false);
        serviceChannel.open("GET",url,true);
        serviceChannel.send();
    }

    resultsPreprocessor(theApp){
        /*the addEventListener function near line 29 requires a proper function (an event handler) to be returned so we can create one to be returned.
        */
        console.log(theApp); // <-- should be instance of App
        let thisService = this; // a reference to the instance created from this class
        let eventHandler = function(evt){
            thisService.results(evt,theApp)
        };
        return eventHandler
    };

    results(evt,theApp){

        if (evt.target.readyState == 4 && evt.target.status == 200){
            // assign this instance's productData to be the responseText
            this.productData = evt.target.responseText;
            // assign the app's productData to be the responseText too
            theApp.productData = evt.target.responseText;
            // tell the app to prepare the catalog
            // there is another way to do it, with custom
            // events. but this will work for now.
            theApp.prepCatalog();
            // console.log(evt.target.responseText);
            // return evt.target.responseText;
        }
    }

    getProducts(){
        // this method explicity gets the products property
        // from the JSON object. it assumes you have the JSON data
        if(this.productData!=null){
           let jsonData = JSON.parse(this.productData);
           this.products = jsonData.products;
           return this.products;
        }

        return; // if we have no data, return nothing
    }
}
