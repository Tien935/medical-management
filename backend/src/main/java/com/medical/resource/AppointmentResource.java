package com.medical.resource;

import com.medical.entity.Appointment;
import com.medical.entity.User;
import com.medical.entity.Doctor;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import java.util.Random;

@Path("/appointments")
@Produces(MediaType.APPLICATION_JSON)
public class AppointmentResource {

    @GET
    public List<Appointment> getAll() {
        // In a real app, we would filter by the logged-in user
        return Appointment.listAll();
    }

    @GET
    @Path("/doctor/{doctorId}")
    public List<Appointment> getByDoctor(@PathParam("doctorId") Long doctorId) {
        return Appointment.list("doctor.id = ?1 order by date desc, time desc", doctorId);
    }

    @POST
    @Transactional
    public Response create(Appointment appointment) {
        if (appointment.id == null) {
            appointment.id = "PK-" + (1000 + new Random().nextInt(9000));
        }

        // Ensure patient and doctor exist (basic check)
        if (appointment.doctor != null && appointment.doctor.id != null) {
            appointment.doctor = Doctor.findById(appointment.doctor.id);
        }
        if (appointment.patient != null && appointment.patient.id != null) {
            appointment.patient = User.findById(appointment.patient.id);
        } else {
            // Default to first user for demo
            appointment.patient = User.findAll().firstResult();
        }

        appointment.persist();
        return Response.status(Response.Status.CREATED).entity(appointment).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") String id) {
        boolean deleted = Appointment.deleteById(id);
        if (deleted) {
            return Response.noContent().build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }

    @PUT
    @Path("/{id}/status")
    @Transactional
    public Response updateStatus(@PathParam("id") String id, Appointment updatedAppointment) {
        Appointment appointment = Appointment.findById(id);
        if (appointment == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        if (updatedAppointment.status != null) {
            appointment.status = updatedAppointment.status;
        }
        return Response.ok(appointment).build();
    }
}
