package net.javaguides.ems.controller;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.ShiftDto;
import net.javaguides.ems.service.ShiftService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/shifts")
public class ShiftController {
    private ShiftService shiftService;

    @PostMapping
    public ResponseEntity<ShiftDto> createShift(@RequestBody ShiftDto shiftDto) {
        ShiftDto savedShift = shiftService.createShift(shiftDto);
        return new ResponseEntity<>(savedShift, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<ShiftDto> getShiftById(@PathVariable("id") Long shiftId) {
        ShiftDto shiftDto = shiftService.getShiftById(shiftId);
        return ResponseEntity.ok(shiftDto);
    }

    @GetMapping
    public ResponseEntity<List<ShiftDto>> getAllShifts() {
        List<ShiftDto> shifts = shiftService.getAllShifts();
        return ResponseEntity.ok(shifts);
    }

    @PutMapping("{id}")
    public ResponseEntity<ShiftDto> updateShift(@PathVariable("id") Long shiftId,
                                              @RequestBody ShiftDto updatedShift) {
        ShiftDto shiftDto = shiftService.updateShift(shiftId, updatedShift);
        return ResponseEntity.ok(shiftDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteShift(@PathVariable("id") Long shiftId) {
        shiftService.deleteShift(shiftId);
        return ResponseEntity.ok("Shift deleted successfully");
    }

    @PutMapping("{shiftId}/employees/{employeeId}")
    public ResponseEntity<ShiftDto> assignEmployeeToShift(@PathVariable Long shiftId,
                                                        @PathVariable Long employeeId) {
        ShiftDto shiftDto = shiftService.assignEmployeeToShift(shiftId, employeeId);
        return ResponseEntity.ok(shiftDto);
    }

    @DeleteMapping("{shiftId}/employees/{employeeId}")
    public ResponseEntity<ShiftDto> removeEmployeeFromShift(@PathVariable Long shiftId,
                                                          @PathVariable Long employeeId) {
        ShiftDto shiftDto = shiftService.removeEmployeeFromShift(shiftId, employeeId);
        return ResponseEntity.ok(shiftDto);
    }
}