import { gql } from 'apollo-server-express';

export default gql`
	type Date {
		_id: ID!
		title: String!
		start_date: String!
		end_date: String!
		classname: String
		pacient: ID!
		nameString: String!
		username: String!
		comments: [Comment]!
		commentCount: Int!
		likes: [Like]!
		likeCount: Int!
		images: [Image]
		description: String
		editable: Boolean
		createdAt: String!
		imageCount: Int!
	}

	type Query {
		getDates: [Date]
		getDate(dateID: ID!): Date
	}

	input DateInput {
		title: String!
		start_date: String!
		end_date: String!
		classname: String
		description: String
		pacient: ID!
	}

	type Mutation {
		createDate(input: DateInput!): Date!
		updateDate(dateID: ID!, description: String!): Date!
		deleteDate(dateID: ID!): String!
	}
`;
