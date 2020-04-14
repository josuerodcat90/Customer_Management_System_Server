import { gql } from 'apollo-server-express';

export default gql`
	type Image {
		_id: ID!
		name: String!
		size: String!
		pacientId: ID!
		dateId: ID!
		uploadedBy: ID!
		url: String!
	}

	type Query {
		getImages: [Image]
		getImage(imageId: ID!): Image
		getImagesByPacient(pacientId: ID!): [Image]
		getImagesByDate(dateId: ID!): [Image]
	}

	input imageInput {
		name: String!
		size: String!
		pacientId: ID!
		dateId: ID!
		url: String!
	}

	type Mutation {
		uploadImage(input: imageInput!): Image!
		deleteImage(imageId: ID!): String!
	}
`;
