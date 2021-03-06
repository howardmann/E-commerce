var orderDisplay = function(data) {
  console.log(data);

  // Data is visible here: http://localhost:3000/orders.json
  // An array of objects
  $(".clear_display").empty();


  for (var i = 0; i < data.length; i++) {
    var name = data[i].name;
    var address1 = data[i].address1;
    var status = data[i].status;

    var orderID2 = data[i].items[0].order_id;
    var $li5 = $("<li>").text("Order id:" + orderID2);
    var $li8 = $("<br>").text("");
    var $li = $("<li>").text("Name: " + name);
    var $li2 = $("<li>").text("Address: " + address1);
    var $li3 = $("<li>").text("Status: " + status);
    $(".clear_display").append($li8).append($li).append($li5).append($li2).append($li3).append($li5);
    var URL = "/orders/" + orderID2 + "/edit";
    var editOrder = $('<a href="' + URL + '">' + 'edit order' + '</a>');
    $(".clear_display").append(editOrder);

    for (var j = 0; j < data[i].items.length; j++) {
      var productName = data[i].items[j].product.product_name;
      var price = data[i].items[j].product.price;
      var quantity = data[i].items[j].quantity;
      var orderID = data[i].items[j].order_id;
      var total = quantity * price;
      var $li4 = $("<li>").text("Purchased " + quantity + " of " + productName + " items @ price of $" + price + " for $" + total);
      $(".clear_display").append($li4);

    }
  }
};



var baseURL = "/orders";
var getOrderDisplay = function() {

  $.ajax({
    url: baseURL,
    type: "GET",
    dataType: "JSON"
  }).done(orderDisplay);
};

$(document).on("turbolinks:load", function() {

  var myTimer;
  var orderTimer = function() {
    if ( myTimer ) {
      return false;
    }
    myTimer = window.setInterval(function() {
      getOrderDisplay();
    }, 4000);
  };
  getOrderDisplay();
  $("#order_display").on("click", orderTimer);
  $("#stop_live_orders").on("click", function() {
    console.log("testing once again");
    window.clearInterval(myTimer);

  });

});
