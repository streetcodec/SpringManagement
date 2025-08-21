package net.javaguides.ems.mapper;

import net.javaguides.ems.dto.EmergencyContactDto;
import net.javaguides.ems.entity.EmergencyContact;
import net.javaguides.ems.entity.Employee;

public class EmergencyContactMapper {

    public static EmergencyContactDto mapToEmergencyContactDto(EmergencyContact emergencyContact) {
        if (emergencyContact == null) return null;
        
        EmergencyContactDto dto = new EmergencyContactDto();
        dto.setId(emergencyContact.getId());
        dto.setName(emergencyContact.getName());
        dto.setRelationship(emergencyContact.getRelationship());
        dto.setPhoneNumber(emergencyContact.getPhoneNumber());
        dto.setEmail(emergencyContact.getEmail());
        dto.setAddress(emergencyContact.getAddress());
        dto.setPriority(emergencyContact.getPriority());
        
        if (emergencyContact.getEmployee() != null) {
            dto.setEmployeeId(emergencyContact.getEmployee().getId());
        }
        
        return dto;
    }
    
    public static EmergencyContact mapToEmergencyContact(EmergencyContactDto dto) {
        if (dto == null) return null;
        
        EmergencyContact emergencyContact = new EmergencyContact();
        emergencyContact.setId(dto.getId());
        emergencyContact.setName(dto.getName());
        emergencyContact.setRelationship(dto.getRelationship());
        emergencyContact.setPhoneNumber(dto.getPhoneNumber());
        emergencyContact.setEmail(dto.getEmail());
        emergencyContact.setAddress(dto.getAddress());
        emergencyContact.setPriority(dto.getPriority());
        
        // Employee will be set in the service layer
        
        return emergencyContact;
    }
}