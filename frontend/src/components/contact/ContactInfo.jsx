import { motion } from 'framer-motion';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';
import ContactInfoItem from './InfoItem';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    content: '+1 (234) 567-890',
    link: 'tel:+1234567890',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'support@REALESTATE.com',
    link: 'mailto:support@REALESTATE.com',
  },
  {
    icon: MapPin,
    title: 'Address',
    content: '123 Main Street, City, Country',
    link: '#map',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    content: 'Mon-Fri: 9 AM - 6 PM',
  },
];

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      className=" p-8 rounded-2xl shadow-sm"
    >
      <h2 className="text-2xl font-bold mb-8">Our Office</h2>
      <div className="space-y-6">
        {contactInfo.map((info, index) => (
          <ContactInfoItem key={index} {...info} />
        ))}
      </div>
    </motion.div>
  );
}