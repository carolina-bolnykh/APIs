import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "carolinabolnykh";
const yourPassword = "password";
const yourAPIKey = "4945ab57-f990-4b7e-8f4b-90b09fd6a1fd";
const yourBearerToken = "ade251d0-fc49-46b6-b4dd-d5378311d9af";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

// Use axios to hit up the /random endpoint
// The data you get back should be sent to the ejs file as "content"
// use JSON.stringify to turn the JS object from axios into a string, JSON format is sort of like string!
app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    const result = response.data;
    console.log(result);
    console.log(JSON.stringify(result));
    res.render("index.ejs", {
      content: JSON.stringify(result),
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});

app.get("/basicAuth", async(req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
    try {
      const response = await axios.get("https://secrets-api.appbrewery.com/all?page=2", {
        auth: {username: yourUsername, 
        password: yourPassword,
      },
      });
      const result = response.data;
      console.log(result);
      console.log(JSON.stringify(result));
      res.render("index.ejs", {
        content: JSON.stringify(result),
      });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: "No activities that match your criteria.",
      });
    }
});

app.get("/apiKey", async(req, res) => {
  // code here to hit up the /filter endpoint
  // Filter for all secrets with an embarassment score of 5 or greater
  // You need to provide a query parameter of apiKey in the request.
  // Learned that you can send parameters in the request of axios
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/filter?",
    {params: {
      score:5,
      apiKey: yourAPIKey,
    }});
    const result = response.data;
    console.log(result);
    console.log(JSON.stringify(result));
    res.render("index.ejs", {
      content: JSON.stringify(result),
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});

app.get("/bearerToken", async(req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 2
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */

  const config = {
    headers: { Authorization: `Bearer ${yourBearerToken}` }
  };
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/secrets/2",
    config,);
    const result = response.data;
    console.log(result);
    console.log(JSON.stringify(result));
    res.render("index.ejs", {
      content: JSON.stringify(result),
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
