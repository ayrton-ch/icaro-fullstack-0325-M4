const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [
    path.join(__dirname, "../routes/*.js"),
    path.join(__dirname, "../controllers/*.js"),
  ],
});

module.exports = swaggerSpec;
