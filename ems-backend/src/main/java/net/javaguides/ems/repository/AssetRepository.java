package net.javaguides.ems.repository;

import net.javaguides.ems.entity.Asset;
import net.javaguides.ems.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {
    List<Asset> findByAssignedEmployee(Employee employee);
}