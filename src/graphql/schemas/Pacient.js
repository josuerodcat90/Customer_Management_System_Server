import { gql } from 'apollo-server-express';

export default gql`
	type Pacient {
		_id: ID!
		firstname: String!
		lastname: String!
		birthDate: String
		idDocument: idDocumentType
		phoneNumber: String!
		email: String
		address: addressType
		referedBy: ID
		allergies: String
		records: [recordType]
		status: Int
	}

	type idDocumentType {
		docType: String
		docNumber: String
	}

	input idDocumentInput {
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

	input addressInput {
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

	input recordInput {
		title: String
		description: String
	}

	input pacientInput {
		firstname: String!
		lastname: String!
		birthDate: String
		idDocument: idDocumentInput
		phoneNumber: String!
		email: String
		address: addressInput
		referedBy: ID
		allergies: String
		records: [recordInput]
		status: Int
	}

	type Query {
		getPacient(pacientId: ID!): Pacient!
		getPacients: [Pacient]!
	}

	type Mutation {
		createPacient(input: pacientInput!): Pacient!
		updatePacient(pacientId: ID!, input: pacientInput): Pacient!
		deletePacient(pacientId: ID!): Pacient!
	}
`;
