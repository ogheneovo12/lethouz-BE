import {registerValidator,loginValidator} from "./validateInputs";
import { verifyNewUser, verifyOldUser } from'./verifyUser';

module.exports = {
  registerValidator,
  loginValidator,
  verifyNewUser,
  verifyOldUser
};
