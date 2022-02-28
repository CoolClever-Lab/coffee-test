export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Coffee",
    version: "1.0.0",
    description: "Сервис по наливке напитков",
  },
  servers: [
    {
      url: "http://localhost:5777",
    },
  ],
  tags: [
    {
      name: "Очередь",
    },
  ],
  paths: {
    "/coffee": {
      post: {
        tags: ["Очередь"],
        summary: "Наливка напитка",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/schema",
              },
            },
          },
        },
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ok200",
                },
              },
            },
          },
          403: {
            description: "Ошибка сервиса",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error403",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      schema: {
        type: "object",
        properties: {
          product_id: {
            type: "number",
          },
          card_id: {
            type: "string",
          },
          device_id: {
            type: "string",
          },
        },
        required: ["product_id", "card_id", "device_id"],
      },
      ok200: {
        type: "object",
        properties: {
          result: {
            type: "string",
          },
        },
        required: ["result"],
      },
      error403: {
        type: "object",
        properties: {
          result: {
            type: "string",
          },
          error_code: {
            type: "string",
          },
          error_message: {
            type: "string",
          },
        },
        required: ["result", "error_code", "error_message"],
      },
    },
  },
};
