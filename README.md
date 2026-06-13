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
     - `/enp-quiz/v1/news-candidates` (live SQL candidate list)
     - `PATCH /enp-quiz/v1/news-candidates/{siteID}` (save review status)

2. **Backend (enp-quiz plugin)**:
   - News candidates are computed from live SQL passes against embed tables (not a static JSON file).
   - Review status (`pending`, `confirmed_news`, `exclude`) is stored in `wp_enp_news_candidate`.

3. **Database**:
   - Embed/quiz data lives in the quiz MySQL database.
   - Kat's review labels live in a separate annotation table; core embed data is never modified.

### Key Features

- **Overview/Home**: Shows summary stats including total embed sites, news candidates (~400), and confirmed news counts.
- **Sites (News candidates)**: Default view shows filtered research candidates from the API. Toggle to "All embed sites" for the full list.
- **Review workflow**: Mark each candidate in the dropdown; status is saved on the server. Export/Import CSV for backup reports.
- **Domains/Sites/Quizzes/Embeds**: Each has a dedicated view with tables, filters, and sorting.

### News candidates

Candidate membership is computed server-side by the **enp-quiz** plugin (SQL passes: high/low volume, Wicked Local, NBC, Gannett, Ideastream). The Vue app only displays what the API returns.

**Kat workflow:** Open Sites → review candidates → set review status (saved automatically) → Export CSV for records.

## Project Structure

- **`src/`**: Vue.js source code (`store.js`, `views/`, `components/`, `router.js`).
- **`public/`**: Static assets (`index.html`).
- **`package.json`**: Dependencies and build scripts.

## Development

```bash
npm install
npm run serve
```

## Build for Production

```bash
npm run build
```

Deploy `dist/*` (HTML, CSS, JS only) to the `quiz-creator` directory on the server.

**Requires enp-quiz v1.3.0+** on mediaengagement.org with the `/news-candidates` API deployed first.

For prod-parity local testing, copy `dist/*` to the enpdata Local site at `app/public/quiz-creator/` and open `http://localhost:10033/quiz-creator/#/`.

## Notes

- The app does not pull data directly from the database. All data comes through the WordPress REST API.
- News candidate rules live in the enp-quiz plugin (`includes/class-enp_quiz-news-candidates.php`), not in this repo.
