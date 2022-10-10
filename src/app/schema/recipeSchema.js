module.exports = {
  $id: "#/definitions/recipe",
  type: "object",
  properties: {
    id: { type: "integer" },
    title: { type: "string" },
    description: { type: "string" },

    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
    userId: { type: "integer" },
  },
  required: ["title", "description"],
  additionalProperties: true,
};
