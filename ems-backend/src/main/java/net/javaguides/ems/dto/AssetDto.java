package net.javaguides.ems.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.javaguides.ems.entity.AssetStatus;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AssetDto {
    private Long id;
    private String name;
    private String serialNumber;
    private String assetType;
    private AssetStatus status;
    private LocalDate assignmentDate;
    private LocalDate returnDate;
    private Long employeeId;
    private String employeeName; // Combined first and last name for display
}