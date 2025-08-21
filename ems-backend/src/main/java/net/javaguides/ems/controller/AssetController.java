package net.javaguides.ems.controller;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.AssetDto;
import net.javaguides.ems.service.AssetService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/assets")
public class AssetController {
    private AssetService assetService;

    @PostMapping
    public ResponseEntity<AssetDto> createAsset(@RequestBody AssetDto assetDto) {
        AssetDto savedAsset = assetService.createAsset(assetDto);
        return new ResponseEntity<>(savedAsset, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<AssetDto> getAssetById(@PathVariable("id") Long assetId) {
        AssetDto assetDto = assetService.getAssetById(assetId);
        return ResponseEntity.ok(assetDto);
    }

    @GetMapping
    public ResponseEntity<List<AssetDto>> getAllAssets() {
        List<AssetDto> assets = assetService.getAllAssets();
        return ResponseEntity.ok(assets);
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<AssetDto>> getAssetsByEmployeeId(@PathVariable Long employeeId) {
        List<AssetDto> assets = assetService.getAssetsByEmployeeId(employeeId);
        return ResponseEntity.ok(assets);
    }

    @PutMapping("{id}")
    public ResponseEntity<AssetDto> updateAsset(@PathVariable("id") Long assetId,
                                              @RequestBody AssetDto assetDto) {
        AssetDto updatedAsset = assetService.updateAsset(assetId, assetDto);
        return ResponseEntity.ok(updatedAsset);
    }

    @PutMapping("{assetId}/assign/{employeeId}")
    public ResponseEntity<AssetDto> assignAssetToEmployee(@PathVariable Long assetId,
                                                        @PathVariable Long employeeId) {
        AssetDto updatedAsset = assetService.assignAssetToEmployee(assetId, employeeId);
        return ResponseEntity.ok(updatedAsset);
    }

    @PutMapping("{assetId}/unassign")
    public ResponseEntity<AssetDto> unassignAsset(@PathVariable Long assetId) {
        AssetDto updatedAsset = assetService.unassignAsset(assetId);
        return ResponseEntity.ok(updatedAsset);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteAsset(@PathVariable("id") Long assetId) {
        assetService.deleteAsset(assetId);
        return ResponseEntity.ok("Asset deleted successfully!");
    }
}