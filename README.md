# LetHouz Backend

A location based real estate solution

**Base URL** : https://lethouz.herokuapp.com/api

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
  "message": String
}
```

### **POST** /auth/login - log previous user in

#### returns a cookie

##### Request

```
{
  "email": String,
  "password": String
}
```

##### Response

```
{
  "message": String
}
```
