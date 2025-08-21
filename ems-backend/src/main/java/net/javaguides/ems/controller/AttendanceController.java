package net.javaguides.ems.controller;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.AttendanceDto;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.entity.Attendance;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.mapper.AttendanceMapper;
import net.javaguides.ems.repository.AttendanceRepository;
import net.javaguides.ems.repository.EmployeeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/attendance/")
public class AttendanceController {
  private EmployeeRepository employeeRepository;
  private AttendanceRepository attendanceRepository;

  // Get All Attendances List
  @GetMapping("/attendance")
  public List<AttendanceDto> getAllTasks() {
    return attendanceRepository.findAll().stream()
        .map(AttendanceMapper::mapToAttendanceDto)
        .collect(Collectors.toList());
  }

  // Add Attendance Data
  @PostMapping("/attendance")
  public ResponseEntity<AttendanceDto> createAttendance(@RequestBody AttendanceDto attendanceDto) {
    Attendance attendance = AttendanceMapper.mapToAttendance(attendanceDto);
    
    for (Employee employee : attendance.getPresentEmployees()) {
      Optional<Employee> employeeInDb = employeeRepository.findById(employee.getId());
      if (employeeInDb.isEmpty())
        return ResponseEntity.badRequest().body(attendanceDto);
    }

    if (attendance.getPresentEmployees().isEmpty())
      return ResponseEntity.badRequest().body(attendanceDto);

    Attendance savedAttendance = attendanceRepository.save(attendance);
    return ResponseEntity.ok(AttendanceMapper.mapToAttendanceDto(savedAttendance));
  }

  // Get Attendance by ID
  @GetMapping("/attendance/{id}")
  public ResponseEntity<AttendanceDto> getAttendanceById(@PathVariable Long id) {
    Attendance attendance = attendanceRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Attendance Record does not exist with id:" + id));

    return ResponseEntity.ok(AttendanceMapper.mapToAttendanceDto(attendance));
  }

  // Get Attendance by Date
  @GetMapping("/attendance/date/{date}")
  public ResponseEntity<AttendanceDto> getAttendanceByDate(@PathVariable String date) {
    Attendance attendance = attendanceRepository.findByDate(LocalDate.parse(date))
        .orElseThrow(() -> new ResourceNotFoundException("Attendance Record does not exist with date:" + date));

    return ResponseEntity.ok(AttendanceMapper.mapToAttendanceDto(attendance));
  }

  // Update Attendance by ID
  @PutMapping("/attendance/{id}")
  public ResponseEntity<AttendanceDto> updateAttendanceRecord(@PathVariable Long id, @RequestBody AttendanceDto attendanceDetailsDto) {
    Attendance attendanceDetails = AttendanceMapper.mapToAttendance(attendanceDetailsDto);
    Attendance attendance = attendanceRepository.findById(id).orElse(attendanceDetails);

    for (Employee employee : attendanceDetails.getPresentEmployees()) {
      Optional<Employee> employeeInDb = employeeRepository.findById(employee.getId());
      if (employeeInDb.isEmpty())
        return ResponseEntity.badRequest().body(attendanceDetailsDto);
    }

    attendance.setPresentEmployees(attendanceDetails.getPresentEmployees());

    if (attendance.getPresentEmployees().isEmpty()){
      attendanceRepository.delete(attendance);
      return ResponseEntity.ok(attendanceDetailsDto);
    }

    Attendance updatedAttendance = attendanceRepository.save(attendance);
    return ResponseEntity.ok(AttendanceMapper.mapToAttendanceDto(updatedAttendance));
  }

  // Update Attendance by Date
  @PutMapping("/attendance/date/{date}")
  public ResponseEntity<AttendanceDto> updateAttendanceRecord(@PathVariable String date, @RequestBody AttendanceDto attendanceDetailsDto) {
    Attendance attendanceDetails = AttendanceMapper.mapToAttendance(attendanceDetailsDto);
    Attendance attendance = attendanceRepository.findByDate(LocalDate.parse(date)).orElse(attendanceDetails);

    for (Employee employee : attendanceDetails.getPresentEmployees()) {
      Optional<Employee> employeeInDb = employeeRepository.findById(employee.getId());
      if (employeeInDb.isEmpty())
        return ResponseEntity.badRequest().body(attendanceDetailsDto);
    }

    attendance.setPresentEmployees(attendanceDetails.getPresentEmployees());

    if (attendance.getPresentEmployees().isEmpty()){
      attendanceRepository.delete(attendance);
      return ResponseEntity.ok(attendanceDetailsDto);
    }

    Attendance updatedAttendance = attendanceRepository.save(attendance);
    return ResponseEntity.ok(AttendanceMapper.mapToAttendanceDto(updatedAttendance));
  }

  // Delete Attendance Records by ID
  @DeleteMapping("/attendance/{id}")
  public Map<String, Boolean> deleteAttendance(@PathVariable Long id) {
    Attendance attendance = attendanceRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Attendance Record does not exist with id:" + id));

    attendanceRepository.delete(attendance);
    Map<String, Boolean> response = new HashMap<>();
    response.put("Deleted", Boolean.TRUE);
    return response;
  }

  // Delete Attendance Records by Date
  @DeleteMapping("/attendance/date/{date}")
  public Map<String, Boolean> deleteAttendance(@PathVariable String date) {
    Attendance attendance = attendanceRepository.findByDate(LocalDate.parse(date))
        .orElseThrow(() -> new ResourceNotFoundException("Attendance Record does not exist with date:" + date));

    attendanceRepository.delete(attendance);
    Map<String, Boolean> response = new HashMap<>();
    response.put("Deleted", Boolean.TRUE);
    return response;
  }

  // Mark Employee Attendance Status by Attendance Date
  @PutMapping("/attendance/{attendanceDate}/employees")
  public ResponseEntity<AttendanceDto> markEmployeeAttendanceStatus(@PathVariable String attendanceDate, @RequestBody Map<String, Object> data) {
    long employeeId = (long) data.getOrDefault("employeeId", -1);
    boolean isPresent = ((int) data.getOrDefault("employeeId", 0)) == 1;

    Attendance attendance = attendanceRepository.findByDate(LocalDate.parse(attendanceDate))
        .orElse(new Attendance(0, LocalDate.parse(attendanceDate), null));

    Employee employee = employeeRepository.findById(employeeId)
        .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with id:" + employeeId));

    boolean marked = isPresent ? attendance.markEmployeeAsPresent(employee) : attendance.markEmployeeAsAbsent(employee);
    Attendance updatedAttendance = attendanceRepository.save(attendance);
    if (marked)
      return ResponseEntity.ok(AttendanceMapper.mapToAttendanceDto(updatedAttendance));
    else
      return ResponseEntity.badRequest().body(AttendanceMapper.mapToAttendanceDto(updatedAttendance));
  }
}
