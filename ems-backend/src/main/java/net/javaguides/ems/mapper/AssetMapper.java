package net.javaguides.ems.mapper;

import net.javaguides.ems.dto.AssetDto;
import net.javaguides.ems.entity.Asset;
import net.javaguides.ems.entity.Employee;

public class AssetMapper {
    
    public static AssetDto mapToAssetDto(Asset asset) {
        if (asset == null) return null;
        
        AssetDto assetDto = new AssetDto();
        assetDto.setId(asset.getId());
        assetDto.setName(asset.getName());
        assetDto.setSerialNumber(asset.getSerialNumber());
        assetDto.setAssetType(asset.getAssetType());
        assetDto.setStatus(asset.getStatus());
        assetDto.setAssignmentDate(asset.getAssignmentDate());
        assetDto.setReturnDate(asset.getReturnDate());
        
        if (asset.getAssignedEmployee() != null) {
            Employee employee = asset.getAssignedEmployee();
            assetDto.setEmployeeId(employee.getId());
            assetDto.setEmployeeName(employee.getFirstName() + " " + employee.getLastName());
        }
        
        return assetDto;
    }
    
    public static Asset mapToAsset(AssetDto assetDto) {
        if (assetDto == null) return null;
        
        Asset asset = new Asset();
        asset.setId(assetDto.getId());
        asset.setName(assetDto.getName());
        asset.setSerialNumber(assetDto.getSerialNumber());
        asset.setAssetType(assetDto.getAssetType());
        asset.setStatus(assetDto.getStatus());
        asset.setAssignmentDate(assetDto.getAssignmentDate());
        asset.setReturnDate(assetDto.getReturnDate());
        
        // Note: The employee relationship will be set in the service layer
        
        return asset;
    }
}