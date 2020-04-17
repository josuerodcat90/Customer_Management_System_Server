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
	}

	input userShortInput {
		firstname: String
		lastname: String
		email: String
	}

	input userPasswordInput {
		password: String!
		confirmPassword: String!
	}

	type Mutation {
		createUser(input: userInput!): User!
		login(email: String!, password: String!): User!
		updateUserInfo(userId: ID!, input: userShortInput!): User!
		updateUserPassword(userId: ID!, input: userPasswordInput!): User!
		deleteUser(userId: ID!): String!
	}
`;
