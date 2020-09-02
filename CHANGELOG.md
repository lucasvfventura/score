# Changelog

## 09-01-2020
    - Added download route to download filtered and sorted data as csv
    - Added download button on ui to download the data as csv
    - Added docker-compose.yml and Dockerfile
    - Added basic UI testing
    - Updated README for docker run

## 08-31-2020
    - Updated README for local run
    - Added playersStats query unit test
    - Added playerStat.fromJson unit test
    - Added count to playersStats query response
    - Added search UI with pagination support

## 08-29-2020
    - Added playersStats query to support search requirement, including:
        - Player name filter
        - Multiple way sorting by Total Rushing Yards, Longest Rush and Total Rushing Touchdowns
        - Pagination
    - Added Prettier for consistent style

## 08-28-2020
    - Initial project structure with base dependencies in Place
    - Initial GraphQL server running
    - Initial React client running
    - Initial domain model
    - Data loader utility