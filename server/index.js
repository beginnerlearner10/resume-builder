const express=require('express');
const cors=require('cors');
const pdf=require('html-pdf');
const pdfSample = require('./pdf-sample');

const app=express();
const PORT=4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/create-pdf',(req,res)=>{
    pdf.create(pdfSample(req.body),{}).toFile("Resume.pdf",(err)=>{
        if(err){
            res.send(Promise.reject());
            console.log(err);
        }
        res.send(Promise.resolve());
        console.log("success");
    });
});

app.get("/fetch-pdf",(req,res)=>{
    res.sendFile(`${__dirname}/Resume.pdf`);
});

app.use(express.static("../client/build"));


app.listen(PORT,()=>{
    console.log("running");
});

