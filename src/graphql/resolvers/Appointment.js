import Appointment from '../../models/Appointment';
import checkAuth from '../../utils/checkAuth';
import moment from 'moment';
import { AuthenticationError } from 'apollo-server-core';

export default {
	Query: {
		async getAppointments() {
			try {
				const appointments = await Appointment.find();
				return appointments;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getAppointment(_, { appointmentId }) {
			try {
				const appointment = await Appointment.findOne({ _id: appointmentId });
				if (!appointment) {
					throw new Error('Appointment not found!', Error);
				} else {
					return appointment;
				}
			} catch (err) {
				throw new Error(err);
			}
		},
		async getAppointmentsByPatient(_, { patientId }) {
			try {
				const appointments = await Appointment.find({ patient: patientId }).sort({
					createdAt: -1,
				});
				if (!appointments) {
					throw new Error('Appointments of this patient not found!', Error);
				} else {
					return appointments;
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		async createAppointment(
			_,
			{
				input: {
					title,
					start_date,
					end_date,
					classname,
					description,
					editable,
					allday,
					doctor,
					patient,
				},
			},
			context
		) {
			const user = checkAuth(context);

			///verify if the fields are empty
			if (title.trim() === '') {
				throw new Error('Title field must not be empty');
			}
			if (start_date.trim() === '') {
				throw new Error('Start date field must not be empty');
			}
			if (end_date.trim() === '') {
				throw new Error('End date field must not be empty');
			}

			const newAppointment = new Appointment({
				title,
				start_date: moment(start_date).format('YYYY/MM/DD HH:mm'),
				end_date: moment(end_date).format('YYYY/MM/DD HH:mm'),
				classname,
				description,
				editable,
				allday,
				doctor,
				createdBy: user._id,
				patient,
				createdAt: moment().format('YYYY/MM/DD HH:mm'),
			});

			const appointment = await newAppointment.save();

			return appointment;
		},
		async updateAppointment(
			_,
			{
				appointmentId,
				input: {
					title,
					start_date,
					end_date,
					classname,
					description,
					editable,
					allday,
					doctor,
					patient,
				},
			},
			context
		) {
			const user = checkAuth(context);
			const appointment = await Appointment.findOne(
				{ _id: appointmentId },
				{},
				{ autopopulate: false }
			);

			try {
				if (appointment.createdBy == user._id) {
					const updatedAppointment = await Appointment.findOneAndUpdate(
						{ _id: appointmentId },
						{
							title,
							start_date: moment(start_date).format('YYYY/MM/DD HH:mm'),
							end_date: moment(end_date).format('YYYY/MM/DD HH:mm'),
							classname,
							description,
							editable,
							allday,
							doctor,
							createdBy: user._id,
							patient,
							updatedAt: moment().format('YYYY/MM/DD HH:mm'),
						},
						{ new: true }
					);
					return updatedAppointment;
				} else {
					throw new AuthenticationError(
						'Action not allowed, you must be logged on or have a valid token to update an appointment.'
					);
				}
			} catch (err) {
				throw new Error(err);
			}
		},
		async deleteAppointment(_, { appointmentId }, context) {
			const user = checkAuth(context);
			const appointment = await Appointment.findOne(
				{ _id: appointmentId },
				{},
				{ autopopulate: false }
			);

			try {
				if (appointment.createdBy == user._id) {
					await appointment.delete();
					return 'Appointment deleted succesfully.';
				} else {
					throw new AuthenticationError(
						'Action not allowed, you must be logged on or have a valid token to delete an appointment.'
					);
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};