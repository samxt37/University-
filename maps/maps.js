// UMMTO Maps - Interactive Campus Map
// Using Leaflet.js for interactive mapping

class UMMTOCampusMap {
    constructor() {
        this.map = null;
        this.markers = [];
        this.currentLocation = null;
        this.init();
    }

    init() {
        this.createMap();
        this.addCampusLocations();
        this.addControls();
        this.setupEventListeners();
    }

    createMap() {
        // Initialize map centered on Tizi-Ouzou, Algeria
        this.map = L.map('campus-map-container').setView([36.7118, 4.0458], 15);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(this.map);

        // Add satellite view option
        const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '© Esri',
            maxZoom: 19
        });

        // Layer control
        const baseLayers = {
            "Plan": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
            "Satellite": satelliteLayer
        };

        L.control.layers(baseLayers).addTo(this.map);
    }

    addCampusLocations() {
        const locations = [
            {
                name: "Entrée Principale",
                lat: 36.7118,
                lng: 4.0458,
                type: "admin",
                description: "Point d'entrée principal du campus universitaire",
                facilities: ["Accueil", "Sécurité", "Informations"]
            },
            {
                name: "Faculté des Sciences",
                lat: 36.7125,
                lng: 4.0465,
                type: "faculty",
                description: "Mathématiques, Physique, Chimie, Biologie",
                facilities: ["Laboratoires", "Amphithéâtres", "Bibliothèque"]
            },
            {
                name: "Faculté de Droit",
                lat: 36.7110,
                lng: 4.0445,
                type: "faculty",
                description: "Droit privé, public, sciences politiques",
                facilities: ["Clinique juridique", "Bibliothèque spécialisée", "Salles de cours"]
            },
            {
                name: "Faculté d'Économie",
                lat: 36.7130,
                lng: 4.0470,
                type: "faculty",
                description: "Économie, Gestion, Commerce, Finance",
                facilities: ["Centre d'entrepreneuriat", "Salle de marché", "Laboratoires informatiques"]
            },
            {
                name: "Faculté de Technologie",
                lat: 36.7105,
                lng: 4.0430,
                type: "faculty",
                description: "Génie civil, électrique, mécanique",
                facilities: ["Ateliers", "Laboratoires techniques", "Centre de calcul"]
            },
            {
                name: "Faculté de Génie",
                lat: 36.7120,
                lng: 4.0480,
                type: "faculty",
                description: "Informatique, Électronique, Télécommunications",
                facilities: ["Fablab", "Laboratoires de recherche", "Data center"]
            },
            {
                name: "Faculté de Médecine",
                lat: 36.7095,
                lng: 4.0420,
                type: "faculty",
                description: "Médecine générale, pharmacie, chirurgie dentaire",
                facilities: ["Hôpital universitaire", "Laboratoires médicaux", "Cliniques"]
            },
            {
                name: "Faculté d'Agronomie",
                lat: 36.7135,
                lng: 4.0485,
                type: "faculty",
                description: "Production végétale, animale, agroalimentaire",
                facilities: ["Fermes expérimentales", "Laboratoires d'analyse", "Sérres"]
            },
            {
                name: "Bibliothèque Centrale",
                lat: 36.7122,
                lng: 4.0460,
                type: "service",
                description: "Bibliothèque universitaire principale",
                facilities: ["Livres", "Revues", "Salles d'étude", "Ordinateurs"]
            },
            {
                name: "Complexe Sportif",
                lat: 36.7100,
                lng: 4.0410,
                type: "sports",
                description: "Installations sportives du campus",
                facilities: ["Stade", "Gymnase", "Piscine", "Terrains de tennis"]
            },
            {
                name: "Résidences Étudiantes",
                lat: 36.7140,
                lng: 4.0490,
                type: "residence",
                description: "Logements pour étudiants",
                facilities: ["Chambres", "Restauration", "Laverie", "Sécurité"]
            },
            {
                name: "Restaurant Universitaire",
                lat: 36.7115,
                lng: 4.0450,
                type: "service",
                description: "Service de restauration",
                facilities: ["Repas", "Cafétéria", "Espace détente"]
            }
        ];

        locations.forEach(location => {
            this.addLocationMarker(location);
        });
    }

    addLocationMarker(location) {
        const iconColors = {
            admin: '#e74c3c',
            faculty: '#3498db',
            sports: '#2ecc71',
            residence: '#f39c12',
            service: '#9b59b6'
        };

        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: ${iconColors[location.type]}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
            iconSize: [26, 26],
            iconAnchor: [13, 13]
        });

        const marker = L.marker([location.lat, location.lng], { icon: customIcon })
            .addTo(this.map)
            .bindPopup(this.createPopupContent(location));

        marker.locationData = location;
        this.markers.push(marker);

        // Add click event
        marker.on('click', () => {
            this.showLocationDetails(location);
        });
    }

    createPopupContent(location) {
        const facilitiesList = location.facilities.map(facility =>
            `<li>${facility}</li>`
        ).join('');

        return `
            <div class="map-popup">
                <h3>${location.name}</h3>
                <p>${location.description}</p>
                <h4>Équipements:</h4>
                <ul>${facilitiesList}</ul>
                <button onclick="campusMap.showLocationDetails(${JSON.stringify(location).replace(/"/g, '"')})" class="popup-btn">
                    Voir détails
                </button>
            </div>
        `;
    }

    showLocationDetails(location) {
        // Create or update info panel
        let infoPanel = document.getElementById('location-info-panel');
        if (!infoPanel) {
            infoPanel = document.createElement('div');
            infoPanel.id = 'location-info-panel';
            infoPanel.className = 'location-info-panel';
            document.body.appendChild(infoPanel);
        }

        const facilitiesList = location.facilities.map(facility =>
            `<span class="facility-tag">${facility}</span>`
        ).join('');

        infoPanel.innerHTML = `
            <div class="info-panel-header">
                <h3>${location.name}</h3>
                <button onclick="this.parentElement.parentElement.remove()" class="close-btn">×</button>
            </div>
            <div class="info-panel-content">
                <p class="location-description">${location.description}</p>
                <div class="location-facilities">
                    <h4>Équipements disponibles:</h4>
                    <div class="facilities-grid">${facilitiesList}</div>
                </div>
                <div class="location-actions">
                    <button onclick="campusMap.navigateTo(${location.lat}, ${location.lng})" class="action-btn">
                        📍 Obtenir l'itinéraire
                    </button>
                    <button onclick="campusMap.shareLocation('${location.name}')" class="action-btn">
                        📤 Partager
                    </button>
                </div>
            </div>
        `;

        infoPanel.style.display = 'block';
    }

    navigateTo(lat, lng) {
        // Open in external map application
        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(url, '_blank');
    }

    shareLocation(name) {
        if (navigator.share) {
            navigator.share({
                title: `UMMTO - ${name}`,
                text: `Découvrez ${name} sur le campus UMMTO`,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(`${name} - ${window.location.href}`);
            this.showNotification('Lien copié dans le presse-papiers');
        }
    }

    addControls() {
        // Add custom controls
        const customControl = L.Control.extend({
            options: {
                position: 'topright'
            },

            onAdd: function(map) {
                const container = L.DomUtil.create('div', 'map-controls');

                container.innerHTML = `
                    <button onclick="campusMap.resetView()" title="Vue d'ensemble">
                        🏠
                    </button>
                    <button onclick="campusMap.showAllLocations()" title="Tous les lieux">
                        📍
                    </button>
                    <button onclick="campusMap.toggleTraffic()" title="Trafic">
                        🚗
                    </button>
                `;

                return container;
            }
        });

        this.map.addControl(new customControl());
    }

    resetView() {
        this.map.setView([36.7118, 4.0458], 15);
    }

    showAllLocations() {
        const group = new L.featureGroup(this.markers);
        this.map.fitBounds(group.getBounds().pad(0.1));
    }

    toggleTraffic() {
        // Toggle traffic layer (placeholder for future implementation)
        this.showNotification('Fonctionnalité trafic bientôt disponible');
    }

    setupEventListeners() {
        // Location filter buttons
        document.querySelectorAll('.location-filter').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.target.dataset.type;
                this.filterLocations(type);
            });
        });

        // Search functionality
        const searchInput = document.getElementById('location-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchLocations(e.target.value);
            });
        }
    }

    filterLocations(type) {
        this.markers.forEach(marker => {
            if (type === 'all' || marker.locationData.type === type) {
                this.map.addLayer(marker);
            } else {
                this.map.removeLayer(marker);
            }
        });
    }

    searchLocations(query) {
        const searchTerm = query.toLowerCase();

        this.markers.forEach(marker => {
            const location = marker.locationData;
            const matches = location.name.toLowerCase().includes(searchTerm) ||
                          location.description.toLowerCase().includes(searchTerm);

            if (matches) {
                this.map.addLayer(marker);
                marker.openPopup();
            } else {
                this.map.removeLayer(marker);
            }
        });
    }

    showNotification(message) {
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'map-notification';
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Get directions between two points
    getDirections(fromLat, fromLng, toLat, toLng) {
        const url = `https://www.google.com/maps/dir/${fromLat},${fromLng}/${toLat},${toLng}`;
        window.open(url, '_blank');
    }

    // Calculate distance between two points
    calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }
}

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.campusMap = new UMMTOCampusMap();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UMMTOCampusMap;
}