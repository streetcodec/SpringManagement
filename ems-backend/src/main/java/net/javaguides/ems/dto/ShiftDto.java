package net.javaguides.ems.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ShiftDto {
    private Long id;
    private String shiftName;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private List<EmployeeDto> assignedEmployees;
}