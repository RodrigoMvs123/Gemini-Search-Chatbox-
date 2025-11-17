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

-   A modern web browser (Chrome, Firefox, Safari, etc.).
-   A text editor (like VS Code).
-   A local development environment that can serve the files and load environment variables (like the environment this project was developed in, or a local server setup like Vite).

### Step 1: Clone the Repository

First, clone this repository to your local machine using Git:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
cd YOUR_REPOSITORY_NAME
```

### Step 2: Get a Gemini API Key

1.  Go to the [Google AI Studio](https://aistudio.google.com/).
2.  Sign in with your Google account.
3.  Click on **"Get API key"** and create a new API key.
4.  Copy the key and keep it safe.

### Step 3: Configure the API Key

This project uses a `.env` file to securely manage your API key. This file is ignored by Git, so your key will never be accidentally committed.

1.  In the root of the project, find the `.env.example` file.
2.  Duplicate this file and rename the copy to `.env`.
3.  Open the new `.env` file and replace `"YOUR_GEMINI_API_KEY_HERE"` with the actual API key you copied from Google AI Studio.

Your `.env` file should look like this:

```
# .env
API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

### Step 4: Run the Application

Open the `index.html` file in a development environment that supports loading environment variables. The application code is already configured to read the `API_KEY` from your `.env` file via `process.env.API_KEY`.

---

## Deployment to GitHub Pages

This project can be easily deployed as a static site using GitHub Pages.

### Steps to Deploy

1.  Push your code to a GitHub repository.
2.  In your repository, go to **Settings > Pages**.
3.  Under the "Build and deployment" section, select the source as **"Deploy from a branch"**.
4.  Choose the branch you want to deploy from (usually `main`) and the folder as `/ (root)`.
5.  Click **Save**. Your site will be built and deployed to a public URL.

### :warning: Security Warning for Production

Exposing an API key on the client-side (in your public JavaScript files) is a major security risk. For a public website like one hosted on GitHub Pages, you cannot use a `.env` file directly.

-   **For a production application**, you must **never** expose your API key. The proper solution is to create a backend server (a "proxy") that securely stores the key and makes API calls on behalf of the client.
-   As a partial mitigation for a hobby project, you can enable API key restrictions in the [Google Cloud Console](https://console.cloud.google.com/apis/credentials) to limit its usage to your specific website domain (`https://your-username.github.io`). This adds a layer of protection but is not a substitute for a proper backend implementation.
