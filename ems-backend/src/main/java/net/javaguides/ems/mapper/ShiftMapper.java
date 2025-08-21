package net.javaguides.ems.mapper;

import net.javaguides.ems.dto.ShiftDto;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.entity.Shift;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.stream.Collectors;

public class ShiftMapper {
    public static ShiftDto mapToShiftDto(Shift shift) {
        ShiftDto shiftDto = new ShiftDto();
        shiftDto.setId(shift.getId());
        shiftDto.setShiftName(shift.getShiftName());
        shiftDto.setStartTime(shift.getStartTime());
        shiftDto.setEndTime(shift.getEndTime());
        shiftDto.setAssignedEmployees(
            shift.getAssignedEmployees().stream()
                .map(EmployeeMapper::mapToEmployeeDto)
                .collect(Collectors.toList())
        );
        return shiftDto;
    }

    public static Shift mapToShift(ShiftDto shiftDto) {
        Shift shift = new Shift();
        shift.setId(shiftDto.getId());
        shift.setShiftName(shiftDto.getShiftName());
        shift.setStartTime(shiftDto.getStartTime());
        shift.setEndTime(shiftDto.getEndTime());
        shift.setAssignedEmployees(
            shiftDto.getAssignedEmployees().stream()
                .map(EmployeeMapper::mapToEmployee)
                .collect(Collectors.toList())
        );
        return shift;
    }
}