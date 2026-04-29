/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Doctor } from './types';

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    specialization: 'Cardiologist',
    experience: 12,
    timings: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'],
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    fee: 150,
    about: 'Experienced cardiologist with a focus on preventive care and heart health management.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '2',
    name: 'Dr. James Wilson',
    specialization: 'Neurologist',
    experience: 15,
    timings: ['10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM'],
    days: ['Monday', 'Wednesday', 'Friday'],
    fee: 200,
    about: 'Specialist in neurological disorders with over 15 years of clinical experience.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '3',
    name: 'Dr. Emily Chen',
    specialization: 'Pediatrician',
    experience: 8,
    timings: ['09:00 AM', '10:30 AM', '12:00 PM', '04:00 PM'],
    days: ['Tuesday', 'Thursday', 'Saturday'],
    fee: 120,
    about: 'Dedicated to providing the best pediatric care for children of all ages.',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '4',
    name: 'Dr. Robert Brown',
    specialization: 'Orthopedic Surgeon',
    experience: 20,
    timings: ['08:00 AM', '09:00 AM', '02:00 PM', '04:00 PM'],
    days: ['Monday', 'Tuesday', 'Thursday'],
    fee: 180,
    about: 'Expert in joint replacement and sports medicine with a patient-first approach.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
  },
];

export const SPECIALIZATIONS = [
  'Cardiologist',
  'Neurologist',
  'Pediatrician',
  'Orthopedic Surgeon',
  'Dermatologist',
  'General Physician',
];

export const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
