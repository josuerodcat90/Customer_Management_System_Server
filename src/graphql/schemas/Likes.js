import { gql } from 'apollo-server-express';

export default gql`
	type Like {
		_id: ID!
		createdAt: String!
		nameString: String!
		username: String!
	}
	type Mutation {
		likeDate(dateID: ID!): Date!
	}
`;
