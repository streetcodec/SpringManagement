package net.javaguides.ems.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.LeaveDto;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.entity.Leave;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.mapper.LeaveMapper;
import net.javaguides.ems.repository.EmployeeRepository;
import net.javaguides.ems.repository.LeaveRepository;
import net.javaguides.ems.service.LeaveService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class LeaveServiceImpl implements LeaveService {

    private LeaveRepository leaveRepository;
    private EmployeeRepository employeeRepository;

    @Override
    public LeaveDto createLeave(LeaveDto leaveDto) {
        Employee employee = employeeRepository.findById(leaveDto.getEmployeeId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + leaveDto.getEmployeeId()));
        
        Leave leave = LeaveMapper.mapToLeave(leaveDto, employee);
        Leave savedLeave = leaveRepository.save(leave);
        return LeaveMapper.mapToLeaveDto(savedLeave);
    }

    @Override
    public LeaveDto getLeaveById(Long leaveId) {
        Leave leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave not found with id: " + leaveId));
        return LeaveMapper.mapToLeaveDto(leave);
    }

    @Override
    public List<LeaveDto> getAllLeaves() {
        List<Leave> leaves = leaveRepository.findAll();
        return leaves.stream()
                .map(LeaveMapper::mapToLeaveDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<LeaveDto> getLeavesByEmployeeId(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));
        
        List<Leave> leaves = leaveRepository.findByEmployee(employee);
        return leaves.stream()
                .map(LeaveMapper::mapToLeaveDto)
                .collect(Collectors.toList());
    }

    @Override
    public LeaveDto updateLeave(Long leaveId, LeaveDto leaveDto) {
        Leave leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave not found with id: " + leaveId));

        Employee employee = employeeRepository.findById(leaveDto.getEmployeeId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + leaveDto.getEmployeeId()));

        leave.setEmployee(employee);
        leave.setStartDate(leaveDto.getStartDate());
        leave.setEndDate(leaveDto.getEndDate());
        leave.setStatus(leaveDto.getStatus());

        Leave updatedLeave = leaveRepository.save(leave);
        return LeaveMapper.mapToLeaveDto(updatedLeave);
    }

    @Override
    public void deleteLeave(Long leaveId) {
        Leave leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave not found with id: " + leaveId));
        leaveRepository.delete(leave);
    }
}