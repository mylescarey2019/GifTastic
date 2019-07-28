// --------------------------------------------------------
// Gif Break web page
// ---------------------------------------------------------
// Summary:
// Gif retrieval page - allows user to search and save search
// terms which are loaded to a drop down list.
// Searches return 10 Gifs from Giphy API
// Search terms are persisted in local storage.
// User can remove all search terms via a clear button.
// ---------------------------------------------------------

// ---------------------------------------------------------
// Methodology:
// ---------------------------------------------------------
// Logic layer:  javascript object/methods, button click events
//    GIPHY API
// 
// Web-Page:  nesponsive layout leveraging bootstrap.
//    JQuery for dynamic activty of onpage objects and styles.
// 
// ---------------------------------------------------------
// Refactor Needs:
// ---------------------------------------------------------
// goals of this project were:
// 1.  use API to retrieve data
// 2.  leverage local storage
// 3.  get more experience with bootstrap and have a repsonsive design
// 
// 4. above was achieved, but the javascript could use a bit of 
//    re-organization and reduction of over-engineering in places
// 5. did not get the requirement of start/stop Gifs via click
//    woudl like to revisit and add this in


// ---------------------------------------------------------
// Enhancements:
// ---------------------------------------------------------
// 1. revisit to re-add active slide indicators/click to jump 
//    controls.  I had to take these out for lack of time 
//    needed to learn how to re-bind the carousel items 
//    after the page dynamically loads them for each new seach

// ---------------------------------------------------------
// User Stories / Use Cases
// ---------------------------------------------------------

// 0.  This was the intended Use Case and program flow - final result was close to this
//     although some differences to evolve during development.  See javascript code header
//     for more details.

// 1.  page loads for the user
//     1. page has header bar with title on left, right side has dropdown for saved searches, search text input box
//        and clear search button
//     2. dropdown box will be populated with any saved searches (from local storage)
//     3. instruction messsage is shown
//     4. gif display is empty (or maybe i will decide to load firt search - TBD)
    
// 2.  user selects a saved search term from dropdown box
//     1. dipslay loads with gifs for the selected term
//     2. display allows user to scroll (if using carousle

// 3.  user enters search term in search input box/clicks search
//     1. term is used to search for gifs 
//     2. if none found - display message
//     3. if found then add term to the dropdown list and update the locally storage saved list
//     4. display found gifs 

// 4.  user clicks Clear Search button
//     1. remove all entries from the dropdown list
//     2. clear the local stored saved list
//     3. clear the gif display

// ### Psuedo Code - notes

// 1. Global
//     1. Variables
//     2. Functions

// 2. Objects/Classes
//     1. Terms (static object)
//         1. Properties
//             1. search term array
//         2. Methods
//             1. add term
//             2. clear terms
//             3. save to local storage
//             4. clear from local storage
//             5. load from local storage
//     2. User Interface (static object)
//         1. Properties
//             1. instruction message
//             2. non gifs found message
//             3. clear search term message
//         2. Methods
//             1. display message
//             2. clear gif display
//             3. load gif display

// 3. Events/Listeners/Timers
//     1. on click for dropdown control
//     2. on click for search term box
//     3. on click for clear search button  

// ---------------------------------------------------------
// Global Variables
// ---------------------------------------------------------
// initial some variables to be used in questionPool
// maybe this goes in a game object but not sure
$(document).ready(function(){

  // how many Gifs to retrieve
  var howManyGifs = 10;

  // ---------------------------------------------------------
  // Objects, Classes & Methhods:
  // ---------------------------------------------------------
  
  // ---------------------------------------------------------
  // object for user interface - i.e. html page elements
  // ---------------------------------------------------------
  var userInterface = {
    // local variables go here:

    // methods go here:

    // hide carousel
    hideCarousel: function() {
      console.log("in userInterface.hideCarousel");
      $('#slide-window').addClass('slide-window-hide');
      $('#slide-window').removeClass('slide-window-show');
      $("#carousel-control-prev").css("visibility","hidden");
      $("#carousel-control-next").css("visibility","hidden");
    },

    // show carousel
    showCarousel: function() {
      console.log("in userInterface.showCarousel");
      $('#slide-window').addClass('slide-window-show');
      $('#slide-window').removeClass('slide-window-hide');
      $("#carousel-control-prev").css("visibility","visible");
      $("#carousel-control-next").css("visibility","visible");
    },

    // clear the display of Gifs
    clearTermsFromPage: function () {
      console.log("in userInterface.clearTermsFromPage");
      $("#myCarousel>ol").remove();
      $("#myCarousel>div").remove();
    },


    // clear terms from drop down list
    clearTermsFromDropDownList: function () {
      console.log("in userInterface.clearTermsFromDropDownList");
      $(".dropdown-menu").empty();
    },

    // build drop down list
    buildDropDownList: function () {
      console.log("in userInterface.buildDropDownList");

      // build drop down control items

      for (var i = 0; i < gifTerms.gifTermArray.length; i++) {
        var a = $('<a class="dropdown-item" data-value="' + gifTerms.gifTermArray[i] + '" href="#">' + gifTerms.gifTermArray[i] + '</a>');
        $(".dropdown-menu").append(a);
      };
    },

    // get terms from Api and load to display
    getTermsFromApi: function(term) {
      console.log("in userInterface.getTermsFromApi");
      console.log("api term is: ", term);
      // giphy API
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      term + "&api_key=0JE3zH3fHeV6OOG9CJYtmcvuFO8d0Gys&rating=g&limit=" + howManyGifs + '"';        

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
  
        console.log(response);

        var results = response.data;
        console.log("length is: ", results.length);

        //  *** taking out until time to resolve issue ***
            // // build empty carousel ordered list 
            // var carouselOl = $('<ol class="carousel-indicators">');
            // console.log("ol: ", carouselOl);
            //     // append to the gif-div
            //     // $("#gif-div").append(carouselOl);
            //     // $("#gif-div").append('<div class="carousel-inner">');

        $("#myCarousel").prepend('<div class="carousel-inner">');

        //  *** taking out until time to resolve issue ***
        // $("#myCarousel").prepend(carouselOl);

        // append to the gif-div

        for (var i = 0; i < results.length; i++) {
          //  *** taking out until time to resolve issue ***
          // // build list items for carousel indicators  
          // if (i === 0) {
          //   var li = $('<li data-target="#myCarousel" data-slide-to="' + i + '" class="active">');
          //   // li.addClass("active");
          //   console.log("li: ", li);
          //   $("#myCarousel>ol").append(li);
          //   // $("#gif-div>ol").append(li);

          // }
          // else {
          //   var li = $('<li data-target="#myCarousel" data-slide-to="' + i + '">');
          //   console.log("li: ", li);
          //   // $("#gif-div>ol").append(li);
          //   $("#myCarousel>ol").append(li);
          // };


          // build inner item div
          if (i === 0) {
            var carouselItemDiv = $('<div class="carousel-item active">');
          }
          else {
            var carouselItemDiv = $('<div class="carousel-item">');
          };
         
          // append the ItemDiv
          $(".carousel-inner").append(carouselItemDiv);

          // build img tag
          var img = $("<img>").attr("src",results[i].images.downsized.url);
          img.addClass('d-block w-100');
          img.attr("alt",results[i].title);

          // append img tag
          carouselItemDiv.append(img);
        }
      });
    },  

    // diagnostic output to console
    diagnosticDump: function() {
      console.log("------------------------")
      console.log("in global.diagnosticDump"); 
      console.log("gifs to retrieve: ", howManyGifs);
      console.log("------------------------")
      
    }
  }

  // ---------------------------------------------------------
  // object for search terms  
  // ---------------------------------------------------------
  var gifTerms = {
    // local variables go here
    gifTermArray: [],

    // methods go here
    clearStorage: function(prop) {
      console.log("in gifTerms.clearStorage");
      localStorage.removeItem(prop);
    },

    // save terms array in local storage
    saveTermsInStorage: function() {
      console.log("in gifTerms.saveTermsInStorage");
      console.log("terms to save in storage: ", this.gifTermArray);
      localStorage.setItem("terms",this.gifTermArray);
    },

    // get terms array from local storage
    getTermsFromStorage: function() {
      console.log("in gifTerms.getTermsFromStorage");
      var arr = localStorage.getItem("terms");
      console.log("terms from storage: ",arr);
      if (arr === null) {
        console.log("no saved searches on local storage");
      }
      else {
        this.gifTermArray =  localStorage.getItem("terms").split(','); //arr.split(',');
      }
    
      // return arr;
    },

    // add term 
    addTerm: function(term) {
      console.log("in gifTerms.addTerm");
      console.log("adding term: " + term);
      this.gifTermArray.push(term);
      console.log("number of saved terms: ",gifTerms.gifTermArray.length);
      this.clearStorage("terms");
      this.saveTermsInStorage();


      var a = $('<a class="dropdown-item" data-value="' + term + '" href="#">' + term + '</a>');
      $(".dropdown-menu").append(a);
    },

    // need method to save the Active drop down item into local storage
    saveActiveDropDownItemInStorage: function (activeItem) {
      console.log("in gifTerms.saveActiveDropDownItemInStorage");
      localStorage.setItem("active-item",activeItem);
    },

    // need method to clear the Active drop down item from local storage
    clearActiveDropDownItemFromStorage: function () {
      console.log("in gifTerms.clearctiveDropDownItemFromStorage");
      gifTerms.clearStorage("active-item");
    },

    // need method to get the Active drop down item from local storage
    getActiveDropDownItemFromStorage: function () {
      console.log("in gifTerms.getActiveDropDownItemFromStorage");
      var activeItem = localStorage.getItem("active-item");
      return activeItem;
    },

    // clear the gif term array
    clearGifTermArray: function () {
      console.log("in gifTerms.clearGifTermArray");
      this.gifTermArray.splice(0,this.gifTermArray.length);
    },
  };

  
  // ----------------------------------------------------------------------------
  //  START OF PROGRAM FLOW
  // ----------------------------------------------------------------------------

  userInterface.hideCarousel();
  gifTerms.getTermsFromStorage();
  
  console.log("gifTermsArray is now: ",gifTerms.gifTermArray)
  if (gifTerms.gifTermArray.length > 0) {
    userInterface.showCarousel();
    userInterface.buildDropDownList();
    
    var activeItem = gifTerms.getActiveDropDownItemFromStorage();
    if (activeItem !== ''){
      $('.dropdown-item[data-value="' + activeItem +'"]').addClass("active");
      userInterface.getTermsFromApi(activeItem);
    }
    else {
      // should not be in this state, but if so then set/load first from list
      $('.dropdown-item[data-value="' + gifTerms.gifTermArray[0] +'"]').addClass("active");
      userInterface.getTermsFromApi(gifTerms.gifTermArray[0]);
    };
  }
  else {
    // no saved searchs so show instruction modal
    console.log("in modal section");
    $('#my-modal').modal('show');
  }
  
  // ----------------------------------------------------------------------------
  // Events and timers
  // ----------------------------------------------------------------------------
 
  $(document).on("click", ".dropdown-item", function() {
    console.log("in global.dropdown-item click event");
    console.log("you pressed: " + $(this).data("value"));
    var clickedText = $(this).text();
    console.log("text is: ",clickedText); 
    userInterface.clearTermsFromPage();
    userInterface.getTermsFromApi(clickedText);
    $('.dropdown-item.active').removeClass("active");
    $('.dropdown-item[data-value="' + clickedText +'"]').addClass("active");
    gifTerms.clearStorage("active-item");
    gifTerms.saveActiveDropDownItemInStorage(clickedText);
    if (gifTerms.gifTermArray.length === 1) {
      // first term so carousel is probably hidden
      userInterface.showCarousel();
    };
  });


  // get value for search box
  $("#search-btn").on("click", function(event) {
    console.log("in global.search-btn click event");
    event.preventDefault();

    var search = $("#search-input").val().trim();
    console.log("you typed: " + search);
    if (search !== '') { 
      userInterface.clearTermsFromPage();
      userInterface.getTermsFromApi(search);
      gifTerms.addTerm(search);
      $('.dropdown-item.active').removeClass("active");
      $('.dropdown-item[data-value="' + search +'"]').addClass("active");
      $("#search-input").val('');
      gifTerms.clearStorage("active-item");
      gifTerms.saveActiveDropDownItemInStorage(search);
      if (gifTerms.gifTermArray.length === 1) {
        // first term so carousel is probably hidden
        userInterface.showCarousel();
      };
    };
  });

  // clear button event
  $("#clear-btn").on("click",function() {
    console.log("in global.clear-btn click event")
    // need to call gifTerm methods to
    // clear gifTerm array
    // clear the drop down box
    // clear local storage
    gifTerms.clearGifTermArray();
    userInterface.clearTermsFromDropDownList();
    gifTerms.clearStorage("terms");
    gifTerms.clearActiveDropDownItemFromStorage();

  
  });


// closes the document.ready
}) 
