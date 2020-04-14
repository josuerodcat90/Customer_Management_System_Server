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
		doctorId: ID
		createdBy: ID!
		pacientId: ID
		createdAt: String!
		updatedAt: String
	}

	type Query {
		getDates: [Date]!
		getDatesByPacient(pacientId: ID!): [Date]!
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
		doctorId: ID
		pacientId: ID
	}

	type Mutation {
		createDate(input: dateInput!): Date!
		updateDate(dateId: ID!, input: dateInput!): Date!
		deleteDate(dateId: ID!): String!
	}
`;
