### How to
To run the app locally, cd into the api directory and do `netlify dev`, then in another terminal do `npm start` from the web directory. To deploy an API change, run `netlify deploy` to stage changes then do `netlify deploy --prod` once functionality has been verified.

### Authentication
All endpoints require a query parameter `?password=<password>` otherwise it will return 401 unauthorized. If the the password is not available in localStorage, then the user should be redirected to the login page.

### API Endpoints
- Get existing habits: `GET /habits `
- Create new habit: `POST /habits { name: <string> }`
- Delete existing habit: `DELETE /habits/<id>`
- Mark complete or not complet: `PATCH /habits/<id>/<yyyy-mm-dd> { "done": <true or false> }`
- Edit habit: `PATCH /habits/<id> { "name": <string> }`
- Habit detail: `GET /habits/<id>`
