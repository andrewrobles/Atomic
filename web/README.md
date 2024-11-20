### Setup

Add MongoDB credentials to a new **web/server/config.env**
```
ATLAS_URI=mongodb+srv://<username>:<password>@<cluster>.<projectId>.mongodb.net/employees?retryWrites=true&w=majority
PORT=5050
```

Start the back end
```bash
cd api 
npm install
node --env-file=config.env server
```

Start the front end
```bash
cd ui
npm install
npm run dev
```

