package net.javaguides.ems.controller;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.CheckInDto;
import net.javaguides.ems.entity.CheckIn;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.mapper.CheckInMapper;
import net.javaguides.ems.repository.CheckInRepository;
import net.javaguides.ems.repository.EmployeeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/checkin/")
public class CheckInController {
  private CheckInRepository checkInRepository;

  private EmployeeRepository employeeRepository;

  // Get All Check-Ins
  @GetMapping("/check-in")
  public List<CheckInDto> getAllCheckIns() {
    List<CheckIn> checkIns = checkInRepository.findAll();
    return checkIns.stream().map(CheckInMapper::mapToCheckInDto).collect(Collectors.toList());
  }

  // Create New Check In Entry
  @PostMapping("/check-in")
  public ResponseEntity<CheckInDto> createCheckIn(@RequestBody CheckInDto checkInDto) {
    Optional<Employee> employeeInDb = employeeRepository.findById(checkInDto.getEmployeeId());
    if (employeeInDb.isEmpty())
      return ResponseEntity.badRequest().body(checkInDto);
    
    CheckIn checkIn = CheckInMapper.mapToCheckIn(checkInDto);
    CheckIn savedCheckIn = checkInRepository.save(checkIn);
    return ResponseEntity.ok(CheckInMapper.mapToCheckInDto(savedCheckIn));
  }
}