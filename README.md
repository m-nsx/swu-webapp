# SWU Collection Manager

This is a small webapp designed to help you manage your Star Wars Unlimited collection. With local storage for your cards, collection and deck management features and an auto-update card list. You can even add your very own personalized cards !

<sub>*Note: the project is still under development, so bugs, instability and data loss may occur. We recommend that you download it for discovery purposes only for the moment.*</sub>

## To run the project

1. Clone the repo

```
git clone https://github.com/m-nsx/swu-webapp.git
```

2. Install packages (run in both root folder and frontend folder)

```
npm install
```

3. Start the server (run in root folder)

```
npm run start
```

5. Access the server at http://localhost:3000

## Troubleshooting

### Aww the port is already in use, what should I do ?

1. Find the process

```
netstat -ano | findstr :<port>
```

2. Kill the process

```
taskkill /PID <PID> /F
```

### I chose to use linux on my own, and nodemon doesn't work, even after npm install. Help !

1. Run this command to properly reinstall nodemon

```
sudo npm install -g nodemon
```

## Important notice

All cards have an unique ID which can be found by using the lookup button on card index page. Cards are identified and compared by name and number, it's the way the app prevent duplicates in the database. So don't mess with the name and number of the cards.
