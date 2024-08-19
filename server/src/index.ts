import express, { Request, Response } from "express";
import { admin } from "./firebase";

const app = express();

app.use(express());

app.get("/", (req: Request, res: Response) => {
  admin
    .auth()
    .listUsers()
    .then((users) => {
      const usersData = users.users.map((user) => {
        return {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        };
      });
      res.json(usersData);
    })
    .catch((error) => {
      console.error("Error listing users:", error);
      res.status(500).json({ error: "Failed to retrieve users" });
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// REFERENCES: https://medium.com/@victoriahjeon/using-cloud-firestore-and-firebase-authentication-with-express-js-87fe99e16ead
// REFERENCES: https://medium.com/@swapkumbhar31/simplifying-user-authentication-with-firebase-node-js-express-and-typescript-e52b3fc0a780
