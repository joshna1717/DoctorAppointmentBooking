/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Doctor, Appointment } from '../types';
import { INITIAL_DOCTORS } from '../constants';

const DOCTORS_KEY = 'docschedule_doctors';
const APPOINTMENTS_KEY = 'docschedule_appointments';

export const storage = {
  getDoctors: (): Doctor[] => {
    const data = localStorage.getItem(DOCTORS_KEY);
    if (!data) {
      localStorage.setItem(DOCTORS_KEY, JSON.stringify(INITIAL_DOCTORS));
      return INITIAL_DOCTORS;
    }
    return JSON.parse(data);
  },

  saveDoctors: (doctors: Doctor[]) => {
    localStorage.setItem(DOCTORS_KEY, JSON.stringify(doctors));
  },

  addDoctor: (doctor: Doctor) => {
    const doctors = storage.getDoctors();
    doctors.push(doctor);
    storage.saveDoctors(doctors);
  },

  deleteDoctor: (id: string) => {
    const doctors = storage.getDoctors();
    const filtered = doctors.filter(d => d.id !== id);
    storage.saveDoctors(filtered);
  },

  updateDoctor: (doctor: Doctor) => {
    const doctors = storage.getDoctors();
    const index = doctors.findIndex(d => d.id === doctor.id);
    if (index !== -1) {
      doctors[index] = doctor;
      storage.saveDoctors(doctors);
    }
  },

  getAppointments: (): Appointment[] => {
    const data = localStorage.getItem(APPOINTMENTS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveAppointments: (appointments: Appointment[]) => {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
  },

  addAppointment: (appointment: Appointment) => {
    const appointments = storage.getAppointments();
    
    // Double booking prevention
    const isConflict = appointments.some(app => 
      app.doctorId === appointment.doctorId && 
      app.date === appointment.date && 
      app.timeSlot === appointment.timeSlot &&
      app.status !== 'Cancelled'
    );

    if (isConflict) {
      throw new Error('This time slot is already booked for this doctor.');
    }

    appointments.push(appointment);
    storage.saveAppointments(appointments);
  },

  cancelAppointment: (id: string) => {
    const appointments = storage.getAppointments();
    const index = appointments.findIndex(app => app.id === id);
    if (index !== -1) {
      appointments[index].status = 'Cancelled';
      storage.saveAppointments(appointments);
    }
  },

  updateAppointment: (appointment: Appointment) => {
    const appointments = storage.getAppointments();
    const index = appointments.findIndex(app => app.id === appointment.id);
    if (index !== -1) {
      appointments[index] = appointment;
      storage.saveAppointments(appointments);
    }
  }
};
