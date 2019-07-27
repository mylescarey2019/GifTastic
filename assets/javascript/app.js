// --------------------------------------------------------
// Gif Break web page
// ---------------------------------------------------------
// Summary:

// ---------------------------------------------------------

// ---------------------------------------------------------
// Methodology:
// ---------------------------------------------------------
// Logic layer:  javascript object/methods, button click events
// 
// Web-Page:  nesponsive layout leveraging bootstrap.
//    JQuery for dynamic activty of onpage objects and styles.
// 
// The "state" logic guides the experience and page activity
// as the player progresses thru each quiz 
// 
// State flow allows for game reset after completion
// Start/Restart and Next Quiz buttons are disable/enabled
// relative to the game state

// ---------------------------------------------------------
// Refactor Needs:
// ---------------------------------------------------------
// goals of this project were:
// 1.  get more experience with bootstrap and have a repsonsive design
// 2.  explore use of classes
// 3.  learn use of Timers
// 
// these goals were achieved.  classes were used to define
// Question and QuestionPool
// however, learning curve of new material, Timers, prevented
// completion of using more class and/or object on other parts
// of the design, instead global functions were leveraged
// So refactoring should include:
// 1. refactor to use class/objects for the timers
// 2. refactor to use class/objects for the game flow logic
// 3. refactor to have an object/methods for support to the page element updates
// 4. general code cleanup and reorganization 
// 5. update user stories/use cases to match final design

// ---------------------------------------------------------
// Enhancements:
// ---------------------------------------------------------
// 

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
  // terms array
  var gifTermArray = ["cats","anteaters","dogs","birds","cats omg","fish","lizard","panda","whales"];
  var retrievedTerms = [];

  // development variables - should be discarded after
  // development of objects is completed
  var searchTerm = "cat omg";
  
  // screen texts
  var instructionText = "instuctions go here" 
  
  
  
  
  // ---------------------------------------------------------
  // Objects, Classes & Methhods:
  // ---------------------------------------------------------
  
  // ---------------------------------------------------------
  // object for user interface - i.e. html page elements
  // ---------------------------------------------------------
  var userInterface = {
    // local variables go here

    // methods go here

    // hide carousel
    hideCarousel: function() {
      $('#slide-window').addClass('slide-window-hide');
      $('#slide-window').removeClass('slide-window-show');
      $("#carousel-control-prev").css("visibility","hidden");
      $("#carousel-control-next").css("visibility","hidden");
    },

    // show carousel
    showCarousel: function() {
      $('#slide-window').addClass('slide-window-show');
      $('#slide-window').removeClass('slide-window-hide');
      $("#carousel-control-prev").css("visibility","visible");
      $("#carousel-control-next").css("visibility","visible");
    },

    // clear the display of Gifs
    clearTermsFromPage: function () {
    //   $("#gif-div").empty();
      $("#carouselExampleIndicators>ol").remove();
      $("#carouselExampleIndicators>div").remove();

    },

    // get terms from Api and load to display
    getTermsFromApi: function(term) {
      // giphy API
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      term + "&api_key=0JE3zH3fHeV6OOG9CJYtmcvuFO8d0Gys&rating=g&limit=" + howManyGifs + '"';        

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
  
        console.log(response);

        var results = response.data;


      // <div id="gif-div">
      //   <ol class="carousel-indicators">
      //     <li data-target="#carouselExampleIndicators" data-slide-to="0"></li>
      //     <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      //     <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      //   </ol>
      //   <div class="carousel-inner">
      //     <div class="carousel-item active">
      //       <img src="assets/images/cat01.gif" class="d-block w-100" alt="...">
      //     </div>
      //     <div class="carousel-item">
      //       <img src="assets/images/cat02.gif" class="d-block w-100" alt="...">
      //     </div>
      //     <div class="carousel-item">
      //       <img src="assets/images/cat03.gif" class="d-block w-100" alt="...">
      //     </div>
      //   </div>
      // </div>

        console.log("length is: ", results.length);
        // build empty carousel ordered list 
        var carouselOl = $('<ol class="carousel-indicators">');
        console.log("ol: ", carouselOl);
        // append to the gif-div
        // $("#gif-div").append(carouselOl);
        // $("#gif-div").append('<div class="carousel-inner">');

        $("#carouselExampleIndicators").prepend('<div class="carousel-inner">');
        $("#carouselExampleIndicators").prepend(carouselOl);

      

        // build empty carousel inner div
        // var carouselInner = $('<div class="carousel-inner">');
        // var carouselInner = $('<div>');
        // carouselInner.addClass('carousel-inner');
        // console.log("inner: ", carouselInner);

        // append to the gif-div
 
       
        for (var i = 0; i < results.length; i++) {
          // build list items for carousel indicators
          if (i === 0) {
            var li = $('<li data-target="#carouselExampleIndicators" data-slide-to="' + i + '" class="active">');
            // li.addClass("active");
            console.log("li: ", li);
            $("#carouselExampleIndicators>ol").append(li);
            // $("#gif-div>ol").append(li);

          }
          else {
            var li = $('<li data-target="#carouselExampleIndicators" data-slide-to="' + i + '">');
            console.log("li: ", li);
            // $("#gif-div>ol").append(li);
            $("#carouselExampleIndicators>ol").append(li);
          };


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
          var img = $("<img>").attr("src",results[i].images.fixed_height.url);
          // var img = $("<img>").attr("src",results[i].images.fixed_width.url);
          img.addClass('d-block w-100');
          img.attr("alt",results[i].title);

          // append img tag
          carouselItemDiv.append(img);





        // // Step 3: uncomment the for loop above and the closing curly bracket below.
        // // Make a div with jQuery and store it in a variable named animalDiv.
        // // ============= put step 3 in between these dashes ======================
        // var animalDiv = $("<div>");
        // console.log(animalDiv);
        // // Make a paragraph tag with jQuery and store it in a variable named p.
        // var p = $("<p>");
        // console.log(p);

        // // Set the inner text of the paragraph to the rating of the image in results[i].
        // p.text("Rating: " + results[i].rating);
        // console.log(p);
        // // Make an image tag with jQuery and store it in a variable named animalImage.
        // var animalImage = $("<img>");
        // console.log(animalImage);

        // // Set the image's src to results[i]'s fixed_height.url.
        // animalImage.attr("src",results[i].images.fixed_height.url);
        // console.log(animalImage);

        // // Append the p variable to the animalDiv variable.
        // animalDiv.append(p);
        
        // // Append the animalImage variable to the animalDiv variable.
        // animalDiv.append(animalImage);
        // // Prepend the animalDiv variable to the element with an id of gifs-appear-here.
        // $("#gifs-appear-here").prepend(animalDiv); 


        // ==================================
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
  var localStorageTerms = {
    // local variables go here

    // methods go here
    clearStorage: function() {
      localStorage.clear();
    },

    // save terms array in local storage
    saveTermsInStorage: function(arr) {
      console.log("in localStorageTerms.saveTermsInStorage");
      console.log("terms to save in storage: ", arr);
      localStorage.setItem("terms",arr);
    },

    // get terms array from local storage
    getTermsFromStorage: function() {
      console.log("in localStorageTerms.getTermsFromStorage");
      var arr = localStorage.getItem("terms");
      // console.log("terms from storage: ",arr);

      return arr;ß
    }


  };

  
  // ----------------------------------------------------------------------------
  //  START OF PROGRAM FLOW
  // ----------------------------------------------------------------------------
  // init activity
  
  userInterface.clearTermsFromPage();
  userInterface.getTermsFromApi("cats");
  userInterface.showCarousel();
  // localStorageTerms.clearStorage();
  retrievedTerms = localStorageTerms.getTermsFromStorage();
  console.log("terms from storage: ", retrievedTerms);

  localStorageTerms.saveTermsInStorage(gifTermArray);
  // userInterface.hideCarousel();


  // userInterface.showCarousel();


  
  // ----------------------------------------------------------------------------
  // Events and timers
  // ----------------------------------------------------------------------------
 
  // answer button event
  //  cancel the question timer &  start the intermission timer
  $(".dropdown-item").on("click",function() {
    console.log("in global.dropdown-item click event");
    var clickedText = $(this).text();
    console.log("text is: ",clickedText); 
    userInterface.clearTermsFromPage();
    userInterface.getTermsFromApi(clickedText);
  });

  // $('.dropdown-menu a').on('click', function() {
  //   console.log("value is: ", $(this).val());
  // });


  // $(".dropdown-item").on("click", function(e) {
  //   console.log("in dropdown-item.on.click");
  //   console.log("CLICK: " + e.type);
  //   console.log("CLICK: " + e.which);
  //   console.log("CLICK: " + e.target);
  //   var button = $(event.target).closest('dropdown-item');
  //   console.log("You clicked on: ", button);
  //   console.log("that was: ", button.innerText);
  //   console.log("value is:  ", $(this).val());
   
    
  // });

  
// //  start - restart button event
//   $("#start-restart").on("click", function(event) {
//     event.preventDefault();
//     console.log("in start-restart.on.click");
//     // so the button read Start after a restart
//     // a true reset as if browser refreshed
//     $("start-restart").text("Start");
//     $(this).prop("disabled",true);

//     $(".bg-danger").attr("style","width: 0%");
//     $(".bg-success").attr("style","width: 0%");
//     $("#inner-container").addClass("hide-container");
//     $("#inner-container-2").removeClass("hide-container");
//     gameStartUp();
//     gameQuestions.resetPool(inlineQuestionData);
//     showQuestion();
//   });
  
  
  
//   //  next quiz button event
//   $("#next-set").on("click", function() {
//     console.log("in next-set.on.click");
//     $(this).prop("disabled",true);
//     $(".bg-danger").attr("style","width: 0%");
//     $(".bg-success").attr("style","width: 0%");
//     $(".bg-danger").text('');
//     $(".bg-success").text('');

//     $("#inner-container").addClass("hide-container");
//     $("#inner-container-2").removeClass("hide-container");
//     // get and reveil next qustion
//     showQuestion();
//   });
  
//   // answer button event
//   //  cancel the question timer &  start the intermission timer
//   $(".list-group-item-light").on("click", function(e) {
//     console.log("in list-group-item-light.on.click");
//     // console.log("CLICK: " + e.type);
//     // console.log("CLICK: " + e.which);
//     // console.log("CLICK: " + e.target);
//     var button = $(event.target).closest('button');
//     // console.log("You clicked on: ", button);
//     // console.log("that was: ", button.innerText);
//     // console.log("value is:  ", $(this).val());
   
//     // stop the question timer
//     stopQuestionCountdown();
//     // decrement questions remaining
//     questionsRemainingInSet--;
//     // show the answer - 2nd parameter is if timeOut occured, which it did not
//     showAnswer(currentQuestionInPlay.isCorrect(+$(this).val()),false);
//     startIntermissionCountdown(); 
//   });
  


// closes the document.ready
}) 
