const Person = require("../models/person");

//Create a new person with Model.save()
const createPerson = async (newPersonData) => {
	console.log("Creating person:", newPersonData.name);
	const personToSave = new Person(newPersonData);
	let errorOccurred;
	let savedPerson;
	try {
		// Attempt to create the document
		savedPerson = await personToSave.save();
	} catch (error) {
		if (error.code === 11000) {
			// Extract relevant error details
			console.error(
				`Person can't be saved, Email Already Exist - Duplicate key error: ${JSON.stringify(
					error.keyValue
				)}`
			);
		} else {
			// Log other types of errors
			console.error(`Error saving person with email ${newPersonData.email}:`);
		}
	}
	// Log the results
	if (savedPerson) {
		console.log("Person saved:", savedPerson);
	}
	return { savedPerson, errorOccurred };
};

// Create many records with Model.create()
const createManyPeople = async (arrayOfPeople) => {
	let results = [];
	let errors = [];

	for (let person of arrayOfPeople) {
		console.log("Creating person:", person.name);
		try {
			// Attempt to create the document
			let savedPerson = await Person.create(person);
			results.push(savedPerson);
		} catch (error) {
			if (error.code === 11000) {
				// Extract relevant error details
				let message = `${
					person.name
				} can't be saved, Email Already Exist Duplicate key error: ${JSON.stringify(
					error.keyValue
				)}`;
				console.log(`Error: ${message}`);
				errors.push({ person, message });
			} else {
				// Log other types of errors
				console.error(
					`Error saving person with email ${person.email}:`,
					error.message
				);
				errors.push({ person, error: error.message });
			}
		}
	}

	// Log the results
	if (results.length > 0) {
		for (let result of results) {
			console.log("Person saved:", result);
		}
	}

	return { results, errors };
};

// Filter people by name
const findPeopleByName = async (name) => {
	try {
		// Find people by name
		const people = await Person.find({ name: name });

		// Check if any results were found
		if (people.length === 0) {
			console.log("No person found with the given name.");
			return null;
		}

		// Return a message with the total number of results
		console.log(`Documents found with the name ${name}:`, people);
		console.log(`Total number of results: ${people.length}`);
		return people;
	} catch (error) {
		console.error(`Error finding people by name: ${error.message}`);
		throw error; // Propagate the error
	}
};

// Filter one person by favorite foods
const findPersonByFavoriteFoods = async (favoriteFoods) => {
	try {
		// Find people by favorite foods
		const people = await Person.findOne({
			favoriteFoods: { $in: favoriteFoods },
		});

		// Check if any results were found
		if (people.length === 0) {
			console.log("No person found with the given favorite foods.");
			return null;
		}

		// Return the result
		console.log(
			`Person/people found with the favorite foods ${favoriteFoods}:`,
			people
		);
		return people;
	} catch (error) {
		console.error(`Error finding people by favorite foods: ${error.message}`);
		throw error; // Propagate the error
	}
};

// Filter people by _id
const findPersonById = async (id) => {
	try {
		// Find person by id
		const person = await Person.findById(id);
		console.log("person : ", person);

		// Check if any results were found
		if (!person) {
			console.log("No person found with the given id.");
			return null;
		}

		// Return the result
		console.log(`Person found with the id ${id}: `, person);
		return person;
	} catch (error) {
		console.error(`Error finding person by id: ${error.message}`);
		throw error; // Propagate the error
	}
};

// Update a person's favorite foods
const updatePersonFavoriteFoods = async (id, newFavoriteFood) => {
	try {
		// Find person by id
		let personToFind = await findPersonById(id);
		const person = new Person(personToFind);

		//Add the new favorite food to the array
		if (!person.favoriteFoods.includes(newFavoriteFood)) {
			person.favoriteFoods.push(newFavoriteFood);

			// Save the updated document
			await person.save().then((updatedPerson) => {
				console.log(
					`Favorite food : ${newFavoriteFood} added to the list: `,
					updatedPerson
				);
			});
		} else {
			console.log(
				`Favorite food : ${newFavoriteFood} already exists in the list.`
			);
		}
	} catch (error) {
		console.error(`Error updating person by id: ${error.message}`);
		throw error; // Propagate the error
	}
};

// Update a person's age by name
const updatePersonAgeByName = async (name, newAge) => {
	try {
		// Update the age
		let person = await Person.findOneAndUpdate(
			{ name: name },
			{ age: newAge },
			{ new: true }
		);

		// Check if any results were found
		if (!person) {
			console.log("No person found with the given name.");
			return null;
		} else {
			console.log(`${person.name} 's age updated to ${newAge}: `, person);
			return person;
		}
	} catch (error) {
		console.error(`Error updating person's age by name: ${error.message}`);
		throw error; // Propagate the error
	}
};

// Delete a person by ID
const deleteUserById = async (id) => {
	try {
		const person = await Person.findByIdAndDelete(id); //findByIdAndRemove is deprecated
		if (person) {
			console.log("User removed:", person);
			return person;
		} else {
			console.log("No user found with that ID");
			return null;
		}
	} catch (error) {
		console.error("Error removing person by ID:", error);
		throw error;
	}
};

// Delete many people by name : "Mary"
const deleteManyPeopleByName = async (name) => {
	try {
		const result = await Person.deleteMany({ name: name });
		console.log("Deleted people with the name Mary:", result);
	} catch (error) {
		console.error("Error deleting people by name:", error);
		throw error;
	}
};

// Chain query : Find people who like Pizza, sort by name, limit to 2 records, exclude the age field from the results
const chainQuery = async (food) => {
	try {
		const people = await Person.find({ favoriteFoods: food })
			.sort({ name: 1 }) // 1 for ascending order, -1 for descending order
			.limit(2) // Limit the output to 2 records
			.select("-age") // Exclude the age field from the results
			.exec(); // Execute the query
		console.log("People who like Pizza:", people);
	} catch (error) {
		console.error("Error chaining query:", error);
		throw error;
	}
};

// Export the functions
module.exports = {
	createPerson,
	createManyPeople,
	findPeopleByName,
	findPersonByFavoriteFoods,
	findPersonById,
	updatePersonFavoriteFoods,
	updatePersonAgeByName,
	deleteUserById,
	deleteManyPeopleByName,
	chainQuery,
};
