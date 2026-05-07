package com.medical.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "specialties")
public class Specialty extends PanacheEntity {
    public String name;
    public String description;
    public String imageUrl;
}
