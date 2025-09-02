// Virtual Tour 3D - Three.js Implementation

class VirtualTour {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.buildings = [];
        this.currentLocation = null;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.infoPanel = document.getElementById('info-panel');
        this.locationTitle = document.getElementById('location-title');
        this.locationDescription = document.getElementById('location-description');
        this.locationDetails = document.getElementById('location-details');

        this.init();
        this.createScene();
        this.createBuildings();
        this.createTerrain();
        this.createSky();
        this.setupEventListeners();
        this.animate();
        this.hideLoadingScreen();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB); // Sky blue

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(50, 30, 50);

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.getElementById('tour-canvas').appendChild(this.renderer.domElement);

        // Controls setup
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxPolarAngle = Math.PI * 0.45; // Limit vertical rotation
        this.controls.minDistance = 10;
        this.controls.maxDistance = 200;

        // Lighting setup
        this.setupLighting();
    }

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);

        // Directional light (sun)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(50, 50, 25);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 500;
        directionalLight.shadow.camera.left = -100;
        directionalLight.shadow.camera.right = 100;
        directionalLight.shadow.camera.top = 100;
        directionalLight.shadow.camera.bottom = -100;
        this.scene.add(directionalLight);

        // Point lights for buildings
        const pointLight1 = new THREE.PointLight(0xffd700, 0.5, 50);
        pointLight1.position.set(0, 20, 0);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffd700, 0.5, 50);
        pointLight2.position.set(30, 20, 30);
        this.scene.add(pointLight2);
    }

    createTerrain() {
        // Ground plane
        const groundGeometry = new THREE.PlaneGeometry(200, 200);
        const groundMaterial = new THREE.MeshLambertMaterial({
            color: 0x4a7c59,
            transparent: true,
            opacity: 0.8
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);

        // Grass texture effect
        const grassGeometry = new THREE.PlaneGeometry(200, 200);
        const grassMaterial = new THREE.MeshBasicMaterial({
            color: 0x228B22,
            transparent: true,
            opacity: 0.3
        });
        const grass = new THREE.Mesh(grassGeometry, grassMaterial);
        grass.rotation.x = -Math.PI / 2;
        grass.position.y = 0.01;
        this.scene.add(grass);

        // Paths
        this.createPaths();
    }

    createPaths() {
        // Main walkway
        const pathGeometry = new THREE.PlaneGeometry(4, 100);
        const pathMaterial = new THREE.MeshLambertMaterial({ color: 0x8B7355 });
        const mainPath = new THREE.Mesh(pathGeometry, pathMaterial);
        mainPath.rotation.x = -Math.PI / 2;
        mainPath.position.y = 0.02;
        this.scene.add(mainPath);

        // Cross paths
        for (let i = -40; i <= 40; i += 20) {
            const crossPathGeometry = new THREE.PlaneGeometry(2, 60);
            const crossPath = new THREE.Mesh(crossPathGeometry, pathMaterial);
            crossPath.rotation.x = -Math.PI / 2;
            crossPath.position.set(i, 0.02, 0);
            this.scene.add(crossPath);
        }
    }

    createBuildings() {
        // Main entrance building
        this.createBuilding('entrance', 0, 0, 0, 15, 8, 12, 0xffd700, 'Entrée principale');
        this.buildings.push({ name: 'entrance', position: { x: 0, y: 0, z: 0 } });

        // Library
        this.createBuilding('library', 25, 0, 15, 20, 12, 15, 0x8B4513, 'Bibliothèque centrale');
        this.buildings.push({ name: 'library', position: { x: 25, y: 0, z: 15 } });

        // Sciences faculty
        this.createBuilding('sciences', -25, 0, 20, 25, 15, 18, 0x4169E1, 'Faculté des Sciences');
        this.buildings.push({ name: 'sciences', position: { x: -25, y: 0, z: 20 } });

        // Engineering faculty
        this.createBuilding('engineering', 30, 0, -20, 22, 14, 16, 0x708090, 'Faculté de Génie');
        this.buildings.push({ name: 'engineering', position: { x: 30, y: 0, z: -20 } });

        // Medicine faculty
        this.createBuilding('medicine', -30, 0, -15, 18, 13, 14, 0xDC143C, 'Faculté de Médecine');
        this.buildings.push({ name: 'medicine', position: { x: -30, y: 0, z: -15 } });

        // Sports complex
        this.createBuilding('sports', 0, 0, -40, 30, 6, 20, 0x32CD32, 'Complexe sportif');
        this.buildings.push({ name: 'sports', position: { x: 0, y: 0, z: -40 } });

        // Student dormitory
        this.createBuilding('dormitory', -40, 0, 0, 12, 20, 8, 0xFF6347, 'Résidences étudiantes');
        this.buildings.push({ name: 'dormitory', position: { x: -40, y: 0, z: 0 } });

        // Add trees around campus
        this.createTrees();
    }

    createBuilding(name, x, y, z, width, height, depth, color, label) {
        // Main building structure
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshLambertMaterial({ color: color });
        const building = new THREE.Mesh(geometry, material);
        building.position.set(x, y + height/2, z);
        building.castShadow = true;
        building.receiveShadow = true;
        building.userData = { name: name, label: label };
        this.scene.add(building);

        // Windows
        this.addWindows(building, width, height, depth);

        // Roof
        const roofGeometry = new THREE.ConeGeometry(width * 0.7, height * 0.3, 4);
        const roofMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const roof = new THREE.Mesh(roofGeometry, roofMaterial);
        roof.position.set(x, y + height + height * 0.15, z);
        roof.castShadow = true;
        this.scene.add(roof);

        // Label
        this.createLabel(building, label);
    }

    addWindows(building, width, height, depth) {
        const windowGeometry = new THREE.PlaneGeometry(1.5, 2);
        const windowMaterial = new THREE.MeshBasicMaterial({
            color: 0x87CEEB,
            transparent: true,
            opacity: 0.7
        });

        // Front windows
        for (let i = 0; i < 3; i++) {
            const window = new THREE.Mesh(windowGeometry, windowMaterial);
            window.position.set(
                building.position.x - width/2 + (i + 1) * width/4,
                building.position.y,
                building.position.z + depth/2 + 0.01
            );
            this.scene.add(window);
        }

        // Side windows
        for (let i = 0; i < 2; i++) {
            const window = new THREE.Mesh(windowGeometry, windowMaterial);
            window.position.set(
                building.position.x + width/2 + 0.01,
                building.position.y,
                building.position.z - depth/2 + (i + 1) * depth/3
            );
            window.rotation.y = Math.PI / 2;
            this.scene.add(window);
        }
    }

    createLabel(building, text) {
        // Create a canvas for the label
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 64;

        context.fillStyle = 'rgba(0, 0, 0, 0.8)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = 'white';
        context.font = 'Bold 20px Arial';
        context.textAlign = 'center';
        context.fillText(text, canvas.width / 2, canvas.height / 2 + 7);

        const texture = new THREE.CanvasTexture(canvas);
        const labelMaterial = new THREE.SpriteMaterial({ map: texture });
        const label = new THREE.Sprite(labelMaterial);
        label.position.set(building.position.x, building.position.y + building.geometry.parameters.height/2 + 3, building.position.z);
        label.scale.set(10, 2.5, 1);
        this.scene.add(label);
    }

    createTrees() {
        const treePositions = [
            { x: 15, z: 10 }, { x: -15, z: 10 }, { x: 15, z: -10 }, { x: -15, z: -10 },
            { x: 40, z: 10 }, { x: -40, z: 10 }, { x: 40, z: -10 }, { x: -40, z: -10 },
            { x: 10, z: 35 }, { x: -10, z: 35 }, { x: 10, z: -35 }, { x: -10, z: -35 }
        ];

        treePositions.forEach(pos => {
            // Tree trunk
            const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.8, 4);
            const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
            const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
            trunk.position.set(pos.x, 2, pos.z);
            trunk.castShadow = true;
            this.scene.add(trunk);

            // Tree foliage
            const foliageGeometry = new THREE.SphereGeometry(3);
            const foliageMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
            const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
            foliage.position.set(pos.x, 5, pos.z);
            foliage.castShadow = true;
            this.scene.add(foliage);
        });
    }

    createSky() {
        // Sky gradient effect
        const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
        const skyMaterial = new THREE.ShaderMaterial({
            vertexShader: `
                varying vec3 vWorldPosition;
                void main() {
                    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                    vWorldPosition = worldPosition.xyz;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vWorldPosition;
                void main() {
                    float h = normalize(vWorldPosition).y;
                    gl_FragColor = vec4(mix(vec3(0.5, 0.7, 1.0), vec3(0.0, 0.4, 0.8), max(pow(max(h, 0.0), 0.8), 0.0)), 1.0);
                }
            `,
            side: THREE.BackSide
        });
        const sky = new THREE.Mesh(skyGeometry, skyMaterial);
        this.scene.add(sky);
    }

    setupEventListeners() {
        // Mouse move for raycasting
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        // Click events
        window.addEventListener('click', (event) => {
            this.handleClick(event);
        });

        // Control buttons
        document.getElementById('reset-view').addEventListener('click', () => {
            this.resetView();
        });

        document.getElementById('top-view').addEventListener('click', () => {
            this.topView();
        });

        document.getElementById('ground-view').addEventListener('click', () => {
            this.groundView();
        });

        // Location buttons
        document.querySelectorAll('.location-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const location = e.target.dataset.location;
                this.moveToLocation(location);
            });
        });

        // Close info panel
        document.getElementById('close-info').addEventListener('click', () => {
            this.infoPanel.style.display = 'none';
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    handleClick(event) {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;
            if (clickedObject.userData && clickedObject.userData.name) {
                this.showBuildingInfo(clickedObject.userData.name);
            }
        }
    }

    showBuildingInfo(buildingName) {
        const buildingInfo = this.getBuildingInfo(buildingName);
        this.locationTitle.textContent = buildingInfo.title;
        this.locationDescription.innerHTML = buildingInfo.description;
        this.locationDetails.innerHTML = buildingInfo.details;
        this.locationDetails.style.display = 'block';
        this.infoPanel.style.display = 'block';
    }

    getBuildingInfo(name) {
        const info = {
            entrance: {
                title: 'Entrée principale',
                description: 'Le point d\'accueil officiel de l\'Université Mouloud Mammeri de Tizi-Ouzou.',
                details: '<p>Horaires d\'ouverture: 8h00 - 18h00</p><p>Services: Accueil, Informations, Sécurité</p>'
            },
            library: {
                title: 'Bibliothèque centrale',
                description: 'La bibliothèque principale du campus avec plus de 100 000 ouvrages.',
                details: '<p>Collections: Livres, Revues, Thèses</p><p>Espaces: Lecture, Étude, Informatique</p>'
            },
            sciences: {
                title: 'Faculté des Sciences',
                description: 'Faculté dédiée à l\'enseignement et la recherche en sciences fondamentales.',
                details: '<p>Départements: Mathématiques, Physique, Chimie, Biologie</p><p>Laboratoires: 25 salles équipées</p>'
            },
            engineering: {
                title: 'Faculté de Génie',
                description: 'Formation d\'ingénieurs dans tous les domaines technologiques.',
                details: '<p>Spécialités: Informatique, Électronique, Mécanique</p><p>Ateliers: 15 salles spécialisées</p>'
            },
            medicine: {
                title: 'Faculté de Médecine',
                description: 'Formation médicale complète avec hôpital universitaire.',
                details: '<p>Départements: Médecine, Pharmacie, Chirurgie</p><p>Cliniques: 8 services hospitaliers</p>'
            },
            sports: {
                title: 'Complexe sportif',
                description: 'Installations sportives pour la pratique sportive des étudiants.',
                details: '<p>Équipements: Gymnase, Terrain de foot, Piscine</p><p>Activités: 20 sports différents</p>'
            },
            dormitory: {
                title: 'Résidences étudiantes',
                description: 'Logements pour les étudiants avec tous les services nécessaires.',
                details: '<p>Capacité: 2000 étudiants</p><p>Services: Restauration, Laverie, Sécurité 24h</p>'
            }
        };
        return info[name] || { title: 'Lieu inconnu', description: 'Information non disponible', details: '' };
    }

    moveToLocation(locationName) {
        const location = this.buildings.find(b => b.name === locationName);
        if (location) {
            const targetPosition = location.position;
            this.camera.position.set(
                targetPosition.x + 20,
                targetPosition.y + 15,
                targetPosition.z + 20
            );
            this.controls.target.set(targetPosition.x, targetPosition.y + 5, targetPosition.z);
            this.controls.update();
            this.showBuildingInfo(locationName);
        }
    }

    resetView() {
        this.camera.position.set(50, 30, 50);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }

    topView() {
        this.camera.position.set(0, 100, 0);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }

    groundView() {
        this.camera.position.set(0, 2, 0);
        this.controls.target.set(10, 0, 0);
        this.controls.update();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 2000);
    }
}

// Initialize the virtual tour when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new VirtualTour();
});