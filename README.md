# PROJET WEB

## To run the project

1. Clone the repo

```
git clone https://github.com/m-nsx/swu-webapp.git
```

2. Start backend (type command in root folder)

```
npm run dev
```

3. Start frontend (type command in frontend folder)

```
npm start
```

<sub> Note : I'll try to make the server startable with a single command... </sub>

4. Access the server at http://localhost:3000 or take a look at the logs to find out the address on the local network

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