const express = require('express');
const cors = require('cors');
const { router } = require('./routes');

const app = express();


const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false, 
};


app.use(cors(corsOptions));
 
app.use(express.json());


app.use('/api', router);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
