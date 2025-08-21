package net.javaguides.ems.repository;

import net.javaguides.ems.entity.EmergencyContact;
import net.javaguides.ems.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmergencyContactRepository extends JpaRepository<EmergencyContact, Long> {
    List<EmergencyContact> findByEmployee(Employee employee);
    List<EmergencyContact> findByEmployeeIdOrderByPriorityAsc(Long employeeId);
}