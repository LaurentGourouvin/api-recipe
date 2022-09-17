module.exports = {
  $id: "#/definitions/user",
  type: "object",
  properties: {
    id: { type: "integer" },
    firstname: { type: "string" },
    lastname: { type: "string" },
    password: { type: "string" },
    email: { type: "string", format: "email" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
    roleId: { type: "integer" },
  },
  required: ["firstname", "lastname", "password", "email"],
  additionalProperties: false,
};
