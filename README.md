# Gemini Search Chatbox

A responsive, stylish chatbot interface powered by the Gemini 2.5 Flash model with Google Search grounding capabilities. This project features conversation persistence using local storage, full markdown rendering for AI responses, and a clean, user-friendly design inspired by modern AI chat applications.

---

## Live Demo

**(Link to be added after deployment to GitHub Pages)**

---

## Features

-   **Powered by Gemini 2.5 Flash**: Utilizes a powerful and fast model for generating responses.
-   **Google Search Grounding**: Provides up-to-date and factual answers by grounding responses in Google Search results.
-   **Responsive Design**: A mobile-first interface that works seamlessly across all screen sizes.
-   **Markdown Rendering**: AI responses are parsed and displayed with rich formatting (headings, lists, code blocks, etc.).
-   **Conversation History**: Your chat history is automatically saved to your browser's local storage.
-   **Source Citing**: Displays the web sources used by the model to generate its response.
-   **Copy-to-Clipboard**: Easily copy any message with a single click.
-   **Modern UI/UX**: Includes a typing indicator, smooth auto-scrolling, and a clear, intuitive layout.
-   **Secure API Key Handling**: Uses environment variables to keep your API key safe and out of version control.

## Technologies Used

-   **React 19** & **TypeScript**
-   **@google/genai**: The official Google Gemini API client library.
-   **Tailwind CSS**: For styling, loaded via a CDN.
-   **marked.js**: For parsing Markdown in AI responses.
-   **DOMPurify**: To sanitize HTML output from Markdown and prevent XSS attacks.

---

## Running Locally

To run this application on your local machine, follow these steps.

### Prerequisites

-   [Node.js](https://nodejs.org/) (version 18 or higher is recommended) and npm.
-   A text editor (like VS Code).

### Step 1: Get the Code

Clone the repository or download the source code into a local directory.

### Step 2: Get a Gemini API Key

1.  Go to the [Google AI Studio](https://aistudio.google.com/).
2.  Sign in with your Google account.
3.  Click on **"Get API key"** and create a new API key.
4.  Copy the key and keep it safe.

### Step 3: Configure the API Key

This project uses a `.env` file to securely manage your API key for local development. This file is ignored by Git, so your key will not be committed.

For the Vite development server to expose the key to the application, it **must** be prefixed with `VITE_`.

1.  In the root of the project, create a file named `.env`.
2.  Add the `VITE_API_KEY` variable and set its value to the key you copied from Google AI Studio. Your file should look like this:
    ```dotenv
    # .env
    VITE_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    ```

### Step 4: Run the Application

1.  Open your terminal in the project's root directory.
2.  Install the necessary packages by running:
    ```bash
    npm install
    ```
3.  Start the local development server:
    ```bash
    npm run dev
    ```
4.  Open the URL provided in the terminal (usually `http://localhost:5173`) in your browser to use the chatbox.

---

## Deployment to GitHub Pages

This project can be easily deployed as a static site using GitHub Pages.

### Steps to Deploy

1.  First, ensure your `vite.config.ts` has the correct `base` path for your repository:
    ```typescript
    // vite.config.ts
    export default {
      base: '/your-repo-name/',
    }
    ```
2.  Make sure all dependencies, including the deployment tool, are installed:
    ```bash
    npm install
    ```
3.  Run the deploy script from your terminal. This will build the application and push the contents of the `dist` folder to a `gh-pages` branch on your repository.
    ```bash
    npm run deploy
    ```
4.  In your GitHub repository, go to **Settings > Pages**.
5.  Under "Build and deployment," set the **Source** to **Deploy from a branch**.
6.  Set the branch to **`gh-pages`** and the folder to **`/ (root)`**. Click **Save**.

### :warning: Security Warning for Production

Exposing an API key on the client-side (in your public JavaScript files) is a major security risk. When you run `npm run deploy`, Vite embeds the `VITE_API_KEY` from your local `.env` file directly into your public code.

For a public website, you must take steps to protect this key.

-   **Minimum Security**: Go to the Google Cloud Console and add **API key restrictions**. Restrict the key so it can *only* be used from your specific GitHub Pages domain (`https://your-username.github.io`).
-   **Best Practice**: For a production application, the proper solution is to create a backend server (a "proxy") that securely stores the key and makes API calls on behalf of the client.
