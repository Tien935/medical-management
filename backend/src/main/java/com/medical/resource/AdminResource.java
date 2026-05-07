package com.medical.resource;

import com.medical.entity.Appointment;
import com.medical.entity.Doctor;
import com.medical.entity.User;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.HashMap;
import java.util.Map;

@Path("/admin")
@Produces(MediaType.APPLICATION_JSON)
public class AdminResource {

    @GET
    @Path("/stats")
    public Map<String, Long> getStats() {
        Map<String, Long> stats = new HashMap<>();
        
        long totalDoctors = Doctor.count();
        long totalUsers = User.count("role", "PATIENT");
        long totalAppointments = Appointment.count();
        long pendingAppointments = Appointment.count("status", "PENDING");
        
        stats.put("totalDoctors", totalDoctors);
        stats.put("totalUsers", totalUsers);
        stats.put("totalAppointments", totalAppointments);
        stats.put("pendingAppointments", pendingAppointments);
        
        return stats;
    }
}
