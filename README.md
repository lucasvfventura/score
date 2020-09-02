# Decision making

## Running on docker
```
docker-compose up -d --build
```

## Running it locally

- Run the server
```
cd server 
npm install
npm start
```

- Run the client
```
cd client 
npm install
npm start
```

## Requiments
- Load data into database
    - Clean data
        - RegExp was used to extract numeric data where strings were given
- Search by player name
- Sort by Total Rushing Yards, Longest Rush and Total Rushing Touchdowns
    - Multi sort or single field sorting?
- Download filtered data
    - Entire collection or online visible page?
- In order to acomodate a large dataset the search page needs to use pagination
    - Limits on pagination?

## Techstack
I choose the stack I'm more confortable with at the moment which is:

- Backend
    - NodeJS
    - TypeScript
    - GraphQL
    - TypeORM

- Frontend
    - ReactJS
    - TypeScript
    - MaterialUI