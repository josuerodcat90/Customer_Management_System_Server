import Appointment from '../../models/Appointment';
import checkAuth from '../../utils/checkAuth';
import moment from 'moment';
import { AuthenticationError } from 'apollo-server-core';

export default {
	Query: {
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
		async getAppointments() {
			try {
				const appointments = await Appointment.find();
				return appointments;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getAppointmentsByDoctor(_, { doctorId }) {
			try {
				const appointments = await Appointment.find({ doctor: doctorId }).sort({
					start: -1,
				});
				if (!appointments) {
					throw new Error('Appointments of this doctor not found!', Error);
				} else {
					return appointments;
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
		async getAppointmentsByDateRange(_, { startDate, endDate }) {
			const start = moment(startDate).startOf('day').format('YYYY-MM-DD HH:mm');
			const end = moment(endDate).endOf('day').format('YYYY-MM-DD HH:mm');

			try {
				const appointments = await Appointment.find({
					start: { $gte: start, $lt: end },
				}).sort({
					start: 1,
				});
				if (!appointments) {
					throw new Error('No Appointments found between this date range!', Error);
				} else {
					return appointments;
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		async createAppointment(_, { input }, context) {
			const user = checkAuth(context);

			///verify if the fields are empty
			if (input.title.trim() === '') {
				throw new Error('Title field must not be empty');
			}
			if (input.start.trim() === '') {
				throw new Error('Start date field must not be empty');
			}
			if (input.end.trim() === '') {
				throw new Error('End date field must not be empty');
			}

			const newAppointment = new Appointment({
				...input,
				start: moment(input.start).format('YYYY-MM-DD HH:mm'),
				end: moment(input.end).format('YYYY-MM-DD HH:mm'),
				createdBy: user._id,
				createdAt: moment().format('YYYY-MM-DD HH:mm'),
			});

			const appointment = await newAppointment.save();

			return appointment;
		},
		async updateAppointment(_, { appointmentId, input }, context) {
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
							...input,
							start: moment(input.start).format('YYYY-MM-DD HH:mm'),
							end: moment(input.end).format('YYYY-MM-DD HH:mm'),
							updatedAt: moment().format('YYYY-MM-DD HH:mm'),
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
