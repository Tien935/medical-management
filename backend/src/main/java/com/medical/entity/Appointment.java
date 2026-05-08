package com.medical.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
public class Appointment extends PanacheEntityBase {
    @Id
    public String id; // Format PK-XXXX
    
    @ManyToOne
    @JoinColumn(name = "patient_id")
    public User patient;
    
    @ManyToOne
    @JoinColumn(name = "doctor_id")
    public Doctor doctor;
    
    @Column(name = "appointment_date")
    public LocalDate date;
    
    @Column(name = "appointment_time")
    public LocalTime time;
    
    public String status; // Sắp tới, Chờ xác nhận, Đã khám, Đã hủy
    
    public String notes;
    
    @Column(name = "created_at")
    public LocalDateTime createdAt = LocalDateTime.now();
}
