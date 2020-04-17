import { gql } from 'apollo-server-express';

export default gql`
	type Appointment {
		_id: ID!
		title: String!
		start_date: String!
		end_date: String!
		classname: String
		description: String
		editable: Boolean
		allday: Boolean
		doctor: Doctor
		createdBy: User!
		patient: Patient
		createdAt: String!
		updatedAt: String
	}

	type Query {
		getAppointments: [Appointment!]!
		getAppointmentsByPatient(patientId: ID!): [Appointment!]
		getAppointment(appointmentId: ID!): Appointment!
	}

	input appointmentInput {
		title: String!
		start_date: String!
		end_date: String!
		classname: String
		description: String
		editable: Boolean
		allday: Boolean
		doctor: ID
		patient: ID
	}

	type Mutation {
		createAppointment(input: appointmentInput!): Appointment!
		updateAppointment(appointmentId: ID!, input: appointmentInput!): Appointment!
		deleteAppointment(appointmentId: ID!): String!
	}
`;
