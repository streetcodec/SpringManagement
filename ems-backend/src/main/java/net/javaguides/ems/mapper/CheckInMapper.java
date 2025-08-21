package net.javaguides.ems.mapper;

import net.javaguides.ems.dto.CheckInDto;
import net.javaguides.ems.entity.CheckIn;
import net.javaguides.ems.entity.Employee;

public class CheckInMapper {
    public static CheckInDto mapToCheckInDto(CheckIn checkIn) {
        return new CheckInDto(
            checkIn.getId(),
            checkIn.getEmployee().getId(),
            checkIn.getDateTime()
        );
    }

    public static CheckIn mapToCheckIn(CheckInDto checkInDto) {
        Employee employee = new Employee();
        employee.setId(checkInDto.getEmployeeId());

        return new CheckIn(
            checkInDto.getId(),
            employee,
            checkInDto.getDateTime()
        );
    }
}