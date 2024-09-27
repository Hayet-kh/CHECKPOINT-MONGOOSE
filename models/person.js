const mongoose = require("mongoose");
const validator = require("validator");

// Create a person schema (Prototype)
const personSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: {
		type: String,
		required: true,
		validate: (value) => {
			return validator.isEmail(value);
		},
		unique: true,
	},
	age: { type: Number },
	phoneNumber: { type: Number },
	favoriteFoods: { type: [String] },
	observation: { type: String, default: "No observations" },
});

// Create a person model
const person = mongoose.model("Person", personSchema);

// Export the person model
module.exports = person;
