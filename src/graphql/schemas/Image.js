import { gql } from 'apollo-server-express';

export default gql`
	type Image {
		_id: ID
		imageName: String!
		size: String!
		id_pac: IdPac!
		id_dat: IdDat!
		fullroute: String!
	}

	type IdPac {
		_id: ID!
	}

	type IdDat {
		_id: ID!
	}

	type Query {
		getImage(imageID: ID!): Image!
		getImages: [Image]!
	}

	input iPac {
		_id: ID!
	}

	input iDat {
		_id: ID!
	}

	input ImageInput {
		imageName: String!
		size: String!
		id_pac: iPac!
		id_dat: iDat!
		fullroute: String!
	}

	type Mutation {
		uploadImage(input: ImageInput!): Image!
		deleteImage(imageID: ID!): Image!
	}
`;
