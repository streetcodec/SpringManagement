package net.javaguides.ems.service;

import net.javaguides.ems.dto.AssetDto;
import java.util.List;

public interface AssetService {
    AssetDto createAsset(AssetDto assetDto);
    
    AssetDto getAssetById(Long assetId);
    
    List<AssetDto> getAllAssets();
    
    List<AssetDto> getAssetsByEmployeeId(Long employeeId);
    
    AssetDto updateAsset(Long assetId, AssetDto assetDto);
    
    AssetDto assignAssetToEmployee(Long assetId, Long employeeId);
    
    AssetDto unassignAsset(Long assetId);
    
    void deleteAsset(Long assetId);
}