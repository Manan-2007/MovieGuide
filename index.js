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

if (searchBtn) {
    searchBtn.addEventListener("click", getMovie);
    window.addEventListener("load", getMovie);
}


// ===== SIGNUP =====
if (document.getElementById('signup-btn')) {
    const signupBtn = document.getElementById('signup-btn');
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMsg = document.getElementById('error-msg');
    const successMsg = document.getElementById('signup-success');

    const handleSignup = () => {
        const fullname = fullnameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (fullname === '' || email === '' || password === '') {
            errorMsg.style.display = 'block';
            if (successMsg) successMsg.style.display = 'none';
        } else {
            errorMsg.style.display = 'none';

            // Store user data in localStorage
            const users = JSON.parse(localStorage.getItem('movieguide_users') || '[]');
            // Check if email already exists
            const exists = users.find(u => u.email === email);
            if (exists) {
                errorMsg.textContent = 'An account with this email already exists';
                errorMsg.style.display = 'block';
                return;
            }
            users.push({ fullname, email, password });
            localStorage.setItem('movieguide_users', JSON.stringify(users));

            if (successMsg) {
                successMsg.textContent = '✅ Account Created Successfully!';
                successMsg.style.display = 'block';
            }

            // Redirect to login after a short delay
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        }
    };

    signupBtn.addEventListener('click', handleSignup);

    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            signupBtn.click();
        }
    });
}


// ===== LOGIN =====
if (document.getElementById('login-btn')) {
    const loginBtn = document.getElementById('login-btn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMsg = document.getElementById('error-msg');

    const handleLogin = () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === '' || password === '') {
            errorMsg.textContent = 'Please fill in both fields';
            errorMsg.style.display = 'block';
        } else {
            // Check against stored users (match email or fullname)
            const users = JSON.parse(localStorage.getItem('movieguide_users') || '[]');
            const user = users.find(u =>
                (u.email === username || u.fullname === username) && u.password === password
            );

            if (user) {
                errorMsg.style.display = 'none';
                localStorage.setItem('movieguide_currentUser', JSON.stringify(user));
                alert(`Welcome back, ${user.fullname}!`);
                window.location.href = 'index.html';
            } else if (users.length === 0) {
                // No users registered yet — let them through with a generic welcome
                errorMsg.style.display = 'none';
                alert('Welcome back!');
                window.location.href = 'index.html';
            } else {
                errorMsg.textContent = 'Invalid username/email or password';
                errorMsg.style.display = 'block';
            }
        }
    };

    loginBtn.addEventListener('click', handleLogin);

    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loginBtn.click();
        }
    });
}


// ===== FORGOT PASSWORD =====
if (document.getElementById('reset-btn')) {
    const resetBtn = document.getElementById('reset-btn');
    const resetEmailInput = document.getElementById('reset-email');
    const resetSuccess = document.getElementById('reset-success');
    const resetError = document.getElementById('reset-error');

    const handleReset = () => {
        const email = resetEmailInput.value.trim();

        // Hide previous messages
        resetSuccess.style.display = 'none';
        resetError.style.display = 'none';

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === '' || !emailRegex.test(email)) {
            resetError.textContent = 'Please enter a valid email address';
            resetError.style.display = 'block';
            return;
        }

        // Check if the email exists in stored users
        const users = JSON.parse(localStorage.getItem('movieguide_users') || '[]');
        const user = users.find(u => u.email === email);

        if (!user) {
            resetError.textContent = 'No account found with this email address';
            resetError.style.display = 'block';
            return;
        }

        // Simulate sending a reset link
        resetBtn.disabled = true;
        resetBtn.textContent = 'Sending...';

        setTimeout(() => {
            resetSuccess.style.display = 'block';
            resetBtn.textContent = 'Link Sent ✓';

            // Generate a simple "reset token" for demo purposes
            const resetToken = Date.now().toString(36);
            localStorage.setItem('movieguide_resetToken', JSON.stringify({
                email: email,
                token: resetToken,
                expires: Date.now() + 3600000 // 1 hour
            }));

            // Re-enable after 5 seconds
            setTimeout(() => {
                resetBtn.disabled = false;
                resetBtn.textContent = 'Send Reset Link';
            }, 5000);
        }, 1500);
    };

    resetBtn.addEventListener('click', handleReset);

    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            resetBtn.click();
        }
    });
}