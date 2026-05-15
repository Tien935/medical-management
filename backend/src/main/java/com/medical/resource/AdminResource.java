package com.medical.resource;

import com.medical.entity.Appointment;
import com.medical.entity.Doctor;
import com.medical.entity.User;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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

    @GET
    @Path("/stats/monthly")
    public List<StatDTO> getMonthlyStats(@QueryParam("year") int year, @QueryParam("month") int month) {
        List<Object[]> results = Appointment.getEntityManager()
            .createQuery("SELECT DAY(a.date), COUNT(a) FROM Appointment a WHERE YEAR(a.date) = :year AND MONTH(a.date) = :month GROUP BY DAY(a.date) ORDER BY DAY(a.date)", Object[].class)
            .setParameter("year", year)
            .setParameter("month", month)
            .getResultList();
        
        List<StatDTO> stats = new ArrayList<>();
        for (Object[] result : results) {
            stats.add(new StatDTO((int) result[0], (long) result[1]));
        }
        return stats;
    }

    @GET
    @Path("/stats/daily")
    public List<StatDTO> getDailyStats(@QueryParam("date") String dateStr) {
        java.time.LocalDate date = java.time.LocalDate.parse(dateStr);
        List<Object[]> results = Appointment.getEntityManager()
            .createQuery("SELECT HOUR(a.time), COUNT(a) FROM Appointment a WHERE a.date = :date GROUP BY HOUR(a.time) ORDER BY HOUR(a.time)", Object[].class)
            .setParameter("date", date)
            .getResultList();
        
        List<StatDTO> stats = new ArrayList<>();
        for (Object[] result : results) {
            stats.add(new StatDTO((int) result[0], (long) result[1]));
        }
        return stats;
    }

    @GET
    @Path("/stats/weekly")
    public List<StatDTO> getWeeklyStats(@QueryParam("startDate") String startStr, @QueryParam("endDate") String endStr) {
        java.time.LocalDate startDate = java.time.LocalDate.parse(startStr);
        java.time.LocalDate endDate = java.time.LocalDate.parse(endStr);
        
        List<Object[]> results = Appointment.getEntityManager()
            .createQuery("SELECT a.date, COUNT(a) FROM Appointment a WHERE a.date >= :startDate AND a.date <= :endDate GROUP BY a.date ORDER BY a.date", Object[].class)
            .setParameter("startDate", startDate)
            .setParameter("endDate", endDate)
            .getResultList();
        
        List<StatDTO> stats = new ArrayList<>();
        for (Object[] result : results) {
            // We use the day of month or a representation to return in StatDTO
            // Frontend will handle mapping to Monday-Sunday names
            java.time.LocalDate d = (java.time.LocalDate) result[0];
            stats.add(new StatDTO(d.getDayOfMonth(), (long) result[1]));
        }
        return stats;
    }

    @GET
    @Path("/stats/yearly")
    public List<StatDTO> getYearlyStats(@QueryParam("year") int year) {
        List<Object[]> results = Appointment.getEntityManager()
            .createQuery("SELECT MONTH(a.date), COUNT(a) FROM Appointment a WHERE YEAR(a.date) = :year GROUP BY MONTH(a.date) ORDER BY MONTH(a.date)", Object[].class)
            .setParameter("year", year)
            .getResultList();
        
        List<StatDTO> stats = new ArrayList<>();
        for (Object[] result : results) {
            stats.add(new StatDTO((int) result[0], (long) result[1]));
        }
        return stats;
    }

    public static class StatDTO {
        public int label;
        public long value;
        public StatDTO(int label, long value) {
            this.label = label;
            this.value = value;
        }
    }
}
