import axios from "axios";
import express from "express";
import querystring from "querystring";

const port = 3000;
const app = express();

app.use(express.json());

let client_id = "7dec0159d9114c37918603dd56ad0467";
let client_secret = "f5bb94f2af1e4054a9a901af7690f514";
let client_access_token = "";
let redirect_uri = "http%3A%2F%2Flocalhost%3A3000%2Fcallback";


app.get("/", async(req, res) =>{
  res.render("index.ejs");
})

app.get("/login", async (req, res) => {
  res.redirect(
    `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=playlist-modify-private`
  );
});

app.get("/callback", async(req, res) =>{
  const spotifyResponse = await axios.post(
    "https://accounts.spotify.com/api/token",
    querystring.stringify({
      grant_type: "authorization_code",
      code: req.query.code,
      redirect_uri:"http://localhost:3000/callback"
    }),
    {
      headers: {
        Authorization: "Basic " + "N2RlYzAxNTlkOTExNGMzNzkxODYwM2RkNTZhZDA0Njc6ZjViYjk0ZjJhZjFlNDA1NGE5YTkwMWFmNzY5MGY1MTQ=",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )
  client_access_token = spotifyResponse.data.access_token;
  console.log(client_access_token);
  res.render("callback.ejs");
})



app.listen(port, () => console.log(`Server is running on port ${port}`));

function generateRandomString(length) {
  let chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let charLength = chars.length;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
}
