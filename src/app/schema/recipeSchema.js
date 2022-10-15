module.exports = {
  $id: "#/definitions/recipe",
  type: "object",
  properties: {
    id: { type: "integer" },
    title: { type: "string" },
    description: { type: "string" },
    level: { type: "string" },
    duration: { type: "string" }, // String car envoyé par un formData mais INTEGER dans la BDD
    person: { type: "string" }, // String car envoyé par un formData mais INTEGER dans la BDD
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
    userId: { type: "integer" },
  },
  required: ["title", "description", "level", "duration", "person"],
  additionalProperties: true,
};
