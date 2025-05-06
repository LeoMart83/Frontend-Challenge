## Setup Instructions

Follow these steps to get the project running locally:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/LeoMart83/Frontend-Challenge.git
    cd .\Frontend-Challenge\
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

    This command will install all the necessary project dependencies listed in the `package.json` file.

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    This command will start the development server.

4.  **Open in your browser:**
    Once the development server is running, open your web browser and navigate to [http://localhost:5173/](http://localhost:5173/) to view the application.





**_Testing Answers:_**

**To prevent regressions I would use these strategies:**

-   Automated Regression Testing with a high code coverage to prevent regressions after every code change. Basically make sure old code works as expected after you implement something new.
-   End-to-End (E2E) Tests for covering critical user flows such as creating, reading, updating, and deleting patients and notes

**Main components & features for testing would be:**

-   Patients data table: ability to use search, ability to add a new patients, and perform other CRUD operations.
-   Modal Window is fully functional.
-   Notifications display after table interactions.
-   Patient notes list, CRUD operations.

**As for the testing tools I would use:**

-   Jest for unit testing React components and JS logic.
-   React Testing Library for unit and integration testing of React components.
-   Cypress or Playwright for e2e testing for simulating real user interactions across the application.

***General Comments & Notions***


