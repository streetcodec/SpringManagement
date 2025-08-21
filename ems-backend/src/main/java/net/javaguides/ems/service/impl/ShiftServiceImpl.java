package net.javaguides.ems.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.ShiftDto;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.entity.Shift;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.mapper.EmployeeMapper;
import net.javaguides.ems.mapper.ShiftMapper;
import net.javaguides.ems.repository.EmployeeRepository;
import net.javaguides.ems.repository.ShiftRepository;
import net.javaguides.ems.service.ShiftService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ShiftServiceImpl implements ShiftService {
  private ShiftRepository shiftRepository;
  private EmployeeRepository employeeRepository;

  @Override
  public ShiftDto createShift(ShiftDto shiftDto) {
    Shift shift = ShiftMapper.mapToShift(shiftDto);
    Shift savedShift = shiftRepository.save(shift);
    return ShiftMapper.mapToShiftDto(savedShift);
  }

  @Override
  public ShiftDto getShiftById(Long shiftId) {
    Shift shift = shiftRepository.findById(shiftId)
        .orElseThrow(() -> new ResourceNotFoundException("Shift not found with id: " + shiftId));
    return ShiftMapper.mapToShiftDto(shift);
  }

  @Override
  public List<ShiftDto> getAllShifts() {
    List<Shift> shifts = shiftRepository.findAll();
    return shifts.stream()
        .map(ShiftMapper::mapToShiftDto)
        .collect(Collectors.toList());
  }

  @Override
  public ShiftDto updateShift(Long shiftId, ShiftDto shiftDto) {
    Shift shift = shiftRepository.findById(shiftId)
        .orElseThrow(() -> new ResourceNotFoundException("Shift not found with id: " + shiftId));

    shift.setShiftName(shiftDto.getShiftName());
    shift.setStartTime(shiftDto.getStartTime());
    shift.setEndTime(shiftDto.getEndTime());
    shift.setAssignedEmployees(shiftDto.getAssignedEmployees()
        .stream()
        .map(EmployeeMapper::mapToEmployee)
        .collect(Collectors.toList()));

    Shift updatedShift = shiftRepository.save(shift);
    return ShiftMapper.mapToShiftDto(updatedShift);
  }

  @Override
  public void deleteShift(Long shiftId) {
    Shift shift = shiftRepository.findById(shiftId)
        .orElseThrow(() -> new ResourceNotFoundException("Shift not found with id: " + shiftId));
    shiftRepository.deleteById(shiftId);
  }

  @Override
  public ShiftDto assignEmployeeToShift(Long shiftId, Long employeeId) {
    Shift shift = shiftRepository.findById(shiftId)
        .orElseThrow(() -> new ResourceNotFoundException("Shift not found with id: " + shiftId));

    Employee employee = employeeRepository.findById(employeeId)
        .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));

    shift.getAssignedEmployees().add(employee);
    Shift updatedShift = shiftRepository.save(shift);
    return ShiftMapper.mapToShiftDto(updatedShift);
  }

  @Override
  public ShiftDto removeEmployeeFromShift(Long shiftId, Long employeeId) {
    Shift shift = shiftRepository.findById(shiftId)
        .orElseThrow(() -> new ResourceNotFoundException("Shift not found with id: " + shiftId));

    Employee employee = employeeRepository.findById(employeeId)
        .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));

    shift.getAssignedEmployees().remove(employee);
    Shift updatedShift = shiftRepository.save(shift);
    return ShiftMapper.mapToShiftDto(updatedShift);
  }
}