package net.javaguides.ems.service;

import net.javaguides.ems.dto.EmergencyContactDto;
import java.util.List;

public interface EmergencyContactService {
    EmergencyContactDto createEmergencyContact(EmergencyContactDto emergencyContactDto);
    
    EmergencyContactDto getEmergencyContactById(Long emergencyContactId);
    
    List<EmergencyContactDto> getAllEmergencyContacts();
    
    List<EmergencyContactDto> getEmergencyContactsByEmployeeId(Long employeeId);
    
    EmergencyContactDto updateEmergencyContact(Long emergencyContactId, EmergencyContactDto emergencyContactDto);
    
    void deleteEmergencyContact(Long emergencyContactId);
}