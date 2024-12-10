### How to
- Run app locally: cd into the api directory and do `netlify dev`, then in another terminal do `npm start` from the web directory
- Deploy an API change: run `netlify deploy` to stage changes then do `netlify deploy --prod` once functionality has been verified

### User Stories
- [x] Ping Endpoint: I should be able to do GET /ping and as a response I should get {"message": "pong"}
- [x] SSL Setup: I should be able to go to /ping using HTTPS and get a valid response
- [x] UI-API Integration: I should be able to see the contents of the ping endpoint in the browser developer console
- [x] Custom URL: I should be able to see the app running on habits.andrewrobles.com
- [x] GET Habits Endpoint: I should be able to do GET /habits and see all of the habits that are in MongoDB
- [x] View Habits: I should see the habits on the web app
- [ ] Auth: I should be able to sign in and sign out of the app

# Product Requirements

Below you will find a list of required features and design details that will be implemented for the initial MVP

### Authentication

All endpoints require a query parameter `?password=<password>` otherwise it will return 401 unauthorized. In the UI, if the the password is not provided, then it should redirect the user to the login page in which they can provide the password.

### View Habits
I would like to see a list of all the habits that I have created.

```
GET /habits
```

### New Habit
I want to be able to click on a button that allows me to enter the name of the habit I would like to start. The button will say "New Habit". When I press it, a text box will appear with a check box to the left of it in which I can put the name of the habit and press return on my keyboard. After I press return, I should see this habit appear in the list of habits. If I press return with no text in the text box, then no habit will be added.

```
POST /habits
{
    name: <string> 
}
```


### Mark Complete or Not Complete
I would like the ability to mark any of them complete by clicking on the empty checkbox.

```
PATCH /habits/<id>/<yyyy-mm-dd>
{
    "done": <true or false>
}
```

### Edit Habit
To edit the name of a habit, I should be able to press anywhere in the same line of the habit and then the name of the habit will be made editable similar to the view when adding a habit, the only difference is that the previous name of the habit will prepopulate the form.

```
PATCH /habits/<id>
{
    "name": <string>
}
```

### Delete Habit
To delete a habit, I should be able to click on the habit and see a trash can all the way to the right of the row in which I can click. If I click it, then I should be able to see "habitname will be permanently deleted." with subtext "You won't be able to undo this action" with light gray and red buttons  "Cancel" and "Delete habit".

```
DELETE /habits/<id>
```

Note that we want to delete all of the events that were referenced for this habit.

### Habit Detail
I would like to be able to click on a habit to see all the previous days marked in which I have completed or not completed a habit.

```
GET /habits/<id>
```
