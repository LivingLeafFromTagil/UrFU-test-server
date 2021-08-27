import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import {writeFile, readFileSync} from 'fs';

const __dirName = path.resolve();
const PORT=8080;
const myServer = express();
const urlEncParser = bodyParser.urlencoded({extended: false});

myServer.get("/orgs", urlEncParser, (req, res)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.sendFile(path.resolve(__dirName, "static", "n1.json"));
  
});

myServer.post("/orgs", urlEncParser, (req, res)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  const fileContent = JSON.parse(readFileSync(path.resolve(__dirName, "static", "n1.json"), "utf8"));
  fileContent.mas.push({name: `${req.body.n}`, tin: `${req.body.t}`, leader: "", category: "", region: "", key: 4})
  writeFile(path.resolve(__dirName, "static", "n1.json"), `${fileContent}`, "utf8", err=>err?console.log(err):console.log("zbs"));
  res.sendFile(path.resolve(__dirName, "static", "n1.json"));
  
  // fs.writeFile(path.resolve(__dirName, "static", "n1.json"), codeStr, "utf8", err=>err?console.log(err):console.log(-1));
  // res.sendFile(path.resolve(__dirName, "static", "n1.json"));
});

myServer.listen(PORT, ()=>{
  console.log(`Started on port ${PORT}...`)
});

