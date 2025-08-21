package net.javaguides.ems.service;

import net.javaguides.ems.dto.LeaveDto;
import java.util.List;

public interface LeaveService {
    LeaveDto createLeave(LeaveDto leaveDto);
    LeaveDto getLeaveById(Long leaveId);
    List<LeaveDto> getAllLeaves();
    List<LeaveDto> getLeavesByEmployeeId(Long employeeId);
    LeaveDto updateLeave(Long leaveId, LeaveDto leaveDto);
    void deleteLeave(Long leaveId);
}