module.exports = {
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    createdAt: { type: "string", format: "date-time" },
  },
  required: ["name"],
  additionalProperties: false,
};
