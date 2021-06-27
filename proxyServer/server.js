const express = require("express");
const path = require("path");
const axios = require("axios");
const app = express(),
  bodyParser = require("body-parser");
port = 3080;

// place holder for the data
const users = [];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../my-app/build")));
app.post(`/api/v1/dashboard/getData`, async (req, res) => {
  let proxReq;

  try {
    proxReq = await axios.get(`http://3.65.109.190/api/v1/dashboard/stats`, {
      headers: {
        Authorization: `${req.body.authToken}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
  res.send(JSON.stringify(proxReq.data.data));
});
app.post(`/api/v1/:apiEnd/getData`, async (req, res) => {
  let proxReq;
  try {
    proxReq = await axios.get(
      `http://3.65.109.190/api/v1/${req.params.apiEnd}`,
      {
        headers: {
          Authorization: `${req.body.authToken}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
  res.send(JSON.stringify(proxReq.data.data));
});

app.post("/api/v1/:apiEnd", async (req, res) => {
  let data;
  console.log(req.body.data)
  try {
    data = await axios.post(
      `http://3.65.109.190/api/v1/${req.params.apiEnd}`,
      req.body.data,
      {
        headers: {
          Authorization: `${req.body.authToken}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
  res.send(JSON.stringify(data.data));
});

app.post("/api/v1/users/:userAPI", async (req, res) => {
  let proxReq;
  try {
    proxReq = await axios.post(
      `http://3.65.109.190/api/v1/users/${req.params.userAPI}`,
      req.body.data
    );
  } catch (error) {
    console.error(error);
  }
  res.send(JSON.stringify(proxReq.data));
});


app.get("/", (req, res) => {
  res.send(`<h1>API Running on the port ${port}</h1>`);
});




app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});

