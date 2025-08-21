package net.javaguides.ems.mapper;

import net.javaguides.ems.dto.EmployeeDetailsDto;
import net.javaguides.ems.entity.EmployeeDetails;

public class EmployeeDetailsMapper {
  public static EmployeeDetailsDto mapToEmployeeDetailsDto(EmployeeDetails details) {
    return new EmployeeDetailsDto(
        details.getId(),
        details.getKey(),
        details.getValue()
    );
  }

  public static EmployeeDetails mapToEmployeeDetails(EmployeeDetailsDto dto) {
    return new EmployeeDetails(
        dto.getId(),
        null,
        dto.getKey(),
        dto.getValue()
    );
  }
}
