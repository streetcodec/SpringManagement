import axios from 'axios';

const ASSET_API_BASE_URL = 'http://localhost:8081/api/assets';

class AssetService {
    getAllAssets() {
        return axios.get(ASSET_API_BASE_URL);
    }

    createAsset(asset) {
        return axios.post(ASSET_API_BASE_URL, asset);
    }

    getAssetById(assetId) {
        return axios.get(`${ASSET_API_BASE_URL}/${assetId}`);
    }

    getAssetsByEmployeeId(employeeId) {
        return axios.get(`${ASSET_API_BASE_URL}/employee/${employeeId}`);
    }

    updateAsset(assetId, asset) {
        return axios.put(`${ASSET_API_BASE_URL}/${assetId}`, asset);
    }

    assignAssetToEmployee(assetId, employeeId) {
        return axios.put(`${ASSET_API_BASE_URL}/${assetId}/assign/${employeeId}`);
    }

    unassignAsset(assetId) {
        return axios.put(`${ASSET_API_BASE_URL}/${assetId}/unassign`);
    }

    deleteAsset(assetId) {
        return axios.delete(`${ASSET_API_BASE_URL}/${assetId}`);
    }
}

export default new AssetService();