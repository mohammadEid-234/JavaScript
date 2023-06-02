import { readMovies, updateMovies } from "./fileController.js";
import apiMovie from "./apiController.js";
import prompt from "prompt-sync";

let movies = [];
async function updateMoviesFile() {
  await updateMovies(JSON.stringify(movies, null, 2)).then(
    (success) => {
      console.log(success);
    },
    (fail) => {
      console.log(fail);
    }
  );
}
function getMovieInfo(movie) {
  return `title : ${movie.title} , year : ${movie.year} , director : ${movie.director} , rating : ${movie.rating} , genre : ${movie.genre}`;
}
let readInput = prompt();
const manageMovies = () => {
  console.log("Reading movies from movie.json...");
  readMovies().then(
    (moviesCatalog) => {
      movies = moviesCatalog;
      movies.forEach((val) => {
        console.log(getMovieInfo(val));
      });

      getUserInput();
    },
    (error) => {
      console.log(error);

      return;
    }
  );
};

function printUserGuide() {
  console.log("1. Add New Movie");
  console.log("2. Delete a Movie");
  console.log("3. Update Movies");
  console.log("4. Search for a movie");
  console.log("5. Fetch movies");
}

const getUserInput = async () => {
  while (true) {
    printUserGuide();
    let userInput = readInput("Please select an option or 'e' to exit: ");
    switch (userInput) {
      case "e":
        return;
      case "1":
        let title = readInput("Title : "),
          year = readInput("Year : "),
          director = readInput("Director: "),
          rating = readInput("Rating: "),
          genre = readInput("Genre : ");
        let movieObj = {
          title: title,
          year: parseInt(year),
          director: director,
          rating: parseFloat(rating),
          genre: genre,
        };
        movies.push(movieObj);
        await updateMoviesFile();

        break;
      case "2":
        movies.forEach((val) => {
          console.log(getMovieInfo(val));
        });
        let delTitle = readInput(
          "The title for the movie you want to delete :"
        );
        movies = movies.filter((value) => value.title !== delTitle);
        await updateMoviesFile();
        break;
      case "3":
        movies.forEach((val) => {
          console.log(getMovieInfo(val));
        });
        let updateTitle = readInput(
          "The title for the movie you want to update: "
        );
        let movieIndex = movies.findIndex(
          (value) => value.title === updateTitle
        );
        if (movieIndex === -1) {
          console.log("The movie you want to update does not exist");
        } else {
          let newTitle = readInput("Title : "),
            newYear = readInput("Year : "),
            newDirector = readInput("Director: "),
            newRating = readInput("Rating: "),
            newGenre = readInput("Genre : ");
          movies[movieIndex].title = newTitle;
          movies[movieIndex].year = parseInt(newYear);
          movies[movieIndex].director = newDirector;
          movies[movieIndex].rating = parseFloat(newRating);
          movies[movieIndex].genre = newGenre;
          await updateMoviesFile();
        }

        break;

      case "4":
        let searchFilter = readInput(
          "Search Filter (title/year/director/genre/rating): "
        );
        let searchText = readInput("Search text : ");
        let matchedMovies = [];
        if (searchFilter === "title") {
          matchedMovies = movies.filter((movie) =>
            movie.title.includes(searchText)
          );
        } else if (searchFilter === "year") {
          matchedMovies = movies.filter((movie) => movie.year == searchText);
        } else if (searchFilter === "director") {
          matchedMovies = movies.filter((movie) =>
            movie.director.includes(searchText)
          );
        } else if (searchFilter === "genre") {
          matchedMovies = movies.filter((movie) =>
            movie.genre.includes(searchText)
          );
        } else if (searchFilter === "rating") {
          matchedMovies = movies.filter((movie) => movie.rating == searchText);
        }
        console.log("Search Result : ");
        if (matchedMovies.length === 0) {
          console.log("No movies match your search text");
        } else {
          matchedMovies.forEach((movie) => {
            console.log(getMovieInfo(movie));
          });
          console.log("\n");
        }

        break;
      case "5":
        let apiResponse = await apiMovie();
     //   console.log(apiResponse);
       
        try{
            let movieObj = {
                "title": apiResponse.Title,
                "year": parseInt(apiResponse.Year),           
                "director":apiResponse.Director,
                "rating": parseInt(apiResponse.Ratings[0].Value),
                "genre": apiResponse.Genre     
            }
            movies.push(movieObj);
            await updateMoviesFile();
        }catch(exception){
            console.log("Error parsing api response "+exception);
        }
        
        break;
      default:
        console.log("Invalid choice");
        break;
    }
  }
};
const main = () => {
  console.log("Welcome to movies catalog");
  manageMovies();
};
main();
