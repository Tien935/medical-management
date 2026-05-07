package com.medical.resource;

import com.medical.entity.Doctor;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
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
}
