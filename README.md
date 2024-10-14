# Introduction

This is my submission for the take home assignment, unfortunately I don't have time to do the test cases and it doesnt cover all the core utilities

## Getting Started

build the dockerfile
```
docker build -t tokka-labs-assignment .
```

run the dockerfile
```
docker run -p 3000:3000 -e ETHERSCAN_API_KEY="your api key here" tokka-labs-assignment
```

## Notes
Search by timestamp range takes forever because i could not find out how to search by timestamp
