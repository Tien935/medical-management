package com.medical.resource;

import com.medical.entity.Specialty;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/specialties")
@Produces(MediaType.APPLICATION_JSON)
public class SpecialtyResource {

    @GET
    @Transactional
    public List<Specialty> getAll() {
        return Specialty.listAll();
    }
}
