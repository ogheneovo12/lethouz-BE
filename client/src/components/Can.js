import { useUserState } from "../contexts";
import { roleType } from "../constants";
const useCheck = (role) => {
  const { user, isAuthenticated } = useUserState();
  if (role.toLowerCase() === "auth") return isAuthenticated;
  if (!user) {
    return false;
    //dispatch status check
    //status check will check if the use is still logged in on the server, and grab user details or
    //if user is not looged in log them out and ask them to log in again
  }
  const permissions = roleType[user.isAdmin];
  if (!permissions || permissions !== role) {
    // user is not an admin
    return false;
  }

  return true;
};

export const Can = (props) => (useCheck(props.role) ? props.yes() : props.no());

Can.defaultProps = {
  yes: () => null,
  no: () => null,
  role:"auth"
};


