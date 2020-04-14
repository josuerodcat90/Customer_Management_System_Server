import { gql } from 'apollo-server-express';

export default gql`
	type Doctor {
		_id: ID!
		firstname: String!
		lastname: String!
		status: Int!
		bachTitle: String!
		userIcon: String!
		createdAt: String!
		updatedAt: String
	}

	type Query {
		getDoctors: [Doctor]
		getDoctor(doctorId: ID!): Doctor
	}

	input doctorInput {
		firstname: String!
		lastname: String!
		status: Int!
	}

	type Mutation {
		createDoctor(input: doctorInput!): Doctor!
		updateDoctor(doctorId: ID!, input: doctorInput!): Doctor!
		deleteDoctor(doctorId: ID!): Doctor!
	}
`;
