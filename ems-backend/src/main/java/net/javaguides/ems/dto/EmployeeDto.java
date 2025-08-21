package net.javaguides.ems.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {
  private Long id;
  private String firstName;
  private String lastName;
  private String email;
  private List<EmployeeDetailsDto> details;
  private List<EmergencyContactDto> emergencyContacts;
}
