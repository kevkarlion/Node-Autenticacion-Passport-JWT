const express = require('express');
//cors para el manejo de paginas habilitadas para
//consumir nuestra app
const cors = require('cors');
const routerApi = require('./routes');

const { checkApiKey } = require('./middlewares/auth.handler');
const { logErrors, errorHandler, boomErrorHandler, omrErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

//Agregue un checkApiKey para validar
//los ingresos a ciertos endpoints.
//Uso de middlewares, que grande papa
app.get('/nueva-ruta', checkApiKey ,(req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(checkApiKey);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(omrErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Mi port' +  port);
});
