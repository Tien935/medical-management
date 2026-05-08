package com.medical.resource;

import com.medical.entity.User;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {

    @POST
    @Path("/register")
    @Transactional
    public Response register(User user) {
        if (User.find("username", user.username).count() > 0) {
            return Response.status(Response.Status.CONFLICT).entity("Username already exists").build();
        }
        user.persist();
        return Response.status(Response.Status.CREATED).entity(user).build();
    }

    @POST
    @Path("/login")
    public Response login(User credentials) {
        User user = User.find("username = ?1 and password = ?2", credentials.username, credentials.password).firstResult();
        if (user != null) {
            return Response.ok(user).build();
        }
        return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid credentials").build();
    }
}
