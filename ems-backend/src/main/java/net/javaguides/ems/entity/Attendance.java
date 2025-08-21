package net.javaguides.ems.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "attendance")
public class Attendance {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name = "date")
  private LocalDate date;

  @ManyToMany
  @JoinTable(
      name = "employee_attendance",
      joinColumns = {@JoinColumn(name = "attendance_id")},
      inverseJoinColumns = {@JoinColumn(name = "employee_id")}
  )
  private List<Employee> presentEmployees;

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

  public List<Employee> getPresentEmployees() {
    return presentEmployees;
  }

  public void setPresentEmployees(List<Employee> presentEmployees) {
    this.presentEmployees = presentEmployees;
  }

  public boolean  markEmployeeAsPresent(Employee employee){
    if (presentEmployees.stream().anyMatch(o -> o.getId() == employee.getId()))
      return false;

    return presentEmployees.add(employee);
  }

  public boolean markEmployeeAsAbsent(Employee employee){
    if (presentEmployees.stream().anyMatch(o -> Objects.equals(o.getId(), employee.getId())))
      return presentEmployees.remove(employee);

    return false;
  }
}