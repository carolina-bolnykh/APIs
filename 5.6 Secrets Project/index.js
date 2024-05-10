// HINTS:
// 1. Import express and axios
import express from "express";
import axios from "axios";
import bodyparser from "body-parser";

// 2. Create an express app and set the port number.
const app = express();

// 3. Use the public folder for static files.
// any static files used we can refer to as public/styles/main.css etc..
app.use(express.static("public"));

// 4. When the user goes to the home page it should render the index.ejs file.
app.get("/", async(req, res) => {
    try{
        // result is a javascript object
        const result = await axios.get("https://secrets-api.appbrewery.com/random");
        console.log(result.data);
        res.render("index.ejs", {
            secret: result.data["secret"],
            user: result["username"],
        });
    } catch(error){
        res.render("index.ejs");
    }
})

// 6. Listen on your predefined port and start the server.
app.listen(3000);