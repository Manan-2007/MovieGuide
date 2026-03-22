# 🎬 MovieGuide

> *Your personal cinema companion — search, discover, and explore movies in style.*

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![OMDb API](https://img.shields.io/badge/OMDb_API-FFB92A?style=for-the-badge&logo=imdb&logoColor=black)

---

## 📖 About the Project

**MovieGuide** is a responsive, multi-page web application that gives users instant access to movie information, ratings, and curated picks — all wrapped in a sleek dark-themed UI. Built with pure HTML, CSS, and Vanilla JavaScript, it demonstrates practical frontend skills through real API integration, DOM manipulation, and seamless multi-page navigation.

Whether you're looking up a classic or checking out what's trending, MovieGuide brings the data to your fingertips.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **Real-Time Search** | Search any movie and instantly get its poster, plot, cast, IMDb rating, and more via the OMDb API |
| 📈 **Trending Now** | A curated "Editor's Picks" page showcasing handpicked movies in a responsive card grid |
| 🔐 **Auth Flow** | Functional Login & Sign Up pages with form validation and JS-based redirection |
| 📱 **Responsive Design** | Fully mobile-friendly layout using CSS Grid and Flexbox |
| 🎨 **Dark Theme UI** | Consistent, cinematic dark aesthetic with gold accents (`#1c1917` + `#ffb92a`) |
| 👥 **About Page** | Team profile section with role descriptions and bios |

---

## 🗂️ Project Structure

```
MovieGuide/
│
├── index.html          # Home page — movie search
├── trending.html       # Trending / Editor's Picks page
├── about.html          # Meet the team
├── login.html          # Login page
├── signup.html         # Sign Up page
│
├── style.css           # Global stylesheet (dark theme, responsive)
├── index.js            # Core JavaScript — API calls, DOM updates, auth logic
├── key.js              # OMDb API key
│
└── img/
    └── logo.ico        # Site favicon
```

---

## 🚀 Getting Started

### Prerequisites

No frameworks or package managers needed. Just a browser and an internet connection.

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/movieguide.git
   cd movieguide
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html
   ```
   Or use the **Live Server** extension in VS Code for the best experience.

3. **API Key** *(already included)*
   The project uses a free [OMDb API](https://www.omdbapi.com/) key stored in `key.js`. To use your own:
   ```js
   // key.js
   key = "YOUR_API_KEY_HERE";
   ```
   Get a free key at [omdbapi.com](https://www.omdbapi.com/apikey.aspx).

---

## 🖥️ Pages Overview

### 🏠 Search (Home)
The core of the app. Type any movie name and hit **Search** — the app fetches live data from the OMDb API and renders the poster, rating, genre tags, plot summary, and cast.

### 📈 Trending Now
A static editorial page featuring hand-picked movies displayed in a responsive CSS Grid card layout. Each card shows a poster, year, and IMDb rating.

### 🔐 Login & Sign Up
Simulated authentication pages with:
- Input validation (empty field checks)
- `Enter` key support
- Redirect to Home on success

### 👥 About Us
Profile cards for the team members — name, role, and a short bio.

---

## 🛠️ Tech Stack

- **HTML5** — Semantic page structure
- **CSS3** — Grid, Flexbox, transitions, responsive media queries
- **JavaScript (ES6+)** — Fetch API, DOM manipulation, event handling
- **OMDb API** — Live movie data source
- **Google Fonts (Poppins)** — Typography

---

## 👩‍💻 Team

| | Name | Role |
|---|---|---|
| 🧑‍💻 | **Arshpreet Kaur** | Lead Developer — built the core search engine and app architecture |
| 🎨 | **Pratishtha Bhatia** | UI/UX Designer — crafted the visual design and user experience |

---

<p align="center">Made with ❤️ and lots of 🍿 by the MovieGuide team</p>
