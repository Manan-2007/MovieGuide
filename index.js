// =============================================
// SEARCH — movie search functionality
// =============================================

let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please enter a movie name </h3>`;
    }

    else {
        fetch(url).then((resp) => resp.json()).then((data) => {

            if (data.Response == "True") {
                result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                `;
            }

            else {
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })

            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
            });
    }
};

function quickSearch(name) {
    if (movieNameRef) {
        movieNameRef.value = name;
        getMovie();
    }
}

if (searchBtn) {
    searchBtn.addEventListener("click", getMovie);
    window.addEventListener("load", () => {
        if (movieNameRef && movieNameRef.value.trim() !== '') {
            getMovie();
        } else if (result) {
            result.innerHTML = `
                <div class="search-welcome">
                    <div class="welcome-icon">🎬</div>
                    <h2 class="welcome-title">Find Any Movie Instantly</h2>
                    <p class="welcome-sub">Type a movie name above and hit Search — get ratings, cast, plot, genre and more in seconds.</p>
                    <div class="welcome-chips">
                        <span onclick="quickSearch('Inception')">Inception</span>
                        <span onclick="quickSearch('Interstellar')">Interstellar</span>
                        <span onclick="quickSearch('The Dark Knight')">The Dark Knight</span>
                        <span onclick="quickSearch('Parasite')">Parasite</span>
                    </div>
                </div>
            `;
        }
    });
}