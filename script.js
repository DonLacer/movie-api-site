const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

const movieList = document.getElementById("movieList");

const status = document.getElementById("status");

searchButton.addEventListener("click", async () => {
  const movie = searchInput.value;

  status.textContent = "Loading...";
  movieList.innerHTML = "";

  const response = await fetch(
    `https://www.omdbapi.com/?apikey=25089713&s=${movie}`,
  );

  const data = await response.json();

  if (data.Response === "False") {
    status.textContent = data.Error;
    return;
  }

  status.textContent = `${data.totalResults} movies found`;

  console.log(data);

  movieList.innerHTML = "";

  data.Search.forEach((movie) => {
    movieList.innerHTML += `
      <div class="movie">
        <img src="${movie.Poster}" alt="${movie.Title}" />
        <h2>${movie.Title}</h2>
        <p>${movie.Year}</p>
      </div>
    `;
  });
});
