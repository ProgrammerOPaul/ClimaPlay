import axios from "axios";
import express from "express";
import querystring from "querystring";

const port = 3000;
const app = express();

app.use(express.json());

let client_id = '7dec0159d9114c37918603dd56ad0467';
let client_secret = 'f5bb94f2af1e4054a9a901af7690f514';
let redirect_uri = 'http://localhost:3000';

app.get('/', (req, res) => {
  res.render("index.ejs")
});

// app.get('/login', (req, res) => {

//   let state = generateRandomString(16);
//   let scope = 'user-read-private user-read-email';

//   res.redirect('https://accounts.spotify.com/authorize?' +
//     querystring.stringify({
//       response_type: 'code',
//       client_id: client_id,
//       scope: scope,
//       redirect_uri: redirect_uri,
//       state: state
//     }));
// });

// app.get('/', async (req, res) => {
//     try {
//         const response = await axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds');
//         res.render("index.ejs");
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('An error occurred while trying to fetch data from the API');
//     }
// });


app.listen(port, () => console.log(`Server is running on port ${port}`));


function generateRandomString(length) {
   let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
   let charLength = chars.length;
   let result = '';
   for ( let i = 0; i < length; i++ ) {
      result += chars.charAt(Math.floor(Math.random() * charLength));
   }
   return result;
}