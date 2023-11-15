# golobe
Hotel Booking Platform, Made as part in final project of 2110507 SOFTWARE DEVELOPMENT PRACTICE II, Academic year 2023

Thanks to Community Design in figma!

## First clone
- Clone and install
  ```
  git clone https://github.com/parnthana/golobe.git
  cd golobe
  cd client
  yarn install
  cd server
  yarn install
  ```
- Create and config .env file
  - client ```.env.local```
    ```
    NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=
    ```
  - put your mongoDB connection string and in server/config/config.env
    ```MONGO_URI="CONNECTION_STRING"```
    
## Run backend in /server

- Run command for dev
  ```
  yarn dev
  ```
  
## Run client in /client

- Run command for dev
  ```
  yarn dev
  ```
## When Imported new SVG -> put in /public/assets/icons/
- Run ```yarn generate-icon```
