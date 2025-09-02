// Create placeholder images for UMMTO website
// This script generates SVG placeholder images for all referenced images

const fs = require('fs');
const path = require('path');

const images = [
    // Hero images
    'news-main.jpg',
    'news-1.jpg',
    'news-2.jpg',
    'news-3.jpg',

    // Faculty hero images
    'law-hero.jpg',
    'economics-hero.jpg',
    'technology-hero.jpg',
    'engineering-hero.jpg',
    'medicine-hero.jpg',
    'agronomy-hero.jpg',
    'sciences-hero.jpg',
    'letters-hero.jpg',

    // Specialty images
    'droit-prive.jpg',
    'droit-public.jpg',
    'sciences-politiques.jpg',
    'relations-internationales.jpg',
    'economie.jpg',
    'gestion.jpg',
    'commerce.jpg',
    'finance.jpg',
    'comptabilite.jpg',
    'genie-civil.jpg',
    'genie-electrique.jpg',
    'genie-mecanique.jpg',
    'genie-procedes.jpg',
    'informatique.jpg',
    'electronique.jpg',
    'telecommunications.jpg',
    'automatique.jpg',
    'medecine-generale.jpg',
    'pharmacie.jpg',
    'dentisterie.jpg',
    'biologie-medicale.jpg',
    'production-vegetale.jpg',
    'production-animale.jpg',
    'agroalimentaire.jpg',
    'genie-rural.jpg',
    'mathematiques.jpg',
    'physique.jpg',
    'chimie.jpg',
    'biologie.jpg',

    // News images
    'law-conference.jpg',
    'moot-court.jpg',
    'law-award.jpg',
    'economics-conference.jpg',
    'business-plan.jpg',
    'stock-market.jpg',
    'math-conference.jpg',
    'math-award.jpg',
    'math-seminar.jpg',
    'research.jpg',
    'conference.jpg',
    'award.jpg',

    // Professor images
    'prof1.jpg',
    'prof2.jpg',
    'prof3.jpg',

    // Logo variations
    'logo.png',
    'favicon.ico'
];

function createPlaceholderImage(filename, width = 800, height = 600) {
    const isSVG = filename.endsWith('.svg');
    const isPNG = filename.endsWith('.png');
    const isICO = filename.endsWith('.ico');
    const isJPG = filename.endsWith('.jpg') || filename.endsWith('.jpeg');

    let content = '';

    if (isSVG) {
        // Create SVG placeholder
        const name = filename.replace('.svg', '').replace(/-/g, ' ').toUpperCase();
        content = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#f3f4f6"/>
            <text x="50%" y="40%" font-family="Arial, sans-serif" font-size="24" fill="#6b7280" text-anchor="middle">${name}</text>
            <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="16" fill="#9ca3af" text-anchor="middle">${width} x ${height}</text>
        </svg>`;
    } else if (isPNG || isJPG) {
        // For raster images, create a simple colored rectangle SVG that can be converted
        const name = filename.replace(/\.(png|jpg|jpeg)$/, '').replace(/-/g, ' ').toUpperCase();
        content = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grad)"/>
            <text x="50%" y="40%" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" font-weight="bold">${name}</text>
            <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle" opacity="0.8">${width} × ${height}</text>
        </svg>`;
    }

    return content;
}

function createAllPlaceholders() {
    const imagesDir = path.join(__dirname);

    images.forEach(filename => {
        const filePath = path.join(imagesDir, filename);
        const content = createPlaceholderImage(filename);

        if (content) {
            // For SVG files, write directly
            if (filename.endsWith('.svg')) {
                fs.writeFileSync(filePath, content);
                console.log(`Created: ${filename}`);
            } else {
                // For other formats, create SVG that can be converted later
                const svgFilename = filename.replace(/\.(png|jpg|jpeg|ico)$/, '.svg');
                const svgPath = path.join(imagesDir, svgFilename);
                fs.writeFileSync(svgPath, content);
                console.log(`Created SVG placeholder: ${svgFilename} (convert to ${filename})`);
            }
        }
    });

    console.log('\nPlaceholder images created successfully!');
    console.log('Note: Convert SVG files to PNG/JPG using an image editor or online converter for production use.');
}

// Create additional specialized images
function createSpecialImages() {
    const specialImages = {
        'logo.svg': `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#1e3a8a;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#059669;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#d97706;stop-opacity:1" />
                </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="90" fill="url(#bgGradient)"/>
            <text x="100" y="110" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white">UMMTO</text>
            <text x="100" y="130" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="white" opacity="0.9">Tizi-Ouzou</text>
        </svg>`,

        'favicon.ico': `<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" fill="#6366f1" rx="4"/>
            <text x="16" y="20" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white">U</text>
        </svg>`
    };

    Object.entries(specialImages).forEach(([filename, content]) => {
        const filePath = path.join(__dirname, filename);
        fs.writeFileSync(filePath, content);
        console.log(`Created special image: ${filename}`);
    });
}

// Run the creation process
console.log('Creating placeholder images for UMMTO website...\n');
createAllPlaceholders();
console.log('\nCreating special images...\n');
createSpecialImages();
console.log('\nAll images created successfully! 🎉');
console.log('\nNext steps:');
console.log('1. Convert SVG files to PNG/JPG format using an image editor');
console.log('2. Replace with actual high-quality images');
console.log('3. Optimize images for web (compress, resize)');