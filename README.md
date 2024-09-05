## Getting Started

### Server Setup

1. **Install Dependencies**

   First, try installing the server dependencies using `pnpm`. If `pnpm` is not installed or if you encounter issues, remove the `pnpm-lock.yaml` file if it exists and use `npm` to install dependencies:

   ```bash
   pnpm --prefix ./server install
   ```

   If `pnpm` is not available or you face issues:

   ```bash
   rm -f ./server/pnpm-lock.yaml
   npm --prefix ./server install
   ```

2. **Create and Configure `.env` File**

   Create a new file named `.env` in the `server` directory by copying the contents of `.env.example`:

   ```bash
   cp server/.env.example server/.env
   ```

   Edit `server/.env` and add your ChatGPT API key:

   ```makefile
   OPENAI_API_KEY=YOUR_CHATGPT_API_KEY_HERE
   ```

3. **Run the Server**

   Start the server using `npm`:

   ```bash
   npm run dev-server
   ```

4. **Test the Server**
   Test the server using `npm`:
   ```bash
   npm run test-server
   ```

### Client Setup

1. **Install Dependencies**

   First, try installing the client dependencies using `pnpm`. If `pnpm` is not installed or if you encounter issues, remove the `pnpm-lock.yaml` file if it exists and use `npm` to install dependencies:

   ```bash
   pnpm --prefix ./client install
   ```

   If `pnpm` is not available or you face issues:

   ```bash
   rm -f client/pnpm-lock.yaml
   npm --prefix ./client install
   ```

2. **Create and Configure `.env.local` File**

   Create a new file named `.env.local` in the `client` directory by copying the contents of `.env.local.example`:

   ```bash
   cp ./client/.env.local.example ./client/.env.local
   ```

   Edit `client/.env.local` and add your Firebase API keys:

   ```makefile
   NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY_HERE
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN_HERE
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID_HERE
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET_HERE
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID_HERE
   NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID_HERE
   ```

3. **Run the Client**

   Start the client using `npm`:

   ```bash
   npm run dev-client
   ```
