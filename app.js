import express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { Agent } from 'http';

const __dirname=path.resolve();

const port=80;
var app=express();

app.use('/static',express.static('static'))
app.use(express.urlencoded());

app.set("view engine","pug");
app.set("views",path.join(__dirname,"views"))

app.get('/',(req,res)=>{
    res.status(200).render('try.pug',{"title":'PUG',"content":'Hello beautiful people',"headi":'PUG with EXPRESS'});
});

app.post('/',(req,res)=>{
    
    const uname=req.body.username
    const email=req.body.email
    const age=req.body.age
    

    let outputToWrite=`\nThe name of the entered user is ${uname}. Email is ${email} . Age is ${age}`
    if(fs.existsSync) {
        fs.appendFileSync('output.txt',outputToWrite)
    }
    else{
        fs.writeFileSync('output.txt',outputToWrite)
    }
    
   

    const parm={'message': "your form has been successfully submitted"}
    res.status(200).render('try.pug',parm);

});

app.listen(port, ()=>{
    console.log(`Server Started on http://localhost:${port}`)
})