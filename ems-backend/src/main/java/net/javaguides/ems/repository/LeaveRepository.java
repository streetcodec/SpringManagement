package net.javaguides.ems.repository;

import net.javaguides.ems.entity.Leave;
import net.javaguides.ems.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRepository extends JpaRepository<Leave, Long> {
    List<Leave> findByEmployee(Employee employee);
}