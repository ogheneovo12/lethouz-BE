import { registerValidator, loginValidator } from "./validateInputs";
import { verifyNewUser, verifyOldUser } from "./verifyUser";
import { verifyForeignUser } from "./sessionChekers";
module.exports = {
  registerValidator,
  loginValidator,
  verifyNewUser,
  verifyOldUser,
  verifyForeignUser,
};
