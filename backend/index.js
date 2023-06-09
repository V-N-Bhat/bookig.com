require('dotenv').config();
const express=require('express');
const cors=require('cors');
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY);
const app=express();
const Port=8000;
app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.json("hello");
})
app.post('/payment',async(req,res)=>{
    try{
        const {amount}=req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'INR',
            payment_method_types:['card']
          });
          const clientSecret=paymentIntent.client_secret;
          res.json({
            clientSecret
          })
    }catch(e){
        console.log(e);
    }
})

app.listen(Port,()=>{
    console.log('8000 port')
})