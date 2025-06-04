# Quiz Data Dashboard

This is a Vue.js application that serves as a dashboard for managing and viewing data about quizzes, domains, sites, and embeds. It pulls data from the WordPress REST API on mediaengagement.org.

## How It Works

### Data Flow

1. **Frontend (Vue.js)**:
   - The app is built with Vue.js and uses Vuex for state management.
   - It fetches data from the WordPress REST API at `https://mediaengagement.org/wp-json/enp-quiz/v1/`.
   - The API endpoints include:
     - `/enp-quiz/v1/domains`
     - `/enp-quiz/v1/sites`
     - `/enp-quiz/v1/quizzes`
     - `/enp-quiz/v1/embeds`
     - `/enp-quiz/v1/totals`

2. **Backend (WordPress REST API)**:
   - The WordPress API on mediaengagement.org receives requests from the Vue app.
   - It likely calls into a PHP backend (using `Route.php` and `DB.php`) to query the MySQL database (`cme_data`).
   - The PHP backend returns the data to the API, which sends it back to the Vue app.

3. **Database**:
   - The MySQL database (`cme_data`) stores all quiz, domain, site, and embed data.
   - The PHP backend connects to the database using PDO, with connection details stored in `config.ini`.

### Key Features

- **Overview/Home**: Shows summary stats (responses, correct/incorrect, etc.).
- **Domains/Sites/Quizzes/Embeds**: Each has a dedicated view with tables, filters, and sorting.
- **Filtering/Sorting**: Users can filter and sort data in each view.
- **Details**: Clicking on a domain, site, or quiz shows detailed stats and related items.
- **Quiz Analytics**: Tracks views, starts, finishes, and calculates percentages.

## Project Structure

- **`src/`**: Contains the Vue.js source code.
  - **`store.js`**: Manages data fetching and state using Vuex.
  - **`views/`**: Vue components for different views (Home, Domains, Sites, Quizzes, Embeds).
  - **`components/`**: Reusable Vue components.
  - **`router.js`**: Defines the app's routes.
  - **`main.js`**: Entry point for the Vue app.
- **`public/`**: Static assets (e.g., `index.html`).
- **`package.json`**: Lists dependencies and scripts for building the app.

## Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run serve
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## Deployment

The build output (compiled HTML, CSS, JS) is uploaded to the `quiz-creator` directory on the server.

## Notes

- The app does not pull data directly from the database. It pulls data from the WordPress REST API on mediaengagement.org.
- The PHP backend (using `Route.php` and `DB.php`) is responsible for querying the database and returning data to the API. 