package net.javaguides.ems.mapper;

import net.javaguides.ems.dto.DepartmentDto;
import net.javaguides.ems.entity.Department;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class DepartmentMapper {
    public DepartmentDto toDto(Department department) {
        if (department == null) return null;
        
        return new DepartmentDto(
            department.getId(),
            department.getDepartmentName(),
            department.getAssignedEmployees() == null ? null :
                department.getAssignedEmployees().stream()
                    .map(EmployeeMapper::mapToEmployeeDto)
                    .collect(Collectors.toList())
        );
    }

    public Department toEntity(DepartmentDto departmentDto) {
        if (departmentDto == null) return null;

        Department department = new Department();
        department.setDepartmentName(departmentDto.getDepartmentName());
        department.setAssignedEmployees(
            departmentDto.getAssignedEmployees() == null ? null :
                departmentDto.getAssignedEmployees().stream()
                    .map(EmployeeMapper::mapToEmployee)
                    .collect(Collectors.toList())
        );
        return department;
    }
}