$(function () {

  let currentId = 0;
  let moviesList = [];

  $("#new-movie-form").on("submit", function (evt) {
    evt.preventDefault();
    let title = $("#title").val();
    let rating = $("#rating").val();

    let movieData = { title, rating, currentId };
    const HTMLtoAppend = createMovieDataHTML(movieData);

    currentId++;
    moviesList.push(movieData);

    $("#movie-table-body").append(HTMLtoAppend);
    $("#new-movie-form").trigger("reset");
  });

  $("tbody").on("click", ".btn.btn-danger", function (evt) {
    // Find the index where this movie is
    let indexToRemoveAt = moviesList.findIndex(
      (movie) => movie.currentId === +$(evt.target).data("deleteId")
    );

    // Remove it from the array of movies
    moviesList.splice(indexToRemoveAt, 1);

    // Remove it from the DOM
    $(evt.target).closest("tr").remove();
  });

  $(".fas").on("click", function (evt) {
    // Figure out what direction we are sorting and the key to sort by
    let direction = $(evt.target).hasClass("fa-sort-down") ? "down" : "up";
    let keyToSortBy = $(evt.target).attr("id");
    let sortedMovies = sortBy(moviesList, keyToSortBy, direction);

    // Empty the table
    $("#movie-table-body").empty();

    // Loop over our object of sortedMovies and append a new row
    for (let movie of sortedMovies) {
      const HTMLtoAppend = createMovieDataHTML(movie);
      $("#movie-table-body").append(HTMLtoAppend);
    }

    // Toggle the arrow
    $(evt.target).toggleClass("fa-sort-down");
    $(evt.target).toggleClass("fa-sort-up");
  });
});

function sortBy(array, keyToSortBy, direction) {
  return array.sort(function (a, b) {
    if (keyToSortBy === "rating") {
      a[keyToSortBy] = +a[keyToSortBy];
      b[keyToSortBy] = +b[keyToSortBy];
    }
    if (a[keyToSortBy] > b[keyToSortBy]) {
      return direction === "up" ? 1 : -1;
    } else if (b[keyToSortBy] > a[keyToSortBy]) {
      return direction === "up" ? -1 : 1;
    }
    return 0;
  });
}

function createMovieDataHTML(data) {
  return `
    <tr>
      <td>${data.title}</td>
      <td>${data.rating}</td>
      <td>
        <button class="btn btn-danger" data-delete-id=${data.currentId}>
          Delete
        </button>
      </td>
    </tr>
  `;
}
