require("dotenv").config();

const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;

// Require the services from the services folder - CRUD operations
const {
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
} = require("./services/personServices");

async function run() {
	try {
		// Connect to the database
		await mongoose
			.connect(uri, {
				// useNewUrlParser: true, // Not required in Mongoose 6
				// useUnifiedTopology: true, // Not required in Mongoose 6
			})
			.then(() => {
				console.log("Connected to the database");
			});

		// //Create a new person if the email doesn't exist
		// await createPerson({
		// 	name: "Piper Halliwell",
		// 	age: 29,
		// 	favoriteFoods: ["Soup", "Salad", "Spaghetti"],
		// 	email: "Piper-Halliwell@gmail.com",
		// 	observations: "She's a witch, she can freeze time",
		// });

		// //Create many records with Model.create()
		// await createManyPeople([
		// 	{
		// 		name: "Leo Wyatt",
		// 		age: 31,
		// 		favoriteFoods: ["Pizza", "Salad", "Spaghetti"],
		// 		email: "Leo-Wyatt@gmail.com",
		// 		observations: "He's a whitelighter, he can heal people",
		// 	},
		// 	{
		// 		name: "Cole Turner",
		// 		age: 35,
		// 		favoriteFoods: ["Pizza", "Salad", "Spaghetti"],
		// 		email: "Cole-Turner@gmail.com",
		// 		observations: "He's a demon, he can teleport",
		// 	},
		// 	{
		// 		name: "Darryl Morris",
		// 		age: 35,
		// 		favoriteFoods: ["Pizza", "Salad", "Spaghetti"],
		// 		email: "Darryl-Morris@gmail.com",
		// 		observations: "He's a cop, he helps the sisters",
		// 	},
		// ]);

		// //Filter people by name
		// await findPeopleByName("Ross Geller");

		// //Filter people by favorite foods - find one person
		// await findPersonByFavoriteFoods("Pizza");

		// //Filter people by id
		// await findPersonById("66e764092ca3e29c06d67eef");

		// //Update a person's favorite foods
		// await updatePersonFavoriteFoods("66e764092ca3e29c06d67eef", "Ice Cream");

		// //Update a person's age by name
		// await updatePersonAgeByName("Chandler Bing", 32);

		// //Remove a person by id
		// await deleteUserById("66e764092ca3e29c06d67eef");

		// //Remove many people by name
		// await deleteManyPeopleByName("Mary");

		// //Chain query : Find people who like Pizza, sort by name, limit to 2 records, exclude the age field from the results
		// await chainQuery("Pizza");
	} finally {
		//Ensures that the client will close when you finish/error
		await mongoose.connection.close().then(() => {
			console.log("Disconnected from the database");
		});
	}
}
run().catch(console.dir); // console.dir is used to display the full object
