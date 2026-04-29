/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  timings: string[];
  days: string[]; // e.g., ["Monday", "Wednesday"]
  fee: number;
  about: string;
  image: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  age: number;
  phone: string;
  email: string;
  doctorId: string;
  doctorName: string;
  date: string; // ISO format
  timeSlot: string;
  symptoms: string;
  status: 'Booked' | 'Cancelled';
  createdAt: string;
}

export type AdminStatus = 'logged_in' | 'logged_out';
