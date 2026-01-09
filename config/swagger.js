const swaggerJSDoc = require("swagger-jsdoc");

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Icaro Personal Trainers API",
      version: "1.0.0",
      description: "API documentation for Icaro Personal Trainers application",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js", "./controllers/*.js"], // Path to the API docs
});

module.exports = swaggerSpec;
