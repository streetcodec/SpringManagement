package net.javaguides.ems.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.AssetDto;
import net.javaguides.ems.entity.Asset;
import net.javaguides.ems.entity.AssetStatus;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.mapper.AssetMapper;
import net.javaguides.ems.repository.AssetRepository;
import net.javaguides.ems.repository.EmployeeRepository;
import net.javaguides.ems.service.AssetService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AssetServiceImpl implements AssetService {
    private AssetRepository assetRepository;
    private EmployeeRepository employeeRepository;

    @Override
    public AssetDto createAsset(AssetDto assetDto) {
        Asset asset = AssetMapper.mapToAsset(assetDto);
        
        // If employee ID is provided, set the employee relationship
        if (assetDto.getEmployeeId() != null) {
            Employee employee = employeeRepository.findById(assetDto.getEmployeeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + assetDto.getEmployeeId()));
            asset.setAssignedEmployee(employee);
            asset.setStatus(AssetStatus.ASSIGNED);
            asset.setAssignmentDate(LocalDate.now());
        }
        
        Asset savedAsset = assetRepository.save(asset);
        return AssetMapper.mapToAssetDto(savedAsset);
    }

    @Override
    public AssetDto getAssetById(Long assetId) {
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found with id: " + assetId));
        return AssetMapper.mapToAssetDto(asset);
    }

    @Override
    public List<AssetDto> getAllAssets() {
        List<Asset> assets = assetRepository.findAll();
        return assets.stream()
                .map(AssetMapper::mapToAssetDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AssetDto> getAssetsByEmployeeId(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));
        
        List<Asset> assets = assetRepository.findByAssignedEmployee(employee);
        return assets.stream()
                .map(AssetMapper::mapToAssetDto)
                .collect(Collectors.toList());
    }

    @Override
    public AssetDto updateAsset(Long assetId, AssetDto assetDto) {
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found with id: " + assetId));
        
        asset.setName(assetDto.getName());
        asset.setSerialNumber(assetDto.getSerialNumber());
        asset.setAssetType(assetDto.getAssetType());
        asset.setStatus(assetDto.getStatus());
        
        // Only update employee assignment if it has changed
        if (assetDto.getEmployeeId() != null) {
            // If asset is already assigned to the same employee, do nothing
            if (asset.getAssignedEmployee() == null || 
                !asset.getAssignedEmployee().getId().equals(assetDto.getEmployeeId())) {
                
                Employee employee = employeeRepository.findById(assetDto.getEmployeeId())
                        .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + assetDto.getEmployeeId()));
                
                asset.setAssignedEmployee(employee);
                asset.setStatus(AssetStatus.ASSIGNED);
                asset.setAssignmentDate(assetDto.getAssignmentDate() != null ? assetDto.getAssignmentDate() : LocalDate.now());
            }
        } else {
            // If employee ID is null, unassign the asset
            asset.setAssignedEmployee(null);
            asset.setStatus(AssetStatus.AVAILABLE);
        }
        
        // Set return date if provided
        asset.setReturnDate(assetDto.getReturnDate());
        
        Asset updatedAsset = assetRepository.save(asset);
        return AssetMapper.mapToAssetDto(updatedAsset);
    }

    @Override
    public AssetDto assignAssetToEmployee(Long assetId, Long employeeId) {
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found with id: " + assetId));
        
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));
        
        // Check if asset is already assigned
        if (asset.getStatus() == AssetStatus.ASSIGNED && asset.getAssignedEmployee() != null) {
            throw new IllegalStateException("Asset is already assigned to an employee");
        }
        
        asset.setAssignedEmployee(employee);
        asset.setStatus(AssetStatus.ASSIGNED);
        asset.setAssignmentDate(LocalDate.now());
        asset.setReturnDate(null);
        
        Asset updatedAsset = assetRepository.save(asset);
        return AssetMapper.mapToAssetDto(updatedAsset);
    }

    @Override
    public AssetDto unassignAsset(Long assetId) {
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found with id: " + assetId));
        
        // Check if asset is assigned
        if (asset.getStatus() != AssetStatus.ASSIGNED || asset.getAssignedEmployee() == null) {
            throw new IllegalStateException("Asset is not currently assigned to any employee");
        }
        
        asset.setAssignedEmployee(null);
        asset.setStatus(AssetStatus.AVAILABLE);
        asset.setReturnDate(LocalDate.now());
        
        Asset updatedAsset = assetRepository.save(asset);
        return AssetMapper.mapToAssetDto(updatedAsset);
    }

    @Override
    public void deleteAsset(Long assetId) {
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found with id: " + assetId));
        
        assetRepository.delete(asset);
    }
}