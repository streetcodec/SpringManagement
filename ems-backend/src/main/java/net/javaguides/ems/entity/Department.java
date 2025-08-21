package net.javaguides.ems.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "department")
public class Department {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name = "department_name")
  private String departmentName;

  @ManyToMany
  @JoinTable(
      name = "employee_department",
      joinColumns = {@JoinColumn(name = "department_id")},
      inverseJoinColumns = {@JoinColumn(name = "employee_id")}
  )
  private List<Employee> assignedEmployees;

  public boolean assignEmployee(Employee employee){
    if (assignedEmployees.stream().anyMatch(o -> Objects.equals(o.getId(), employee.getId())))
      return false;

    return this.assignedEmployees.add(employee);
  }

  public boolean removeEmployeeAssignment(Employee employee){
    if (assignedEmployees.stream().anyMatch(o -> Objects.equals(o.getId(), employee.getId())))
      return this.assignedEmployees.remove(employee);

    return false;
  }
}