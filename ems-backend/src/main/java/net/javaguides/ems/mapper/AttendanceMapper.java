package net.javaguides.ems.mapper;

import net.javaguides.ems.dto.AttendanceDto;
import net.javaguides.ems.entity.Attendance;
import java.util.stream.Collectors;

public class AttendanceMapper {
    public static AttendanceDto mapToAttendanceDto(Attendance attendance) {
        if (attendance == null) return null;
        
        return new AttendanceDto(
            attendance.getId(),
            attendance.getDate(),
            attendance.getPresentEmployees() == null ? null :
                attendance.getPresentEmployees().stream()
                    .map(EmployeeMapper::mapToEmployeeDto)
                    .collect(Collectors.toList())
        );
    }

    public static Attendance mapToAttendance(AttendanceDto attendanceDto) {
        if (attendanceDto == null) return null;
        
        return new Attendance(
            attendanceDto.getId(),
            attendanceDto.getDate(),
            attendanceDto.getPresentEmployees() == null ? null :
                attendanceDto.getPresentEmployees().stream()
                    .map(EmployeeMapper::mapToEmployee)
                    .collect(Collectors.toList())
        );
    }
}