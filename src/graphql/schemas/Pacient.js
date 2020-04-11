import { gql } from 'apollo-server-express';

export default gql`
	type Pacient {
		_id: ID
		firstname: String!
		lastname: String!
		dob: String
		phonenumber: String!
		email: String
		status: Int!
		dates: [Date!]
		images: [Image]
	}

	type Query {
		getPacient(pacientID: ID!): Pacient!
		getPacients: [Pacient]!
	}

	input PacientInput {
		firstname: String!
		lastname: String!
		dob: String
		phonenumber: String!
		email: String
		status: Int!
	}

	type Mutation {
		createPacient(input: PacientInput!): Pacient!
		updatePacient(pacientID: ID!, input: PacientInput): Pacient!
		deletePacient(pacientID: ID!): Pacient!
	}
`;
