const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const taskRouter = require('./routes/task.routes.js');

const app = express();

app.disable("x-powered-by")
const corsOptions={
    origin: '*',
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

app.use(taskRouter)

app.use((err, req, res, next) => {
    return res.json({
        message : err.message
    })
})

app.listen(4000)
console.log('Servidor iniciado en el puerto 4000')