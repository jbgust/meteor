#!/bin/bash

# script to simulate the way its run on CircleCI

npm run dev -- --mode cypress --port 8081 --host 0.0.0.0 &
docker run -it -v ./:/e2e -w /e2e cypress/included:13.6.2 run --env urlAuth=http://172.17.0.1:8090/auth/signin --config baseUrl=http://172.17.0.1:8081 --spec ./cypress/e2e/IT/exportRASP.cy.js
fuser -k 8081/tcp
