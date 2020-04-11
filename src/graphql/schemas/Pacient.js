import { gql } from 'apollo-server-express';

export default gql`
	type Pacient {
		_id: ID!
		firstname: String!
		lastname: String!
		birthDate: Date
		idDocument: IdDocumentType
		phoneNumber: String!
		email: String
		address: addressType
		referedBy: ID
		allergies: String
		records: [recordType]
		status: Int
	}

	type IdDocumentType {
		docType: String
		docNumber: String
	}

	type addressType {
		zipcode: String
		city: String
		township: String
		street: String
		apartment: String
	}

	type recordType {
		title: String
		description: String
	}

	type Query {
		getPacient(pacientId: ID!): Pacient!
		getPacients: [Pacient]!
	}

	input pacientInput {
		firstname: String!
		lastname: String!
		birthDate: Date
		idDocument: IdDocumentType
		phoneNumber: String!
		email: String
		address: addressType
		referedBy: ID
		allergies: String
		records: recordType
		status: Int
	}

	type Mutation {
		createPacient(input: pacientInput!): Pacient!
		updatePacient(pacientId: ID!, input: pacientInput): Pacient!
		deletePacient(pacientId: ID!): Pacient!
	}
`;
