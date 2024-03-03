function checkMaintenanceStatus() {
    fetch('/v2/assets/maintenance.json')
        .then(response => response.json())
        .then(data => {
            if (data.maintenance === true) {
                if (window.location.pathname !== '/v2/maintenance/') {
                    window.location.href = '/v2/maintenance/';
                }
            }
        })
        .catch(error => {
            console.error('Error fetching maintenance status:', error);
        });
}

window.onload = checkMaintenanceStatus;