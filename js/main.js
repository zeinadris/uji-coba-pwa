$(document).ready(function(){

var _url = "https://my-json-server.typicode.com/zeinadris/pwaapi/products"

var dataResult = ''

var catResults = ''

var categories = []


function renderPage(_data){

$.get(_url, function(data){

    $.each(data, function(_key, items){

        _cat = items.category

        dataResult += "<div>"
                        + "<h3>" + items.nama + "</h3>"
                        + "<p>" + _cat + "</p>"
                       "<div>";

        if($.inArray(_cat, categories) == -1){
            categories.push(_cat)
            catResults += "<option value'"+ _cat +"'>" + _cat + "</option>"
     }               

    }) 

        $('#products').html(dataResult) 
        $('#cat_select').html("<option value='all'>Semua</option>" + catResults)
  })
}

var networkDataReceived = false
//fresh from online
var networkUpdate = fetch(_url).then(function(response){
  return response.json()
}).then(function(data){
  networkDataReceived = true
  renderPage(data)
})

//return data from cache
if(typeof(caches) !== "undefined") {
caches.match(_url).then(function(response){
  if(response) throw Error('no data on cache')
  return response.json()
}).then(function(data){
  if(!networkDataReceived) {
    renderPage(data)
    console.log('render data from cache')
  }
}).catch(function(){
  return networkUpdate
})
}

//Fungsi Filter
$("#cat_select").on('change', function(){
    updateProduct($(this).val())
})

function updateProduct(cat) {

    var dataResult = ''
    var _newUrl = _url

    if( cat != 'all')
        _newUrl = _url + "?category=" + cat


    $.get(_newUrl, function(data){

        $.each(data, function(_key, items){
    
            _cat = items.category
    
            dataResult += "<div>"
                            + "<h3>" + items.nama + "</h3>"
                            + "<p>" + _cat + "</p>"
                           "<div>";
    
        }) 

            $('#products').html(dataResult) 
    })

}



}) //end document ready jquery


//PWA

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
  


