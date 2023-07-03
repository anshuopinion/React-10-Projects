import { Router } from "express";
import {
  sendVerificationMail,
  signinUser,
  signupUser,
  verifyUserMail,
  sendForgotPasswordMail,
  verifyForgotMail,
} from "../controllers/userControllers";
import {
  signupUserValidation,
  signinUserValidation,
  verifyUserMailValidation,
  sendVerificationMailValidation,
  verifyForgotMailValidation,
  sendForgotPasswordMailValidation,
} from "../validation/userValidation/userValidation";

const router = Router();

router.post("/signup", signupUserValidation, signupUser);
router.post("/signin", signinUserValidation, signinUser);

router.post(
  "/send-verification-mail",
  sendVerificationMailValidation,
  sendVerificationMail
);

router.post("/verfiy-user-mail", verifyUserMailValidation, verifyUserMail);

router.post(
  "/verify-forgot-mail",
  verifyForgotMailValidation,
  verifyForgotMail
);
router.post(
  "/forgot-password",
  sendForgotPasswordMailValidation,
  sendForgotPasswordMail
);

export default router;
