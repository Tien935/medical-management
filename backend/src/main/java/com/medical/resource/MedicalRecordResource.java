package com.medical.resource;

import com.medical.entity.Appointment;
import com.medical.entity.Doctor;
import com.medical.entity.MedicalRecord;
import com.medical.entity.User;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.time.LocalDateTime;
import java.util.List;

@Path("/medical-records")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MedicalRecordResource {

    @GET
    @Path("/patient/{patientId}")
    public List<MedicalRecord> getByPatient(@PathParam("patientId") Long patientId) {
        return MedicalRecord.list("patient.id = ?1 order by examinationDate desc", patientId);
    }

    @GET
    @Path("/appointment/{appointmentId}")
    public Response getByAppointment(@PathParam("appointmentId") String appointmentId) {
        MedicalRecord record = MedicalRecord.find("appointment.id", appointmentId).firstResult();
        if (record != null) {
            return Response.ok(record).build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }

    @POST
    @Transactional
    public Response create(MedicalRecord record) {
        if (record.patient != null && record.patient.id != null) {
            record.patient = User.findById(record.patient.id);
        }
        if (record.doctor != null && record.doctor.id != null) {
            record.doctor = Doctor.findById(record.doctor.id);
        }
        if (record.appointment != null && record.appointment.id != null) {
            record.appointment = Appointment.findById(record.appointment.id);
            // Optionally update appointment status to 'Đã khám' (Examined)
            if (record.appointment != null) {
                record.appointment.status = "Đã khám";
            }
        }
        record.examinationDate = LocalDateTime.now();
        record.persist();
        return Response.status(Response.Status.CREATED).entity(record).build();
    }
}
