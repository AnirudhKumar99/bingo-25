const express = require("express");
const fs = require("fs");
const morgan=require('morgan')


let rawData = fs.readFileSync("database.json");
let data = JSON.parse(rawData);
let users=data['users'];

// let newUser = { name: "Anirudh Kumar", password: "paaswoord" };
// users.push(newUser);
// // console.log(users)
// let database={"users":users}
// let newData=JSON.stringify(database);
// fs.writeFileSync('database.json',newData)


const userExists=(name,password)=>{
    for(let user of users){
        if(user.name==name && user.password==password){
            console.log('User exists');
            return true;
        }
    }
    console.log("User does not exist")
    return false;
};
 
// userExists("Anirudh","password")


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(morgan('dev'))


app.get('/a',(req,res)=>{
    res.json({
        "message":"Hello world"
    })
})

app.post('/login',(req,res)=>{
    const user=req.body;
    console.log(req);
    const status=userExists(user.name,user.password);
    console.log(status)
    res.json({
        status:status
    })
})

app.listen(port, () =>
  console.log(`app running on port ${port} use http://localhost:${port}`)
);
