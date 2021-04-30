const movieApiKey = "f59588f382c7895cd8d35268297e4979";

//for search function - amalec 
//this is for the card with the movie information
var resultArea = document.querySelector("#results");




$("#searchBtn").click(function(){ 
 
  var movieSearchUrl=`https://api.themoviedb.org/3/search/movie?api_key=${movieApiKey}&query=${$("#movieSearch").val() }`;
  
 
fetch(movieSearchUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //I used the data to populate part of the results
    //only displays one
    // console.log(data);// json 
    // console.log(data.genres); //gives the Genres
    // console.log(data.original_title); //gives the Movie tittle
    // console.log(data.overview); //gives the movie description
    // console.log(data.poster_path); //gives the path to get the image. not the image itself
    //console.log(data.results[i].title); 
    

    //empties the results of movies
    $('#results').empty();

    for(i=0; i<10; i++){ $("#results").append(`    
    <div id="movieSearches" class="card column ">
      <div class="card-image ">
        <figure class="image is-4by3">
          <img src="http://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="${data.results[i].original_title}">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4 movie-tittle" >${data.results[i].title}</p>
          </div>
        </div>

      <div class="content">
      <p class="movie-overview"> movie summary</p>
      <p>${data.results[i].overview}</p>
       
        </div>
        <button  class="button addMovie" data-title="${data.results[i].title}"><i class="fas fa-ticket-alt"> Add to my list</i></button>
      </div>
    </div>`);
    }
  });
});


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}



// function that will run inside click for genres   
 function genreButtonEvent(event){

  let randomPage = getRandomInt(500);
  let selectedMovieId = $(this).attr("id");
  let genreSearchURL = `https://api.themoviedb.org/3/genre/${selectedMovieId}/movies?api_key=${movieApiKey}&language=en-US&page=${randomPage}`;
  

  fetch(genreSearchURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data){
    console.log(data);

    // need to grab 10 random movies from random pages
    $('#results').empty();

    for(i=0; i<10; i++){ $("#results").append(`    
    <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img src="http://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="${data.results[i].original_title}">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
        </div>
        <div class="media-content">
          <p class="title is-4">${data.results[i].title}</p>
        </div>
      </div>
  
      <div class="content">
      <p>${data.results[i].overview}</p>
       
        </div>
        <button  class="button addMovie" data-title="${data.results[i].title}"><i class="fas fa-ticket-alt"> Add to my list</i></button>
      </div>
    </div>
  </div>`
    
    //// new card
   
    
    
    );
    }
  });


 }   
  
/// populates movies accordingly to selected genre
$('.genreButton').click(genreButtonEvent);

//this array will store the saved movies list
var myMovieList = [];


// this will be a function to add the movies to the list
$("body").on("click", ".addMovie", function(){
  // console.log($(this).data("title"));//This is the title that will be added to the list buttons
  var movieItem = $(this).data("title");
  var itemAdded = $(`${movieItem}`);
  $("#watchList").append(`
  <div class="buttons has-addons">
  <button class="button" id="${movieItem}">${movieItem}</button>
  <button class="button remove-movie"><i class="fas fa-minus"></i></button>
</div>
  `)
  localStorage.setItem("movie", movieItem);
  itemAdded.textContent = movieItem;
 
})


// will add to this Amalecs code for adding movies
  //console.log($(".movie-tittle").text()); 
//   console.log($(this).attr("value")) 
//   $("#watchList").append(`${$(this).attr("value")}`)
// }) 

//Critics Review pull and links 
fetch("https://api.nytimes.com/svc/movies/v2/reviews/picks.json?order=by-publication-date&api-key=52r5MjsfbPQO7USvr34rtacLDbMv8AMP")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then(data => {
      console.log(data);
      const reviewElement = $("#reviews")
      reviewElement.innerText = data.results[0].display_title
       
        
      var titles =''  
      for (let i=0; i<10; i++){ 
        // console.log(i, data.results[i])
        // console.log(i, data.results[i].display_title)
        // titles = titles + data.results[i].display_title  

        // $("#findPicks").("reviews");
        reviewElement.append(`<a href="${data.results[i].link.url}" target="_blank"><button class="button is-info">${data.results[i].display_title }</button></a>`)
      }
    
    })
    .catch((error) => console.error("FETCH ERROR:", error)); 
