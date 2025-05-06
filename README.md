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





🛠️ **_Testing Strategy Answers:_** ⚙️

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

💬 ***General Comments & Notes:*** ℹ️

1. I didn't add success notifications for patinet notes actions on the Patient Details page because the functionality was already implemented on the Patients page.

2. You cannot edit/delete a patient from the Patient Details page. I initially intended to add this, but I forgot and remembered after everything else was already finished.

3. There is no validation of the input values when adding a new patient. I wanted to add it, but since I was using the Prime React library, I didn't find a convenient way to manage form validation with the library, so I decided to simply remove the validation. BTW is surprised me how Prime React allows you to work with form, as for me it's not very convenient.

4. There is no confirmation when deleting a patient. I realize that it's considered good practice to get confirmation from the user before deletion to prevent unintentional removals, but I decided not to implement this for the test application. 

5. For ready-made components, I decided to use the Prime React library because I remember it being used on the project, and I wanted to practice with it and see what it's like.
