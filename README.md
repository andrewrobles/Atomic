# lbs 

I want to be able to log my weight for today. The API endpoint for this feature should be

```
POST /api/logs
{
    "lbs": XXX.X
}
```

I would like to see a list of all the weights that I have logged by date. The API endpoint for this feature should be

```
GET /api/logs
```
with response as an array of
```
{
    "date": MM/DD/YYYY,
    "lbs": XXX.X
}
```

The UI design for this app should be a text field that is always there with a log button next to it. Below the text box there should be a scrollable list of all the previously dates and weight logs.

### TODO
- [x] **Ping Endpoint**: I should be able to do GET /ping and as a response I should get {"message": "pong"}
- [ ] **Deploy Frontend**: I should be able to see the contents of the ping endpoint in the browser developer console
- [ ] **Get Logs Endpoint**: I should be able to do GET /api/logs and as a response I should get an array of dated logs
