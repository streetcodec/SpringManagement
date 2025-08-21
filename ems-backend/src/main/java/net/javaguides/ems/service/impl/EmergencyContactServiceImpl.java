package net.javaguides.ems.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.EmergencyContactDto;
import net.javaguides.ems.entity.EmergencyContact;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.mapper.EmergencyContactMapper;
import net.javaguides.ems.repository.EmergencyContactRepository;
import net.javaguides.ems.repository.EmployeeRepository;
import net.javaguides.ems.service.EmergencyContactService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmergencyContactServiceImpl implements EmergencyContactService {
    
    private EmergencyContactRepository emergencyContactRepository;
    private EmployeeRepository employeeRepository;

    @Override
    public EmergencyContactDto createEmergencyContact(EmergencyContactDto emergencyContactDto) {
        // Validate that employee exists
        Employee employee = employeeRepository.findById(emergencyContactDto.getEmployeeId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + emergencyContactDto.getEmployeeId()));
        
        // Convert DTO to entity
        EmergencyContact emergencyContact = EmergencyContactMapper.mapToEmergencyContact(emergencyContactDto);
        emergencyContact.setEmployee(employee);
        
        // Save to database
        EmergencyContact savedContact = emergencyContactRepository.save(emergencyContact);
        
        // Return converted entity to DTO
        return EmergencyContactMapper.mapToEmergencyContactDto(savedContact);
    }

    @Override
    public EmergencyContactDto getEmergencyContactById(Long emergencyContactId) {
        EmergencyContact emergencyContact = emergencyContactRepository.findById(emergencyContactId)
                .orElseThrow(() -> new ResourceNotFoundException("Emergency contact not found with id: " + emergencyContactId));
        
        return EmergencyContactMapper.mapToEmergencyContactDto(emergencyContact);
    }

    @Override
    public List<EmergencyContactDto> getAllEmergencyContacts() {
        List<EmergencyContact> emergencyContacts = emergencyContactRepository.findAll();
        
        return emergencyContacts.stream()
                .map(EmergencyContactMapper::mapToEmergencyContactDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<EmergencyContactDto> getEmergencyContactsByEmployeeId(Long employeeId) {
        // Validate that employee exists
        employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));
        
        List<EmergencyContact> emergencyContacts = emergencyContactRepository.findByEmployeeIdOrderByPriorityAsc(employeeId);
        
        return emergencyContacts.stream()
                .map(EmergencyContactMapper::mapToEmergencyContactDto)
                .collect(Collectors.toList());
    }

    @Override
    public EmergencyContactDto updateEmergencyContact(Long emergencyContactId, EmergencyContactDto emergencyContactDto) {
        // Validate emergency contact exists
        EmergencyContact emergencyContact = emergencyContactRepository.findById(emergencyContactId)
                .orElseThrow(() -> new ResourceNotFoundException("Emergency contact not found with id: " + emergencyContactId));
        
        // Validate employee exists if employee ID is provided
        if (emergencyContactDto.getEmployeeId() != null) {
            Employee employee = employeeRepository.findById(emergencyContactDto.getEmployeeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + emergencyContactDto.getEmployeeId()));
            
            emergencyContact.setEmployee(employee);
        }
        
        // Update the emergency contact details
        emergencyContact.setName(emergencyContactDto.getName());
        emergencyContact.setRelationship(emergencyContactDto.getRelationship());
        emergencyContact.setPhoneNumber(emergencyContactDto.getPhoneNumber());
        emergencyContact.setEmail(emergencyContactDto.getEmail());
        emergencyContact.setAddress(emergencyContactDto.getAddress());
        emergencyContact.setPriority(emergencyContactDto.getPriority());
        
        // Save updated emergency contact
        EmergencyContact updatedContact = emergencyContactRepository.save(emergencyContact);
        
        return EmergencyContactMapper.mapToEmergencyContactDto(updatedContact);
    }

    @Override
    public void deleteEmergencyContact(Long emergencyContactId) {
        // Validate emergency contact exists
        EmergencyContact emergencyContact = emergencyContactRepository.findById(emergencyContactId)
                .orElseThrow(() -> new ResourceNotFoundException("Emergency contact not found with id: " + emergencyContactId));
        
        // Delete the emergency contact
        emergencyContactRepository.delete(emergencyContact);
    }
}