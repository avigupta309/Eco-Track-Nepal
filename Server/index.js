import express from 'express'
const app=express()

app.get((req,res)=>{
    res.end("hello")
})


app.listen(3000,()=>{
    console.log("Server is Started at port 3000")
})