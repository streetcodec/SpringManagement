package net.javaguides.ems.service;

import net.javaguides.ems.dto.ShiftDto;
import java.util.List;

public interface ShiftService {
    ShiftDto createShift(ShiftDto shiftDto);
    
    ShiftDto getShiftById(Long shiftId);
    
    List<ShiftDto> getAllShifts();
    
    ShiftDto updateShift(Long shiftId, ShiftDto shiftDto);
    
    void deleteShift(Long shiftId);
    
    ShiftDto assignEmployeeToShift(Long shiftId, Long employeeId);
    
    ShiftDto removeEmployeeFromShift(Long shiftId, Long employeeId);
}