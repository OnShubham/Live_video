# API Documention

## User

### Register

```bash
/api/v1/user/register
```

- Response

```JSON
// Response
{
    "statusCode": 201,
    "data": {
        "_id": "66e724495f62d7b0717d6aba",
        "username": "sdsfsdfsdfsdfsd1sa",
        "email": "sh1@gmsa.coma",
        "fullname": "shubhamn1aA",
        "watchHistory": [],
        "createdAt": "2024-09-15T18:15:37.888Z",
        "updatedAt": "2024-09-15T18:15:37.888Z",
        "__v": 0
    },
    "message": "User registered successfully",
    "success": true
}
```

### Login

```bash
/api/v1/user/login
```

- User Login

```bash
{
    "email": "ska@gmail.com",
    "password": "shubham"
}

```

```JSON

// Response
{
    "statusCode": 200,
    "data": {
        "user": {
            "_id": "66e7d184588b97483774db7f",
            "username": "shubamsa",
            "email": "ska@gmail.com",
            "fullname": "shubham k",
            "avatar": "http://res.cloudinary.com/dwtrsnlrb/image/upload/v1726468481/p1lmq3ofpwpbaxpqb4pv.png",
            "watchHistory": [],
            "createdAt": "2024-09-16T06:34:44.563Z",
            "updatedAt": "2024-09-16T06:39:28.081Z",
            "__v": 0
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmU3ZDE4NDU4OGI5NzQ4Mzc3NGRiN2YiLCJlbWFpbCI6InNrYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InNodWJhbXNhIiwiZnVsbG5hbWUiOiJzaHViaGFtIGsiLCJpYXQiOjE3MjY0Njg3NjgsImV4cCI6MTcyNjU1NTE2OH0.66yvB7ZkhDP6TDxpr7tdbaW-xQrz5zYrKPitwmZTgdw",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmU3ZDE4NDU4OGI5NzQ4Mzc3NGRiN2YiLCJpYXQiOjE3MjY0Njg3NjgsImV4cCI6MTcyNzMzMjc2OH0.cw9BOTDHKhJpizHtbRNUNsMpUPm1Yok0zOcSOXYdOII"
    },
    "message": "User Login Success",
    "success": true
}
```
