package com.medical.resource;

import com.medical.entity.User;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {

    @GET
    public List<User> getAll(@QueryParam("role") String role) {
        if (role != null && !role.isEmpty()) {
            return User.list("role", role);
        }
        return User.listAll();
    }

    @GET
    @Path("/{id}")
    public User getById(@PathParam("id") Long id) {
        return User.findById(id);
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, User updated) {
        User entity = User.findById(id);
        if (entity == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        entity.fullName = updated.fullName;
        entity.email = updated.email;
        entity.phone = updated.phone;
        entity.role = updated.role;
        
        if (updated.password != null && !updated.password.trim().isEmpty()) {
            entity.password = updated.password;
        }
        
        if (updated.avatarUrl != null) {
            entity.avatarUrl = updated.avatarUrl;
        }
        return Response.ok(entity).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        boolean deleted = User.deleteById(id);
        if (deleted) {
            return Response.noContent().build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }
}
