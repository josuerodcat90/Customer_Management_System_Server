import { gql } from 'apollo-server-express';

export default gql`
	type Appointment {
		id: ID!
		title: String!
		start: String!
		end: String!
		className: String
		description: String
		editable: Boolean
		allDay: Boolean
		doctor: Doctor
		createdBy: User!
		patient: Patient
		createdAt: String!
		updatedAt: String
	}

	type Query {
		getAppointment(appointmentId: ID!): Appointment!
		getAppointments: [Appointment!]!
		getAppointmentsByDoctor(doctorId: ID!): [Appointment!]
		getAppointmentsByPatient(patientId: ID!): [Appointment!]
		getAppointmentsByDateRange(startDate: String!, endDate: String!): [Appointment!]
	}

	input appointmentInput {
		title: String!
		start: String!
		end: String!
		className: String
		description: String
		editable: Boolean
		allDay: Boolean
		doctor: ID
		patient: ID
	}

	type Mutation {
		createAppointment(input: appointmentInput!): Appointment!
		updateAppointment(appointmentId: ID!, input: appointmentInput!): Appointment!
		deleteAppointment(appointmentId: ID!): String!
	}
`;
