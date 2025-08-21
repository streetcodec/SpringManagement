package net.javaguides.ems.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "assets")
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "serial_number")
    private String serialNumber;
    
    @Column(name = "asset_type")
    private String assetType;
    
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private AssetStatus status = AssetStatus.AVAILABLE;
    
    @Column(name = "assignment_date")
    private LocalDate assignmentDate;
    
    @Column(name = "return_date")
    private LocalDate returnDate;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee assignedEmployee;
}