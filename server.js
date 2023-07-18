const cors          = require('cors');
const express       = require('express');
const swaggerUi     = require('swagger-ui-express');
const swaggerJSDoc  = require('swagger-jsdoc');

require('dotenv').config();
const app           = express();
const PORT          = process.env.PORT || 4400;

app.use(cors())

// Swagger configuration

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'sb-nodejs-openai',
      version: '1.0.0',
      description: 'Documentation for RESTful APIs',
      contact: {
        name: 'RAJESH K',
        url: 'https://github.com/rajeshkumaravel',
      },
      license: {
        name: 'Licensed Under MIT',
        url: 'https://github.com/rajeshkumaravel/sb-nodejs-openai/blob/main/LICENSE',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

// Routes
const apiRoutes = require('./api');
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  if (!process.env['OPENAI_API_KEY']) throw new Error('Uh oh, Open AI key is not configured');
  if (!process.env['DEFAULT_MODEL']) throw new Error('Uh oh, Default model is not configured');
  console.log(`Server is running on port ${PORT}`);
});
