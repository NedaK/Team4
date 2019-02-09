
// Initialize Firebase
var config = {
apiKey: "AIzaSyBbRGkTQqynMteWZM9dIr26SsIblxOYe94",
authDomain: "coffeecollective.firebaseapp.com",
databaseURL: "https://coffeecollective.firebaseio.com",
projectId: "coffeecollective",
storageBucket: "",
messagingSenderId: "391262478514"
};

var coffeeShopListItem = {
    name: '',
    streetAddress: '',
    addressLocality: '',
    postalCode: ''
};

var coffeeShopListItems = [];
var firstNames = ['Dave', 'Sandra', 'Michelle', 'Day', 'Neda', 'Nai-Mu', 'Robert',
                 'Alice', 'Susan', 'Nancy', 'Allen', 'Francis', 'William', 'Gail',
                'Betty', 'Steve', 'Richard', 'Paul', 'Charles', 'John', 'Jeanne'];
var lastNames = ['Jones', 'Wang', 'Choi', 'Davis', 'Brooks', 'Johnson', 'Lu',
                'Martinez', 'Cramer', 'Pence', 'Trump', 'Obama', 'Martin', 'Thomas',
                'Jackson', 'Stinson', 'Pearl', 'Rodriquez', 'Sanchez', 'Bingamon', 'Kraft'];
var ratings = ['0 (none)', '1 (minimal)', '2 (adequate)', '3 (excellent)'];

var SacramentoAreaZipCodes = [95843, 95864];
                            // 95825, 95821, 95608,
                            // 95610,
                            // 95621,
                            // 95638,
                            // 95615,
                            // 95757,
                            // 95758,
                            // 95624,
                            // 95626,
                            // 95628,
                            // 95828,
                            // 95630,
                            // 95842,
                            // 95632,
                            // 95639,
                            // 95641,
                            // 95655,
                            // 95652,
                            // 95841,
                            // 95660,
                            // 95662,
                            // 95827,
                            // 95742,
                            // 95670,
                            // 95683,
                            // 95673,
                            // 95826,
                            // 95680,
                            // 95837,
                            // 95816,
                            // 95819,
                            // 95811,
                            // 95814,
                            // 95832,
                            // 95817,
                            // 95835,
                            // 95833,
                            // 95820,
                            // 95838,
                            // 95824,
                            // 95818,
                            // 95834,
                            // 95815,
                            // 95831,
                            // 95822,
                            // 95823,
                            // 95829,
                            // 95830,
                            // 95690,
                            // 95693];

var coffeeShop = {
    name: 'my coffee shop',
    address: '1234 Park Ave',
    zipCode: '95674',
    coffeShopReviews: []
}                
var coffeeShopReview = {
    reviewerUsername: 'Mary Allen',
    reviewerEmail: 'mallen@gmail.com',
    shopName: 'Falcon Coffee',
    shopAddress: '12345 South North Street',
    categoryRatings: {
        wifi: 'slow',
        powerOutlets: 'some',
        food: 'none',
        alternativeBeverages: 'teas',
        spaceForMeetings: 'none',
        parking: 'private parking'
    }
}
var displayCount;
var queryCount;
var totalQueries;

firebase.initializeApp(config);
var database = firebase.database();
$('#add-review-button').attr("disabled", "disabled");
initializeReviewFormDropdowns();
function initializeReviewFormDropdowns() {
    // $("#coffee-shop-name").prop("selectedIndex", -1);
    // $("#coffee-shop-address").prop("selectedIndex", -1);
    // $("#coffee-shop-zipcode").prop("selectedIndex", -1);
    // $("#reviewers-name").prop("selectedIndex", -1);
    // $("#reviewers-email").prop("selectedIndex", -1);
    $("#food-rating").prop("selectedIndex", -1);
    $("#parking-rating").prop("selectedIndex", -1);
    $("#power-outlets-rating").prop("selectedIndex", -1);
    $("#meeting-space-rating").prop("selectedIndex", -1);
    $("#wifi-rating").prop("selectedIndex", -1);
    $("#beverage-alternative-rating").prop("selectedIndex", -1);
    $("#food-rating").prop("selectedIndex", -1);
    $("#overall-rating").prop("selectedIndex", -1);
}
// $(document).ready(function(){
//     $("button").click(function(){
//       $.getJSON("demo_ajax_json.js", function(result){
//         $.each(result, function(i, field){
//           $("div").append(field + " ");
//         });
//       });
//     });
//   });
var $customerReviewsTable = $("#customer-reviews-table");
// $.getJSON('coffeShopReview.json', function(data) {
//     var coffeShopReviewData = "";
//     $customerReviewsTable.empty();
//     $each(data, function(key, value) {
//         coffeShopReviewData += "<tr>";
//         coffeShopReviewData += "<td>" + value.coffeeShopName + "</td>";
//         coffeShopReviewData += "<td>" + value.coffeeShopAdress + "</td>";
//         coffeShopReviewData += "<td>" + value.Rating_category1 + "</td>";
//         coffeShopReviewData += "<td>" + value.Rating_category2 + "</td>";
//         coffeShopReviewData += "<td>" + value.Rating_category3 + "</td>";
//         coffeShopReviewData += "<td>" + value.Rating_category4 + "</td>";
//         coffeShopReviewData += "<td>" + value.Rating_category5 + "</td>";
//         coffeShopReviewData += "</tr>";
//     }); 
//     $customerReviewsTable.append(coffeShopReviewData);
// });

// firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
// // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ...
// });
var key = 'Under the Rainbow_555 Newton Place, Rancho Cordova, CA';
database.ref(key).on("value", function(snapshot) {
    var reviews = [];
    snapshot.forEach(function(data) {
        console.log(data.child('shopName').val());
        console.log(data.child('categories').val());
        reviews.push(data);
        // alert(data.key + " wifi=" + data.key.categoryRatings.wifi);
    });
    // for (i=0;i<reviews.length;i++) {
    //     alert("Wifi=" + reviews[i].child('categoryRatings').child('alternativeBeverages').val());
    // }
});
$("#hide-show-button").on('click', function() {
    if ($('#my-form').is(':visible')) {
        alert("Hiding form");
        $('#my-form').hide();
    } else {
        alert("Showing form");
        $('#my-form').show();
    }
});
$("#add-review-button").on('click', function(){
    pushCoffeeShopReviewToDatabase($("#coffee-shop-name").val(),
                                    $("#coffee-shop-address").val(),
                                    $("#coffee-shop-zipcode").val(),
                                    $("#reviewers-name").val(),
                                    $("#reviewers-email").val(),
                                    $("#food-rating").val(),
                                    $("#parking-rating").val(),
                                    $("#power-outlets-rating").val(),
                                    $("#meeting-space-rating").val(),
                                    $("#wifi-rating").val(),
                                    $("#beverage-alternative-rating").val());
});
$("#my-form :input").change(function() {
    var disable=false;
    $('#my-form').find('select').each(function(){ 
        if ($(this).prop('selectedIndex')==-1) {
            disable=true;
        }
    });
    if (disable) {
        $('#add-review-button').attr("disabled", "disabled");
    } else {
        $('#add-review-button').removeAttr("disabled");
    }
  });
  $('#generate-dummy-data-button').on('click', executeAJAXzipCodeQueries);

function generateDummyData() {
    var reviewerUsername;
    var reviewerEmail;
    var foodRating;
    var parkingRating;
    var powerOutletsRating;
    var spaceForMeetingsRating
    var wifiRating;
    var alternativeBeveragesRating;
    var firstNameIndex;
    var lastNameIndex;

    alert('Generating dummy data for ' + coffeeShopListItems.length);
    for (var i;i<coffeeShopListItems.length;i++) {
        firstNameIndex = Math.floor(Math.random() * firstNames.length);
        lastNameIndex = Math.floor(Math.random() * lastNames.length);
        reviewerUsername = firstNames[firstNameIndex] + " " + lastNames[lastNameIndex];
        reviewerEmail = lastNames[lastNameIndex] + "@gmail.com";
        foodRating = ratings[Math.floor(Math.random() * ratings.length)];
        parkingRating = ratings[Math.floor(Math.random() * ratings.length)];
        powerOutletsRating = ratings[Math.floor(Math.random() * ratings.length)];
        spaceForMeetingsRating = ratings[Math.floor(Math.random() * ratings.length)]
        wifiRating = ratings[Math.floor(Math.random() * ratings.length)];
        alternativeBeveragesRating = ratings[Math.floor(Math.random() * ratings.length)];
        alert('Adding review for coffee shop=' + coffeeShopListItems[i].shopName);
        pushCoffeeShopReviewToDatabase(coffeeShopListItems[i].shopName, 
                                        coffeeShopListItems[i].shopAddress, 
                                        coffeeShopListItems[i].shopZipcode,
                                        reviewerUsername,
                                        reviewerEmail,
                                        foodRating,
                                        parkingRating,
                                        powerOutletsRating,
                                        spaceForMeetingsRating,
                                        wifiRating,
                                        alternativeBeveragesRating);
}
function pushCoffeeShopReviewToDatabase(shopName, 
                                        shopAddress, 
                                        shopZipcode,
                                        reviewerUsername,
                                        reviewerEmail,
                                        foodRating,
                                        parkingRating,
                                        powerOutletsRating,
                                        spaceForMeetingsRating,
                                        wifiRating,
                                        alternativeBeveragesRating) {
  coffeeShopReview.shopName = shopName;
  coffeeShopReview.shopAddress = shopAddress;
  coffeeShopReview.shopZipcode = shopZipcode;
  coffeeShopReview.reviewerUsername = reviewerUsername;
  coffeeShopReview.reviewerEmail = reviewerEmail;
  coffeeShopReview.categoryRatings.food = foodRating;
  coffeeShopReview.categoryRatings.parking = parkingRating;
  coffeeShopReview.categoryRatings.powerOutlets = powerOutletsRating;
  coffeeShopReview.categoryRatings.spaceForMeetings = spaceForMeetingsRating;
  coffeeShopReview.categoryRatings.wifi = wifiRating;
  coffeeShopReview.categoryRatings.alternativeBeverages = alternativeBeveragesRating;
  var key = coffeeShopReview.shopName + '_' + coffeeShopReview.shopAddress;
  database.ref(key).push(coffeeShopReview);
  alert('pushCoffeeShopReviewToDatabase: Database updated');

}
function executeAJAXzipCodeQueries() {
    var startCount = 1;
    var queryURL;
    displayCount = 0;
    queryCount = 0;
    totalQueries = SacramentoAreaZipCodes.length;
    coffeeShopListItems = [];
    for (i=0;i<SacramentoAreaZipCodes.length;i++)
    {
        queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBqPdf_mEV6S3Q4dL6Y2Rg8EBsH-Oi2RUA&cx=000232087639553296774:quobpehcgrs&q=coffee&hq=" + 
            SacramentoAreaZipCodes[i] + "&start=" + startCount;
        // alert('Generating dummy data');
        getShopsData(queryURL);
        // alert("Number of shops found at zip code=" + SacramentoAreaZipCodes[i] + "=" + coffeeShopListItems.length);
    }
  }
  function AJAXqueryComplete() {
      alert('Completed AJAX query #' + queryCount);
  }
  $( document ).ajaxComplete(function() {
    AJAXqueryComplete();
  });
  function getShopsData(queryURL){
    $.ajax({
      url: queryURL,
      method: "GET" 
    }).then(function(response) {
        console.log(response);
        alert("Response");
        queryCount++;
        for (var i = 0; i< response.items.length; i++){
            if (response.items[i].pagemap.localbusiness === undefined || 
                response.items[i].pagemap.review === undefined ||
                response.items[i].title.includes("CLOSED")){
                console.log("not valid - response.items.length=" + response.items.length + " item=" + i);           
            }
            else{
                console.log(response.items[i].pagemap.localbusiness[0].name);
                displayCount++;
                coffeeShopListItem.name = response.items[i].pagemap.localbusiness[0].name;
                coffeeShopListItem.streetAddress = response.items[i].pagemap.postaladdress[0].streetaddress;
                coffeeShopListItem.addresslocality = response.items[i].pagemap.postaladdress[0].addresslocality;
                coffeeShopListItem.postalCode = response.items[i].pagemap.postaladdress[0].postalcode;
                coffeeShopListItems.push(coffeeShopListItem);
            }
        }
        if (totalQueries == queryCount) {
            alert("Last query completed"); 
            generateDummyData(); 
        }                
    });
};



