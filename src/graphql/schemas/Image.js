import { gql } from 'apollo-server-express';

export default gql`
	type Image {
		_id: ID!
		name: String!
		size: String!
		patient: ID!
		date: ID!
		uploadedBy: ID!
		url: String!
		createdAt: String!
		updatedAt: String
	}

	type Query {
		getImages: [Image]
		getImage(imageId: ID!): Image
		getImagesByPatient(patientId: ID!): [Image]
		getImagesByDate(dateId: ID!): [Image]
	}

	input imageInput {
		name: String!
		size: String!
		patient: ID!
		date: ID!
		url: String!
	}

	type Mutation {
		uploadImage(input: imageInput!): Image!
		deleteImage(imageId: ID!): String!
	}
`;
