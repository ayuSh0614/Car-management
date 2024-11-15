const app = require('./app');
const PORT = process.env.PORT || 5000;
const express = require('express');

const cors = require('cors')


// const RegisterModel = require('./Register')

const cap = express()

cap.use(cors(
    {

        origin: ["https://deploy-mern-1whq.vercel.app"], 
        methods: ["POST", "GET"],
        
        credentials: true

    }

));
cap.use(express.json());
cap.get("/", (req, res) =>{
    res.json("Hello");
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
