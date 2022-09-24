module.exports = {
  $id: "#/definitions/recipe",
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    description: { type: "string" },
    image: { type: "string", format: "uri" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
    userId: { type: "integer" },
  },
  required: ["name", "description", "userId"],
  additionalProperties: false,
};
