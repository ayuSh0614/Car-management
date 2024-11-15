// backend/server.js
const app = require('./app');
const PORT = process.env.PORT || 5000;

const cors = require('cors')

const RegisterModel = require('./models/Register')

const app = express()

app.use(cors(
    {

        origin: ["https://deploy-mern-1whq.vercel.app"], 
        methods: ["POST", "GET"],
        
        credentials: true

    }

));
app.use(express.json());
app.get("/", (req, res) =>{
    res.json("Hello");
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
