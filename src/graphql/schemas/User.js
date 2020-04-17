import { gql } from 'apollo-server-express';

export default gql`
	type User {
		_id: ID!
		firstname: String!
		lastname: String!
		email: String!
		profilePic: profilePicType
		status: Int!
		range: Int!
		token: String!
		bachTitle: String!
		userIcon: String!
		createdAt: String!
		updatedAt: String
	}

	type profilePicType {
		alt: String
		url: String
	}

	input profilePicInput {
		alt: String
		url: String
	}

	type Query {
		getUser(userId: ID): User!
		getUsers: [User!]
	}

	input userInput {
		firstname: String!
		lastname: String!
		email: String!
		password: String!
		confirmPassword: String!
		profilePic: profilePicInput
		status: Int
		range: Int
		bachTitle: String
		userIcon: String
	}

	type Mutation {
		createUser(input: userInput!): User!
		login(email: String!, password: String!): User!
		updateUser(userId: ID!, input: userInput): User!
		deleteUser(userId: ID!): String!
	}
`;
