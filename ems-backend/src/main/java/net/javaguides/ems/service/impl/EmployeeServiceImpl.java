package net.javaguides.ems.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.EmployeeDetailsDto;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.entity.EmployeeDetails;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.mapper.EmployeeMapper;
import net.javaguides.ems.repository.EmployeeRepository;
import net.javaguides.ems.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

  private EmployeeRepository employeeRepository;

  @Override
  public EmployeeDto createEmployee(EmployeeDto employeeDto) {
    Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
    if (employee.getDetails() != null) {
      for (EmployeeDetails details : employee.getDetails()) {
        details.setEmployee(employee);
      }
    }
    Employee savedEmployee = employeeRepository.save(employee);
    return EmployeeMapper.mapToEmployeeDto(savedEmployee);
  }


  @Override
  public EmployeeDto getEmployeeById(Long employeeId) {
    Employee employee = employeeRepository.findById(employeeId)
        .orElseThrow(() -> new ResourceNotFoundException("Employee with given id does not exist :" + employeeId));
    return EmployeeMapper.mapToEmployeeDto(employee);
  }

  @Override
  public List<EmployeeDto> getAllEmployees() {
    List<Employee> employees = employeeRepository.findAll();
    return employees.stream().map(EmployeeMapper::mapToEmployeeDto)
        .collect(Collectors.toList());
  }

  @Override
  public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployeeDto) {
    Employee employee = employeeRepository.findById(employeeId)
        .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with given id: " + employeeId));
    employee.setFirstName(updatedEmployeeDto.getFirstName());
    employee.setLastName(updatedEmployeeDto.getLastName());
    employee.setEmail(updatedEmployeeDto.getEmail());

    employee.getDetails().clear();
    if (updatedEmployeeDto.getDetails() != null) {
      for (EmployeeDetailsDto dto : updatedEmployeeDto.getDetails()) {
        EmployeeDetails detail = new EmployeeDetails();
        detail.setKey(dto.getKey());
        detail.setValue(dto.getValue());
        detail.setEmployee(employee);
        employee.getDetails().add(detail);
      }
    }
    
    // Note: We're not handling emergency contacts here as they're managed 
    // through the EmergencyContactService for more fine-grained control
    
    Employee updatedEmployee = employeeRepository.save(employee);
    return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
  }


  @Override
  public void deleteEmployee(Long employeeId) {
    Employee employee = employeeRepository.findById(employeeId).orElseThrow(
        () -> new ResourceNotFoundException("Employee does not exist with given id : " + employeeId)
    );

    employeeRepository.deleteById(employee.getId());
  }
}
