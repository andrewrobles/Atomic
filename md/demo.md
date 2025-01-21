[Changelog](../)
#### Demo
There is a demo user in MongoDB
```json
{
    "email": "demo"
}
```
When user goes to the `/demo` url, the following happens:
1. A special `tokenId` called with value `demo` is created and stored in localStorage
2. `getEmailFromIdToken` returns `demo` when it sees that an `idToken` with value `demo` is passed in 
