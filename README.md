# LetHouz Backend
A location based real estate solution

**Base URL** : https://lethouz.herokuapp.com

# **Endpoints**

### **POST** /auth/register - register a new user

  ##### Request
  ``` 
  {
    "firstName": String,
    "lastName": String,
    "email": String,
    "password": String,
    "confirmPassword": String,
  }
  ```
  ##### Response
  ``` 
  {
    "token": String
  }
  ```

