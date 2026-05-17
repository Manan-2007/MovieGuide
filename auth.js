// ── 1. Core Auth Functions ──────────────────────────────────────

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('movieguide_current_user')) || null;
}

function registerUser(fullname, email, password) {
    const users = JSON.parse(localStorage.getItem('movieguide_users') || '[]');
    const exists = users.find(u => u.email === email);
    if (exists) {
        return { success: false, message: 'An account with this email already exists.' };
    }
    users.push({ fullname, email, password });
    localStorage.setItem('movieguide_users', JSON.stringify(users));
    localStorage.setItem('movieguide_current_user', JSON.stringify({ fullname, email }));
    return { success: true };
}

function loginUser(emailOrName, password) {
    const users = JSON.parse(localStorage.getItem('movieguide_users') || '[]');
    const user = users.find(u =>
        (u.email === emailOrName || u.fullname === emailOrName) && u.password === password
    );
    if (user) {
        localStorage.setItem('movieguide_current_user', JSON.stringify({ fullname: user.fullname, email: user.email }));
        return { success: true, user };
    }
    return { success: false, message: 'Invalid credentials. Please try again.' };
}

function logoutUser() {
    localStorage.removeItem('movieguide_current_user');
    window.location.href = 'login.html';
}


// ── 2. Nav Update ───────────────────────────────────────────────

function updateNavForAuth() {
    const user = getCurrentUser();
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('nav');
    if (!navLinks || !nav) return;

    // Always-visible links (shown to everyone)
    const publicLinks = ['home.html', 'login.html'];

    // Get all <li> items in nav
    const items = navLinks.querySelectorAll('li');
    items.forEach(li => {
        const a = li.querySelector('a');
        if (!a) return;
        const href = a.getAttribute('href') || '';
        const isPublic = publicLinks.some(p => href.includes(p));

        if (!user && !isPublic) {
            li.style.display = 'none';   // hide protected links
        } else {
            li.style.display = '';       // show all if logged in
        }
    });

    // If logged in: hide Login link and add a user pill to nav
    if (user) {
        const loginLink = navLinks.querySelector('a[href="login.html"]');
        const loginLi = loginLink ? loginLink.closest('li') : null;
        if (loginLi) loginLi.style.display = 'none';

        // Remove existing pill if any (prevents duplicates)
        const existingPill = nav.querySelector('.nav-user-pill');
        if (existingPill) existingPill.remove();

        // Create the user pill element
        const pill = document.createElement('div');
        pill.className = 'nav-user-pill';
        pill.innerHTML = `
            <div class="nav-avatar">${user.fullname.charAt(0).toUpperCase()}</div>
            <span class="nav-username">${user.fullname}</span>
            <a href="#" class="nav-logout-btn" onclick="logoutUser(); return false;">Logout</a>
        `;
        nav.appendChild(pill);
    }
}


// ── 3. Page-Specific Event Listeners (DOMContentLoaded) ─────────

document.addEventListener('DOMContentLoaded', function () {
    updateNavForAuth();
    initSignup();
    initLogin();
    initReset();

    // ── Global Background Particles ──
    const particlesContainer = document.getElementById('global-particles');
    if (particlesContainer) {
        for (let i = 0; i < 25; i++) {
            const p = document.createElement('div');
            p.classList.add('particle');
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 8 + 's';
            p.style.animationDuration = (6 + Math.random() * 6) + 's';
            p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
            particlesContainer.appendChild(p);
        }
    }
});

function initSignup() {
    const signupBtn = document.getElementById('signup-btn');
    if (!signupBtn) return;

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
            errorMsg.textContent = 'Please fill in all fields';
            if (successMsg) successMsg.style.display = 'none';
        } else {
            errorMsg.style.display = 'none';

            const result = registerUser(fullname, email, password);

            if (!result.success) {
                errorMsg.textContent = result.message;
                errorMsg.style.display = 'block';
                return;
            }

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

function initLogin() {
    const loginBtn = document.getElementById('login-btn');
    if (!loginBtn) return;

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
            const result = loginUser(username, password);

            if (result.success) {
                errorMsg.style.display = 'none';
                // Post-login redirect: go back to the page they tried to visit
                const redirect = sessionStorage.getItem('movieguide_redirect');
                sessionStorage.removeItem('movieguide_redirect');
                window.location.href = redirect || 'index.html';
            } else {
                errorMsg.textContent = result.message;
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

function initReset() {
    const emailStep = document.getElementById('email-step');
    if (!emailStep) return;

    const otpStep = document.getElementById('otp-step');
    const resetStep = document.getElementById('reset-step');
    const successStep = document.getElementById('success-step');

    const resetEmailInput = document.getElementById('reset-email');
    const resetBtn = document.getElementById('reset-btn');
    const emailError = document.getElementById('email-error');

    const otpInput = document.getElementById('otp-input');
    const verifyBtn = document.getElementById('verify-btn');
    const otpError = document.getElementById('otp-error');

    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const doResetBtn = document.getElementById('do-reset-btn');
    const resetPwdError = document.getElementById('reset-pwd-error');

    const gotoLoginBtn = document.getElementById('goto-login-btn');

    const DEMO_OTP = '1234';
    let resetEmail = '';

    const showError = (el, msg) => { el.textContent = msg; el.style.display = 'block'; };
    const hideError = (el) => { el.style.display = 'none'; };

    // Step 1: Email submission
    resetBtn.addEventListener('click', () => {
        hideError(emailError);
        const email = resetEmailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            showError(emailError, 'Please enter a valid email address');
            return;
        }

        const users = JSON.parse(localStorage.getItem('movieguide_users') || '[]');
        const user = users.find(u => u.email === email);
        if (!user) {
            showError(emailError, 'No account found with this email address');
            return;
        }

        resetEmail = email;
        resetBtn.disabled = true;
        resetBtn.textContent = 'Sending...';

        setTimeout(() => {
            resetBtn.disabled = false;
            resetBtn.textContent = 'Send Reset Code';
            emailStep.style.display = 'none';
            otpStep.style.display = 'block';
        }, 1000);
    });

    // Step 2: OTP verification
    verifyBtn.addEventListener('click', () => {
        hideError(otpError);
        const code = otpInput.value.trim();

        if (!code) {
            showError(otpError, 'Please enter the verification code');
            return;
        }

        if (code !== DEMO_OTP) {
            showError(otpError, 'Invalid verification code. Try: 1234');
            return;
        }

        otpStep.style.display = 'none';
        resetStep.style.display = 'block';
    });

    // Step 3: New password
    doResetBtn.addEventListener('click', () => {
        hideError(resetPwdError);
        const newPwd = newPasswordInput.value.trim();
        const confirmPwd = confirmPasswordInput.value.trim();

        if (!newPwd || !confirmPwd) {
            showError(resetPwdError, 'Please fill in both password fields');
            return;
        }

        if (newPwd.length < 6) {
            showError(resetPwdError, 'Password must be at least 6 characters');
            return;
        }

        if (newPwd !== confirmPwd) {
            showError(resetPwdError, 'Passwords do not match');
            return;
        }

        const users = JSON.parse(localStorage.getItem('movieguide_users') || '[]');
        const idx = users.findIndex(u => u.email === resetEmail);
        if (idx !== -1) {
            users[idx].password = newPwd;
            localStorage.setItem('movieguide_users', JSON.stringify(users));
        }

        resetStep.style.display = 'none';
        successStep.style.display = 'block';
    });

    // Step 4: Go to login
    gotoLoginBtn.addEventListener('click', () => {
        window.location.href = 'login.html';
    });
}


// ── 4. Route Guard ────────────────────────────────────────────

(function routeGuard() {
    const user = getCurrentUser();

    // Pages that require login to access
    const protectedPages = [
        'index.html', 'trending.html', 'about.html'
    ];

    // Detect current page filename
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1) || 'home.html';

    const isProtected = protectedPages.some(p => page === p || page === p.replace('.html', ''));

    if (isProtected && !user) {
        // Save the page they tried to visit so we can redirect back after login
        sessionStorage.setItem('movieguide_redirect', window.location.href);
        window.location.replace('login.html');
    }
})();
