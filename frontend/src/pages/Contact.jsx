import axios from "axios";
import { motion } from "framer-motion";
import {
  Calendar,
  Check,
  Clock,
  Filter,
  Home,
  Link as LinkIcon,
  Loader,
  Search,
  Send,
  User,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [meetingFilter, setMeetingFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingMeetingLink, setEditingMeetingLink] = useState(null);
  const [meetingLink, setMeetingLink] = useState("");

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://realestate-fa0y.onrender.com/api/appointments/all",
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (response.data.success) {
        setAppointments(response.data.appointments.filter(apt => apt.userId && apt.propertyId));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await axios.put("https://realestate-fa0y.onrender.com/api/appointments/status", {
        appointmentId,
        status: newStatus,
      }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      toast.success(`Appointment ${newStatus} successfully`);
      fetchAppointments();
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error("Failed to update status");
    }
  };

  const handleMeetingLinkUpdate = async (appointmentId) => {
    if (!meetingLink) return toast.error("Please enter a meeting link");
    try {
      await axios.put("https://realestate-fa0y.onrender.com/api/appointments/update-meeting", {
        appointmentId,
        meetingLink,
      }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      toast.success("Meeting link updated successfully");
      setEditingMeetingLink(null);
      setMeetingLink("");
      fetchAppointments();
    } catch (error) {
      console.error("Error updating meeting link:", error);
      toast.error("Failed to update meeting link");
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = searchTerm === "" ||
      apt.propertyId?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === "all" || apt.status === filter;
    
    const matchesMeetingFilter = meetingFilter === "all" || 
      (meetingFilter === "with-link" && apt.meetingLink) ||
      (meetingFilter === "without-link" && !apt.meetingLink);

    return matchesSearch && matchesFilter && matchesMeetingFilter;
  });

  if (loading) {
    return <div className="flex items-center justify-center h-screen"><Loader className="w-8 h-8 text-blue-500 animate-spin" /></div>;
  }


  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };


  return (
    <div className="min-h-screen pt-24 px-6 bg-orange-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Appointments</h1>
        <div className="flex gap-4 mb-6">
          <input type="text" placeholder="Search..." className="border p-2 outline-none bg-transparent rounded-lg flex-1" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <select className="border p-2 outline-none bg-transparent rounded-lg" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select className="border p-2 outline-none bg-transparent rounded-lg" value={meetingFilter} onChange={(e) => setMeetingFilter(e.target.value)}>
            <option value="all">All Meetings</option>
            <option value="with-link">With Link</option>
            <option value="without-link">Without Link</option>
          </select>
        </div>
        <table className="w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-orange-100 text-left">
              <th className="p-4">Property</th>
              <th className="p-4">Client</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Meeting</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <motion.tr key={appointment._id} className="border-b hover:bg-gray-100">
                <td className="p-4">{appointment.propertyId.title}</td>
                <td className="p-4">{appointment.userId?.name}</td>
                <td className="p-4">{new Date(appointment.date).toLocaleDateString()}</td>
                <td className="p-4">
  <span className={`px-2 py-1 rounded ${getStatusColor(appointment.status)}`}>
    {appointment.status}
  </span>
</td>


                <td className="p-4">
                  {appointment.meetingLink ? <a href={appointment.meetingLink} className="text-blue-500">View</a> : "No Link"}
                </td>
               
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
