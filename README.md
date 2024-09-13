# Video Content Backend & Frontend Documentation

# Backend

## MODEL

- [Link URL](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj)


## Basic setup folder and structure
```javascript
|—— Backend
|    |——public
|    |—— src
|        |—— db
|        |—— controllers  
|        |—— middlewares
|        |—— models
|        |—— routes
|        |—— utils
|        |—— index.js
|        |—— app.js
|        |—— constant.js
|    |—— .env
|    |—— .env.sample
|    |—— .gitignore
|    |—— README.md
|    |—— prettierrc.ignore  // install this npm
|    |—— .prettierrc  // and setup documention
``` 

## package,json
```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module", // module type
  "scripts": {
    "dev": "nodemon -r dotenv/config src/index.js" // node mon and dotenv config in this 
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
```
