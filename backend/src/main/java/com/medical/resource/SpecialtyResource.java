package com.medical.resource;

import com.medical.entity.Specialty;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/specialties")
@Produces(MediaType.APPLICATION_JSON)
public class SpecialtyResource {

    @GET
    @Transactional
    public List<Specialty> getAll() {
        return Specialty.listAll();
    }

    @POST
    @Transactional
    public Response create(Specialty specialty) {
        specialty.persist();
        return Response.status(Response.Status.CREATED).entity(specialty).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, Specialty updated) {
        Specialty entity = Specialty.findById(id);
        if (entity == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        entity.name = updated.name;
        entity.description = updated.description;
        entity.imageUrl = updated.imageUrl;
        return Response.ok(entity).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        boolean deleted = Specialty.deleteById(id);
        if (deleted) {
            return Response.noContent().build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }
}
