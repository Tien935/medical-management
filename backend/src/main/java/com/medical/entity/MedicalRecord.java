package com.medical.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "medical_records")
public class MedicalRecord extends PanacheEntity {
    
    @ManyToOne
    @JoinColumn(name = "patient_id")
    public User patient;
    
    @ManyToOne
    @JoinColumn(name = "doctor_id")
    public Doctor doctor;
    
    @ManyToOne
    @JoinColumn(name = "appointment_id")
    public Appointment appointment;
    
    @Column(name = "examination_date")
    public LocalDateTime examinationDate = LocalDateTime.now();
    
    @Column(columnDefinition = "TEXT")
    public String symptoms;
    
    @Column(columnDefinition = "TEXT")
    public String diagnosis;
    
    @Column(columnDefinition = "TEXT")
    public String prescription;
    
    @Column(columnDefinition = "TEXT")
    public String notes;
}
