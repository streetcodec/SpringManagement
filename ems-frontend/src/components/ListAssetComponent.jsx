import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AssetService from '../services/AssetService';
import { format } from 'date-fns';

const ListAssetComponent = () => {
    const [assets, setAssets] = useState([]);
    const [message, setMessage] = useState('');
    
    const navigate = useNavigate();

    useEffect(() => {
        getAllAssets();
    }, []);

    function getAllAssets() {
        AssetService.getAllAssets()
            .then((response) => {
                setAssets(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function addNewAsset() {
        navigate('/add-asset');
    }

    function viewAsset(id) {
        navigate(`/view-asset/${id}`);
    }

    function updateAsset(id) {
        navigate(`/edit-asset/${id}`);
    }

    function removeAsset(id) {
        AssetService.deleteAsset(id)
            .then(() => {
                getAllAssets();
                setMessage('Asset deleted successfully!');
                setTimeout(() => setMessage(''), 3000);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function formatDate(dateString) {
        if (!dateString) return 'N/A';
        return format(new Date(dateString), 'yyyy-MM-dd');
    }

    function getStatusBadgeClass(status) {
        switch(status) {
            case 'AVAILABLE':
                return 'badge bg-success';
            case 'ASSIGNED':
                return 'badge bg-primary';
            case 'UNDER_MAINTENANCE':
                return 'badge bg-warning text-dark';
            case 'RETIRED':
                return 'badge bg-danger';
            default:
                return 'badge bg-secondary';
        }
    }

    return (
        <div className="container">
            <h2 className="text-center mt-4 mb-3">Asset Management</h2>
            
            {message && (
                <div className="alert alert-success" role="alert">
                    {message}
                </div>
            )}
            
            <div className="row mb-3">
                <div className="col">
                    <button className="btn btn-primary" onClick={addNewAsset}>Add New Asset</button>
                </div>
            </div>
            
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Serial Number</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Assigned To</th>
                            <th>Assigned Date</th>
                            <th>Return Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assets.map(asset => (
                            <tr key={asset.id}>
                                <td>{asset.id}</td>
                                <td>{asset.name}</td>
                                <td>{asset.serialNumber || 'N/A'}</td>
                                <td>{asset.assetType || 'N/A'}</td>
                                <td>
                                    <span className={getStatusBadgeClass(asset.status)}>
                                        {asset.status}
                                    </span>
                                </td>
                                <td>{asset.employeeName || 'Unassigned'}</td>
                                <td>{formatDate(asset.assignmentDate)}</td>
                                <td>{formatDate(asset.returnDate)}</td>
                                <td>
                                    <div className="d-flex">
                                        <button
                                            className="btn btn-info btn-sm me-1"
                                            onClick={() => viewAsset(asset.id)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="btn btn-primary btn-sm me-1"
                                            onClick={() => updateAsset(asset.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => removeAsset(asset.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {assets.length === 0 && (
                            <tr>
                                <td colSpan="9" className="text-center">No assets found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListAssetComponent;