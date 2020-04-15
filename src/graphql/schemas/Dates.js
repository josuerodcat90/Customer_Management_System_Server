import { gql } from 'apollo-server-express';

export default gql`
	type Date {
		_id: ID!
		title: String!
		start_date: String!
		end_date: String!
		classname: String
		description: String
		editable: Boolean
		allday: Boolean
		doctor: ID
		createdBy: ID!
		patient: ID
		createdAt: String!
		updatedAt: String
	}

	type Query {
		getDates: [Date]!
		getDatesByPatient(patientId: ID!): [Date]!
		getDate(dateId: ID!): Date!
	}

	input dateInput {
		title: String!
		start_date: String!
		end_date: String!
		classname: String
		description: String
		editable: Boolean
		allday: Boolean
		doctor: ID
		pacient: ID
	}

	type Mutation {
		createDate(input: dateInput!): Date!
		updateDate(dateId: ID!, input: dateInput!): Date!
		deleteDate(dateId: ID!): String!
	}
`;
