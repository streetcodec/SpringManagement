package net.javaguides.ems.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmergencyContactDto {
    private Long id;
    private String name;
    private String relationship;
    private String phoneNumber;
    private String email;
    private String address;
    private Integer priority;
    private Long employeeId;
}