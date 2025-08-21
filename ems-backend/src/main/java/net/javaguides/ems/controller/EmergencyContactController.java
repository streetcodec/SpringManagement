package net.javaguides.ems.controller;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.EmergencyContactDto;
import net.javaguides.ems.service.EmergencyContactService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/emergency-contacts")
public class EmergencyContactController {
    
    private EmergencyContactService emergencyContactService;
    
    @PostMapping
    public ResponseEntity<EmergencyContactDto> createEmergencyContact(@RequestBody EmergencyContactDto emergencyContactDto) {
        EmergencyContactDto savedContact = emergencyContactService.createEmergencyContact(emergencyContactDto);
        return new ResponseEntity<>(savedContact, HttpStatus.CREATED);
    }
    
    @GetMapping("{id}")
    public ResponseEntity<EmergencyContactDto> getEmergencyContactById(@PathVariable("id") Long emergencyContactId) {
        EmergencyContactDto emergencyContactDto = emergencyContactService.getEmergencyContactById(emergencyContactId);
        return ResponseEntity.ok(emergencyContactDto);
    }
    
    @GetMapping
    public ResponseEntity<List<EmergencyContactDto>> getAllEmergencyContacts() {
        List<EmergencyContactDto> emergencyContacts = emergencyContactService.getAllEmergencyContacts();
        return ResponseEntity.ok(emergencyContacts);
    }
    
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<EmergencyContactDto>> getEmergencyContactsByEmployeeId(@PathVariable Long employeeId) {
        List<EmergencyContactDto> emergencyContacts = emergencyContactService.getEmergencyContactsByEmployeeId(employeeId);
        return ResponseEntity.ok(emergencyContacts);
    }
    
    @PutMapping("{id}")
    public ResponseEntity<EmergencyContactDto> updateEmergencyContact(@PathVariable("id") Long emergencyContactId,
                                                                     @RequestBody EmergencyContactDto emergencyContactDto) {
        EmergencyContactDto updatedContact = emergencyContactService.updateEmergencyContact(emergencyContactId, emergencyContactDto);
        return ResponseEntity.ok(updatedContact);
    }
    
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmergencyContact(@PathVariable("id") Long emergencyContactId) {
        emergencyContactService.deleteEmergencyContact(emergencyContactId);
        return ResponseEntity.ok("Emergency contact deleted successfully!");
    }
}