import { gql } from 'apollo-server-express';

export default gql`
	type User {
		_id: ID
		firstname: String!
		lastname: String!
		email: String!
		password: String!
		profilePic: profilePicType
		status: Int!
		range: Int!
		token: String!
		bachTitle: String!
		userIcon: String!
	}

	type profilePicType {
		alt: String
		url: String
	}

	type Query {
		getUser(userID: ID): User!
		getUsers: [User]!
	}

	input userInput {
		firstname: String!
		lastname: String!
		username: String!
		email: String!
		password: String!
		profilePic: profilePicType
		confirmPassword: String!
		status: Int
		range: Int
		bachTitle: String
		userIcon: String
	}

	type Mutation {
		createUser(input: userInput!): User!
		login(username: String!, password: String!): User!
		updateUser(userId: ID!, input: userInput): User!
		deleteUser(userId: ID!): User!
	}
`;
