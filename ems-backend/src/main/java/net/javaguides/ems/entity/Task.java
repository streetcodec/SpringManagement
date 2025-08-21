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
@Table(name = "tasks")
public class Task {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name = "task_name")
  private String taskName;

  @Column(name = "task_description")
  private String taskDescription;

  @ManyToMany
  @JoinTable(
      name = "employee_task",
      joinColumns = {@JoinColumn(name = "task_id")},
      inverseJoinColumns = {@JoinColumn(name = "employee_id")}
  )
  private List<Employee> assignedEmployees;

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getTaskName() {
    return taskName;
  }

  public void setTaskName(String taskName) {
    this.taskName = taskName;
  }

  public String getTaskDescription() {
    return taskDescription;
  }

  public void setTaskDescription(String taskDescription) {
    this.taskDescription = taskDescription;
  }

  public List<Employee> getAssignedEmployees() {
    return assignedEmployees;
  }

  public void setAssignedEmployees(List<Employee> assignedEmployees) {
    this.assignedEmployees = assignedEmployees;
  }

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
