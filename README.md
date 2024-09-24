## Getting Started

### Server Setup

1. **Install Dependencies**

   - First, attempt to install server dependencies using `pnpm`:

     ```bash
     pnpm --prefix ./server install
     ```

   - If you don’t have `pnpm` or run into issues, remove the `pnpm-lock.yaml` file and use `npm`:

     ```bash
     rm -f ./server/pnpm-lock.yaml
     npm --prefix ./server install
     ```

2. **Create and Configure `.env` File**

   - Copy the example `.env` file to set up your environment configuration:

     ```bash
     cp server/.env.example server/.env
     ```

   - Open `server/.env` and add your OpenAI API key:

     ```bash
     OPENAI_API_KEY=YOUR_CHATGPT_API_KEY_HERE
     ```

3. **Run the Server**

   - Start the development server with:

     ```bash
     npm run dev-server
     ```

4. **Test the Server**

   - To run server tests, use:

     ```bash
     npm run test-server
     ```

---

### Client Setup

1. **Install Dependencies**

   - First, install client dependencies using `pnpm`:

     ```bash
     pnpm --prefix ./client install
     ```

   - If `pnpm` is not available or you encounter issues, remove the `pnpm-lock.yaml` file and use `npm`:

     ```bash
     rm -f ./client/pnpm-lock.yaml
     npm --prefix ./client install
     ```

2. **Create and Configure `.env.local` File**

   - Copy the example `.env.local` file:

     ```bash
     cp ./client/.env.local.example ./client/.env.local
     ```

   - Open `client/.env.local` and add your Firebase API keys:

     ```bash
     NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY_HERE
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN_HERE
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID_HERE
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET_HERE
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID_HERE
     NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID_HERE
     ```

3. **Run the Client**

   - Start the development client with:

     ```bash
     npm run dev-client
     ```
