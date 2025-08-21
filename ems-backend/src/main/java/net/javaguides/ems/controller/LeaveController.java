package net.javaguides.ems.controller;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.LeaveDto;
import net.javaguides.ems.service.LeaveService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/leaves")
public class LeaveController {

    private LeaveService leaveService;

    @PostMapping
    public ResponseEntity<LeaveDto> createLeave(@RequestBody LeaveDto leaveDto) {
        LeaveDto savedLeave = leaveService.createLeave(leaveDto);
        return new ResponseEntity<>(savedLeave, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<LeaveDto> getLeaveById(@PathVariable("id") Long leaveId) {
        LeaveDto leaveDto = leaveService.getLeaveById(leaveId);
        return ResponseEntity.ok(leaveDto);
    }

    @GetMapping
    public ResponseEntity<List<LeaveDto>> getAllLeaves() {
        List<LeaveDto> leaves = leaveService.getAllLeaves();
        return ResponseEntity.ok(leaves);
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<LeaveDto>> getLeavesByEmployeeId(@PathVariable Long employeeId) {
        List<LeaveDto> leaves = leaveService.getLeavesByEmployeeId(employeeId);
        return ResponseEntity.ok(leaves);
    }

    @PutMapping("{id}")
    public ResponseEntity<LeaveDto> updateLeave(@PathVariable("id") Long leaveId,
                                              @RequestBody LeaveDto updatedLeave) {
        LeaveDto leaveDto = leaveService.updateLeave(leaveId, updatedLeave);
        return ResponseEntity.ok(leaveDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteLeave(@PathVariable("id") Long leaveId) {
        leaveService.deleteLeave(leaveId);
        return ResponseEntity.ok("Leave request deleted successfully!");
    }
}