import { Request, Response } from "express";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "../config/firebase";

const auth = getAuth();

class FirebaseAuthController {
  registerUser(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send();
    }
  }
}
