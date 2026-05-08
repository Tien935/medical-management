package com.medical.resource;

import com.medical.entity.Doctor;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/doctors")
@Produces(MediaType.APPLICATION_JSON)
public class DoctorResource {

    @GET
    @Transactional
    public List<Doctor> search(@QueryParam("name") String name, @QueryParam("specialty") String specialty) {
        if (name != null && !name.isEmpty() && specialty != null && !"Tất cả".equals(specialty)) {
            return Doctor.find("name like ?1 and specialty.name = ?2", "%" + name + "%", specialty).list();
        } else if (name != null && !name.isEmpty()) {
            return Doctor.find("name like ?1", "%" + name + "%").list();
        } else if (specialty != null && !"Tất cả".equals(specialty)) {
            return Doctor.find("specialty.name = ?1", specialty).list();
        }
        return Doctor.listAll();
    }

    @GET
    @Path("/{id}")
    @Transactional
    public Doctor getById(@PathParam("id") Long id) {
        return Doctor.findById(id);
    }

    @POST
    @Transactional
    public jakarta.ws.rs.core.Response create(Doctor doctor) {
        if (doctor.specialty != null && doctor.specialty.id != null) {
            doctor.specialty = com.medical.entity.Specialty.findById(doctor.specialty.id);
        }
        doctor.persist();
        return jakarta.ws.rs.core.Response.status(jakarta.ws.rs.core.Response.Status.CREATED).entity(doctor).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public jakarta.ws.rs.core.Response update(@PathParam("id") Long id, Doctor updatedDoctor) {
        Doctor doctor = Doctor.findById(id);
        if (doctor == null) {
            return jakarta.ws.rs.core.Response.status(jakarta.ws.rs.core.Response.Status.NOT_FOUND).build();
        }
        doctor.name = updatedDoctor.name;
        doctor.degree = updatedDoctor.degree;
        doctor.experience = updatedDoctor.experience;
        doctor.imageUrl = updatedDoctor.imageUrl;
        doctor.description = updatedDoctor.description;
        
        if (updatedDoctor.specialty != null && updatedDoctor.specialty.id != null) {
            doctor.specialty = com.medical.entity.Specialty.findById(updatedDoctor.specialty.id);
        }
        
        return jakarta.ws.rs.core.Response.ok(doctor).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public jakarta.ws.rs.core.Response delete(@PathParam("id") Long id) {
        boolean deleted = Doctor.deleteById(id);
        if (deleted) {
            return jakarta.ws.rs.core.Response.noContent().build();
        }
        return jakarta.ws.rs.core.Response.status(jakarta.ws.rs.core.Response.Status.NOT_FOUND).build();
    }
}
