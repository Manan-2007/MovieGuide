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

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);


if (document.getElementById('login-btn')) {
    const loginBtn = document.getElementById('login-btn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMsg = document.getElementById('error-msg');

    const handleLogin = () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === '' || password === '') {
            errorMsg.style.display = 'block';
        } else {
            errorMsg.style.display = 'none';
            alert('Welcome back!');
            window.location.href = 'index.html';
        }
    };

    loginBtn.addEventListener('click', handleLogin);

    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loginBtn.click();
        }
    });
}

if (document.getElementById('signup-btn')) {
    const signupBtn = document.getElementById('signup-btn');
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMsg = document.getElementById('error-msg');

    const handleSignup = () => {
        const fullname = fullnameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (fullname === '' || email === '' || password === '') {
            errorMsg.style.display = 'block';
        } else {
            errorMsg.style.display = 'none';
            alert('Account Created Successfully!');
            window.location.href = 'index.html';
        }
    };

    signupBtn.addEventListener('click', handleSignup);

    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            signupBtn.click();
        }
    });
}