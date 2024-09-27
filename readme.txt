# Mongoose Database Management Exercise

Overview
This repository contains a guide, you will follow a series of steps to handle and manage your database using Mongoose. 

Instructions
1. Installing and Setting Up Mongoose
    - Add MongoDB and Mongoose to Your Project:Include MongoDB and Mongoose in your project’s package.json file.
    - Store MongoDB URI: Save your MongoDB Atlas database URI in a private .env file as MONGO_URI.
    - Connect to the Database: Use the Mongoose connect method to establish a connection to your MongoDB database. Include options for useNewUrlParser and useUnifiedTopology.

2. Create a Person Schema
    - Define the Schema:Create a schema for a Person with the following fields:
        Name: string (required)
        Age: number
        Favorite Foods: array of strings (optional)
    - Use basic schema types and consider adding additional fields, validators (like required or unique), and default values as needed.

3. Create and Save a Record
    - Create a Document Instance: Instantiate a new Person document with the fields: name, age, and favoriteFoods. Ensure the values match the schema definitions.
    - Save the Document: Save the document to the database, handling the result with a callback function.

4. Create Multiple Records
    - Use Model.create(): To seed the database with multiple records, use the model.create() method. Pass an array of objects, each representing a Person.

5. Search the Database 
    - Find Records by Name: 
        - Use model.find() to retrieve all documents with a specified name.
        - Find One Record by Favorite Food:Use model.findOne() to locate a single person whose favorite food matches a given value.
        - Find by _id:Use model.findById() to find a person by their unique _id.

6. Update Records
    - Classic Updates:
        - Find a person by _id, modify their list of favorite foods by adding an item, and save the updated document. 
        - Update with model.findOneAndUpdate(): Locate a person by name and update their age to 20. Ensure that the updated document is returned by setting the { new: true } option.

7. Delete Records
    - Delete One Document:Remove a person from the database by their _id. Use model.findByIdAndRemove() or model.findOneAndRemove() for this operation.
    - Delete Many Documents: Delete all records where the name is "Mary" using model.remove(). Note that this method does not return the deleted documents but provides a result summary.

8. Chain Search Query Helpers
    Advanced Queries:
    Find people who like a specific food (e.g., burritos), sort the results by name, limit the output to two records, and exclude the age field from the results. Use query chaining methods like .find(), .sort(), .limit(), .select(), and .exec().
