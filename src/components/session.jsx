import md5 from "md5";

const SYSTEM_USERNAME = "admin";
const SYSTEM_PASSWORD_HASH = md5("admin");

var isUserLoggedIn = false;

//getter function for isUserLoggedIn
export function getIsUserLoggedIn() {
  return isUserLoggedIn;
}

//setter function for isUserLoggedIn
export function setIsUserLoggedIn(value) {
  isUserLoggedIn = value;
}

//function to check if the user is logged in with input username and password
export function checkSession(username, password) {
  if (username === SYSTEM_USERNAME && md5(password) === SYSTEM_PASSWORD_HASH) {
    setIsUserLoggedIn(true);
    //pop up alert to show that the user is logged in
    alert("You are logged in!");
    return true;
  } else {
    setIsUserLoggedIn(false);
    //pop up alert to show that the user is not logged in
    alert("Invalid username or passward");
    return false;
  }
}
