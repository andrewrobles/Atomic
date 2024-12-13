### How to
- Run app locally: cd into the api directory and do `netlify dev`, then in another terminal do `npm start` from the web directory
- Deploy an API change: run `netlify deploy` to stage changes then do `netlify deploy --prod` once functionality has been verified

### User Stories
- [ ] Create Habit: I should be able to create a habit
- [ ] Delete Habit: I should be able to delete a habit
- [ ] Loading Screen: I should be able to see a loading screen when the data is being loaded so I know to wait for the data to show up

### Authentication

All endpoints require a query parameter `?password=<password>` otherwise it will return 401 unauthorized. If the the password is not available in localStorage, then the user should be redirected to the login page.

### API Endpoints
- Get existing habits: `GET /habits `
- Create new habit: `POST /habits { name: <string> }`
- Delete existing habit: `DELETE /habits/<id>`
- Mark complete or not complete: `PATCH /habits/<id>/<yyyy-mm-dd> { "done": <true or false> }`
- Edit habit: `PATCH /habits/<id> { "name": <string> }`
- Habit detail: `GET /habits/<id>`

### Completed User Stories
- [x] Ping Endpoint: I should be able to do GET /ping and as a response I should get {"message": "pong"}
- [x] SSL Setup: I should be able to go to /ping using HTTPS and get a valid response
- [x] UI-API Integration: I should be able to see the contents of the ping endpoint in the browser developer console
- [x] Custom URL: I should be able to see the app running on habits.andrewrobles.com
- [x] GET Habits Endpoint: I should be able to do GET /habits and see all of the habits that are in MongoDB
- [x] View Habits: I should see the habits on the web app
- [x] Auth: I should be able to sign in and sign out of the app