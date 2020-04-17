import { gql } from 'apollo-server-express';

export default gql`
	type Patient {
		_id: ID!
		firstname: String!
		lastname: String!
		birthDate: String
		idDocument: idDocumentType
		phoneNumber: String!
		email: String
		address: addressType
		referedBy: User
		allergies: String
		records: [recordType]
		status: Int
		createdAt: String!
		updatedAt: String
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

	input patientInput {
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
		getPatient(patientId: ID!): Patient!
		getPatients: [Patient]!
	}

	type Mutation {
		createPatient(input: patientInput!): Patient!
		updatePatient(patientId: ID!, input: patientInput): Patient!
		deletePatient(patientId: ID!): Patient!
	}
`;
