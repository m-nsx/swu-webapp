# PROJET WEB

## To run the project

1. Clone the repo

```
git clone https://github.com/m-nsx/swu-webapp.git
```

2. Install packages (run in both root folder and frontend folder)
```
npm install
```

3. Start backend (run in root folder)

```
npm run dev
```

3. Start frontend (run in frontend folder)

```
npm start
```

<sub> Note : I'll try to make the server startable with a single command... </sub>

4. Access the server at http://localhost:3000 or take a look at the logs to find out the address on the local network

Info : For Linux users, if you get an error with nodemon leading to not be able to start the server, use this command to properly reinstall nodemon

```
sudo npm install -g nodemon
```

### 🤯 Troubleshooting 🤯

If the port is already in use, you can free it by closing the process using it.

1. Find the process

```
netstat -ano | findstr :<port>
```

2. Kill the process

```
taskkill /PID <PID> /F
```

### Information for dev

Please commit to dev branch
