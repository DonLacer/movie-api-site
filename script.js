const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

const sortSelect = document.getElementById("sort-select");
let movies = [];


const movieList = document.getElementById("movieList");

const status = document.getElementById("status");

searchButton.addEventListener("click", async () => {
  const movie = searchInput.value;

  status.textContent = "Loading...";
  movieList.innerHTML = "";

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=75a3e9ce2dabee717b3cc82cf1e74555&query=${encodeURIComponent(movie)}`,
  );

  const data = await response.json();

  if (!response.ok) {
    status.textContent = "Something went wrong";
    return;
  }

  status.textContent = `${data.total_results} movies found`;

  movies = data.results;
  displayMovies(movies);
  
  console.log(data);

  movieList.innerHTML = "";

  data.results.forEach((movie) => {
    movieList.innerHTML += `
      <div class="movie">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
        <h2>${movie.title}</h2>
        <p>${movie.release_date}</p>
      </div>
    `;
  });
});


function displayMovies(movieArray) {
  movieList.innerHTML = "";

  movieArray.forEach((movie) => {
    movieList.innerHTML += `
      <div class="movie">
        <img
          src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
          alt="${movie.title}"
        />
        <h2>${movie.title}</h2>
        <p>${movie.release_date}</p>
      </div>
    `;
  });
}

sortSelect.addEventListener("change", () => {
  const sortedMovies = [...movies];

  if (sortSelect.value === "popularity.desc") {
    sortedMovies.sort((a, b) => b.popularity - a.popularity);
  } else if (sortSelect.value === "vote_average.desc") {
    sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
  } else if (sortSelect.value === "release_date.desc") {
    sortedMovies.sort(
      (a, b) => new Date(b.release_date) - new Date(a.release_date)
    );
  } else if (sortSelect.value === "release_date.asc") {
    sortedMovies.sort(
      (a, b) => new Date(a.release_date) - new Date(b.release_date)
    );
  }

  displayMovies(sortedMovies);
});

