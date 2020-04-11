import { gql } from 'apollo-server-express';

export default gql`
	type Image {
		_id: ID!
		name: String!
		size: String!
		pacientId: ID!
		dateId: ID!
		url: String!
	}

	type Query {
		getImages: [Image]
		getImage(imageId: ID!): Image
		getImagesByPacient(pacientId: ID!): [Image]
		getImagesByDate(dateId: ID!): [Image]
	}

	input ImageInput {
		name: String!
		size: String!
		pacientId: ID!
		dateId: ID!
		url: String!
	}

	type Mutation {
		uploadImage(input: ImageInput!): Image!
		deleteImage(imageId: ID!): String!
	}
`;
