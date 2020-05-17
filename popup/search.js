async function search() {
  const apiKey = "9d07441f";
  const search = document.querySelector("input[name=search]");

  console.log(encodeURIComponent(search.value));

  const response = await fetch(
    `https://www.omdbapi.com/?t=${encodeURIComponent(
      search.value
    )}&apikey=${apiKey}`
  );
  console.log(response);
  const json = await response.json();
  console.log(json);
  const { Title, Year, Genre, Plot, imdbRating, Response, Error } = json;

  const error = document.querySelector("#error");
  const title = document.querySelector("#title");
  const year = document.querySelector("#year");
  const genre = document.querySelector("#genre");
  const rating = document.querySelector("#rating");
  const plot = document.querySelector("#plot");

  if (Response === "False" || Error) {
    error.textContent = Error;
  } else {
    title.textContent = Title;
    year.textContent = `(${Year})`;
    genre.textContent = `[${Genre}]`;
    rating.textContent = "Rating: " + imdbRating;
    plot.textContent = Plot;
  }
}

document.querySelector("button[name=submit]").addEventListener("click", search);
document.body.addEventListener("keyup", (event) => {
  if (event.keyCode === 13 || event.key === "Enter") search();
});
