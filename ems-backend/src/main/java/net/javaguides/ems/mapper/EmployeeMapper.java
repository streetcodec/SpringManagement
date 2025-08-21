package net.javaguides.ems.mapper;

import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.entity.Employee;

import java.util.stream.Collectors;

public class EmployeeMapper {
  public static EmployeeDto mapToEmployeeDto(Employee employee) {
    return new EmployeeDto(
        employee.getId(),
        employee.getFirstName(),
        employee.getLastName(),
        employee.getEmail(),
        employee.getDetails() == null ? null : employee.getDetails().stream().map(EmployeeDetailsMapper::mapToEmployeeDetailsDto).toList(),
        employee.getEmergencyContacts() == null ? null : employee.getEmergencyContacts().stream().map(EmergencyContactMapper::mapToEmergencyContactDto).toList()
    );
  }

  public static Employee mapToEmployee(EmployeeDto employeeDto) {
    return new Employee(
        employeeDto.getId(),
        employeeDto.getFirstName(),
        employeeDto.getLastName(),
        employeeDto.getEmail(),
        employeeDto.getDetails() == null ? null : employeeDto.getDetails().stream().map(EmployeeDetailsMapper::mapToEmployeeDetails).toList(),
        null,
        null
    );
  }
}
