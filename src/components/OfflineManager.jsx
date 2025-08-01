
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const OfflineManager = ({ events, onSyncEvents }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingChanges, setPendingChanges] = useState([]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('🌐 Back online! Syncing data...', { autoClose: 2000 });
      syncPendingChanges();
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.warn('📴 You are offline. Changes will be saved locally.', { autoClose: 3000 });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load pending changes from localStorage
    const stored = localStorage.getItem('pendingSchedulerChanges');
    if (stored) {
      setPendingChanges(JSON.parse(stored));
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Save pending changes to localStorage
    localStorage.setItem('pendingSchedulerChanges', JSON.stringify(pendingChanges));
  }, [pendingChanges]);

  const syncPendingChanges = async () => {
    if (pendingChanges.length > 0 && isOnline) {
      try {
        // Simulate API sync - replace with actual API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast.success(`✅ Synced ${pendingChanges.length} changes successfully!`);
        setPendingChanges([]);
      } catch (error) {
        toast.error('❌ Sync failed. Will retry when online.');
      }
    }
  };

  const addPendingChange = (change) => {
    setPendingChanges(prev => [...prev, { ...change, timestamp: Date.now() }]);
  };

  // Export/Import functionality
  const exportData = () => {
    const dataToExport = {
      events,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `schedule-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('📥 Schedule exported successfully!');
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (imported.events && Array.isArray(imported.events)) {
          onSyncEvents(imported.events);
          toast.success(`📤 Imported ${imported.events.length} events successfully!`);
        } else {
          throw new Error('Invalid file format');
        }
      } catch (error) {
        toast.error('❌ Failed to import data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="offline-manager">
      <div className="connection-status">
        <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
          {isOnline ? '🌐' : '📴'} {isOnline ? 'Online' : 'Offline'}
        </div>
        {pendingChanges.length > 0 && (
          <div className="pending-changes">
            📤 {pendingChanges.length} changes pending sync
          </div>
        )}
      </div>

      <div className="data-management">
        <button className="export-btn" onClick={exportData}>
          📥 Export Data
        </button>
        <label className="import-btn">
          📤 Import Data
          <input
            type="file"
            accept=".json"
            onChange={importData}
            style={{ display: 'none' }}
          />
        </label>
      </div>
    </div>
  );
};

export default OfflineManager;
