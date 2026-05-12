package com.medical.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "doctors")
public class Doctor extends PanacheEntity {
    public String name;
    
    @ManyToOne
    @JoinColumn(name = "specialty_id")
    public Specialty specialty;
    
    public String degree;
    public String experience;
    
    @Column(name = "image_url")
    public String imageUrl;
    
    public String description;

    @OneToOne
    @JoinColumn(name = "user_id")
    public User user;
}
