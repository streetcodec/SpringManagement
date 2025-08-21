package net.javaguides.ems.mapper;

import net.javaguides.ems.dto.LeaveDto;
import net.javaguides.ems.entity.Leave;
import net.javaguides.ems.entity.Employee;

public class LeaveMapper {
    public static Leave mapToLeave(LeaveDto leaveDto, Employee employee) {
        Leave leave = new Leave();
        leave.setId(leaveDto.getId());
        leave.setEmployee(employee);
        leave.setStartDate(leaveDto.getStartDate());
        leave.setEndDate(leaveDto.getEndDate());
        leave.setStatus(leaveDto.getStatus());
        leave.setCreatedAt(leaveDto.getCreatedAt());
        return leave;
    }

    public static LeaveDto mapToLeaveDto(Leave leave) {
        LeaveDto leaveDto = new LeaveDto();
        leaveDto.setId(leave.getId());
        leaveDto.setEmployeeId(leave.getEmployee().getId());
        leaveDto.setStartDate(leave.getStartDate());
        leaveDto.setEndDate(leave.getEndDate());
        leaveDto.setStatus(leave.getStatus());
        leaveDto.setCreatedAt(leave.getCreatedAt());
        return leaveDto;
    }
}