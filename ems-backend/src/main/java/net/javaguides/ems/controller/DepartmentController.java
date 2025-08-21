package net.javaguides.ems.controller;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.DepartmentDto;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.entity.Department;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.mapper.DepartmentMapper;
import net.javaguides.ems.repository.DepartmentRepository;
import net.javaguides.ems.repository.EmployeeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/departments/")
public class DepartmentController {
  private EmployeeRepository employeeRepository;
  private DepartmentRepository departmentRepository;
  private DepartmentMapper departmentMapper;

  @GetMapping("/departments")
  public List<DepartmentDto> getAllDepartments() {
    return departmentRepository.findAll().stream()
        .map(departmentMapper::toDto)
        .collect(Collectors.toList());
  }

  // Create New Department
  @PostMapping("/departments")
  public ResponseEntity<DepartmentDto> createDepartment(@RequestBody DepartmentDto departmentDto) {
    Department department = departmentMapper.toEntity(departmentDto);
    for (Employee employee : department.getAssignedEmployees()) {
      Optional<Employee> employeeInDb = employeeRepository.findById(employee.getId());
      if (employeeInDb.isEmpty())
        return ResponseEntity.badRequest().body(departmentDto);
    }
    Department savedDepartment = departmentRepository.save(department);
    return ResponseEntity.ok(departmentMapper.toDto(savedDepartment));
  }

  // Get Department by ID
  @GetMapping("/departments/{id}")
  public ResponseEntity<DepartmentDto> getDepartmentById(@PathVariable Long id) {
    Department department = departmentRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Department does not exist with id:" + id));

    return ResponseEntity.ok(departmentMapper.toDto(department));
  }

  // Update Department by ID
  @PutMapping("/departments/{id}")
  public ResponseEntity<DepartmentDto> updateDepartment(@PathVariable Long id, @RequestBody DepartmentDto departmentDto) {
    Department department = departmentRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Department does not exist with id:" + id));

    Department updatedDepartment = departmentMapper.toEntity(departmentDto);
    for (Employee employee : updatedDepartment.getAssignedEmployees()) {
      Optional<Employee> employeeInDb = employeeRepository.findById(employee.getId());
      if (employeeInDb.isEmpty())
        return ResponseEntity.badRequest().body(departmentDto);
    }

    department.setDepartmentName(updatedDepartment.getDepartmentName());
    department.setAssignedEmployees(updatedDepartment.getAssignedEmployees());

    Department savedDepartment = departmentRepository.save(department);
    return ResponseEntity.ok(departmentMapper.toDto(savedDepartment));
  }

  // Delete Department by ID
  @DeleteMapping("/departments/{id}")
  public Map<String, Boolean> deleteDepartment(@PathVariable Long id) {
    Department department = departmentRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Department does not exist with id:" + id));
    departmentRepository.delete(department);
    Map<String, Boolean> response = new HashMap<>();
    response.put("Deleted", Boolean.TRUE);
    return response;
  }

  // Add Employee to Department by ID
  @PutMapping("/departments/{departmentId}/employees")
  public ResponseEntity<DepartmentDto> assignEmployeeToDepartment(@PathVariable Long departmentId, @RequestBody Map<String, Long> data) {
    long employeeId = data.containsKey("employeeId") ? data.get("employeeId") : -1;

    Department department = departmentRepository.findById(departmentId)
        .orElseThrow(() -> new ResourceNotFoundException("Department does not exist with id:" + departmentId));

    Employee employee = employeeRepository.findById(employeeId)
        .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with id:" + employeeId));

    boolean assigned = department.assignEmployee(employee);
    Department updatedDepartment = departmentRepository.save(department);
    if (assigned)
      return ResponseEntity.ok(departmentMapper.toDto(updatedDepartment));
    else
      return ResponseEntity.badRequest().body(departmentMapper.toDto(updatedDepartment));
  }

  // Remove Employee from Department
  @DeleteMapping("/departments/{departmentId}/employees/{employeeId}")
  public ResponseEntity<DepartmentDto> removeEmployeeFromDepartment(@PathVariable Long departmentId, @PathVariable Long employeeId) {
    Department department = departmentRepository.findById(departmentId)
        .orElseThrow(() -> new ResourceNotFoundException("Department does not exist with id:" + departmentId));

    Employee employee = employeeRepository.findById(employeeId)
        .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with id:" + employeeId));

    boolean removed = department.removeEmployeeAssignment(employee);
    Department updatedDepartment = departmentRepository.save(department);
    if (removed)
      return ResponseEntity.ok(departmentMapper.toDto(updatedDepartment));
    else
      return ResponseEntity.badRequest().body(departmentMapper.toDto(updatedDepartment));
  }
}