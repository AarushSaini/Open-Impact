// Initialize the map centered on Delhi, India
const map = L.map('map').setView([28.6139, 77.2090], 12);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
}).addTo(map);

// Store all markers for filtering
let allMarkers = [];
let activeFilters = ['roads', 'parks', 'education', 'healthcare'];
let activeStatusFilters = ['completed', 'in-progress', 'delayed'];
let budgetRange = { min: 0, max: Infinity };

// Initialize the application
function initApp() {
    // Load and display projects
    loadProjects();
    
    // Set up event listeners
    setupEventListeners();
    
    // Update summary statistics
    updateSummaryStats();
}

// Load projects onto the map
function loadProjects() {
    // Clear existing markers
    allMarkers.forEach(marker => map.removeLayer(marker));
    allMarkers = [];
    
    // Add road project markers
    governmentSpendingData.roadProjects.forEach(project => {
        addProjectMarker(project, 'roads');
    });
    
    // Add park project markers
    governmentSpendingData.parkProjects.forEach(project => {
        addProjectMarker(project, 'parks');
    });
    
    // Add education project markers
    governmentSpendingData.educationProjects.forEach(project => {
        addProjectMarker(project, 'education');
    });
    
    // Add healthcare project markers
    governmentSpendingData.healthcareProjects.forEach(project => {
        addProjectMarker(project, 'healthcare');
    });
}

// Add a project marker to the map
function addProjectMarker(project, category) {
    // Determine marker color based on project status
    const markerColor = getStatusColor(project.status);
    
    // Create custom icon
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: <div style="background-color: ${markerColor}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    });
    
    // Create marker
    const marker = L.marker([project.location.lat, project.location.lng], {
        icon: customIcon,
        category: category,
        projectId: project.id
    }).addTo(map);
    
    // Add popup with basic info
    marker.bindPopup(`
        <strong>${project.name}</strong><br>
        Budget: ${formatCurrency(project.budget)}<br>
        Status: ${capitalizeFirstLetter(project.status)}
    `);
    
    // Add click event to show project details
    marker.on('click', () => {
        showProjectDetails(project);
    });
    
    // Store marker reference
    allMarkers.push(marker);
}

// Show project details in the sidebar
function showProjectDetails(project) {
    const projectDetails = document.getElementById('project-details');
    
    // Calculate impact score class
    const impactScore = parseFloat(project.impactScore);
    let impactClass = 'low';
    if (impactScore >= 0.8) {
        impactClass = 'high';
    } else if (impactScore >= 0.5) {
        impactClass = 'medium';
    }
    
    // Format dates
    const startDate = new Date(project.startDate).toLocaleDateString();
    const endDate = new Date(project.endDate).toLocaleDateString();
    
    // Update project details HTML
    projectDetails.innerHTML = `
        <div class="project-card ${project.status}">
            <h4>${project.name}</h4>
            <div class="project-info">
                <p><span class="label">Ward:</span> ${project.ward}</p>
                <p><span class="label">Department:</span> ${project.department}</p>
                <p><span class="label">Budget:</span> ${formatCurrency(project.budget)}</p>
                <p><span class="label">Actual Spending:</span> ${formatCurrency(project.actualSpending)}</p>
                <p><span class="label">Status:</span> ${capitalizeFirstLetter(project.status)}</p>
                <p><span class="label">Completion:</span> ${project.completionPercentage}%</p>
                <p><span class="label">Start Date:</span> ${startDate}</p>
                <p><span class="label">End Date:</span> ${endDate}</p>
            </div>
            <p class="project-description">${project.description}</p>
            <div class="impact-score">
                <span class="label">Impact Score: ${project.impactScore}</span>
                <div class="progress-bar">
                    <div class="fill ${impactClass}" style="width: ${impactScore * 100}%"></div>
                </div>
            </div>
            <div class="project-actions">
                <a href="project-detail.html?id=${project.id}&category=${getProjectCategory(project)}" class="btn-full-detail">Full Detail</a>
            </div>
        </div>
    `;
}

// Helper function to get project category
function getProjectCategory(project) {
    if (governmentSpendingData.roadProjects.some(p => p.id === project.id)) {
        return 'roads';
    } else if (governmentSpendingData.parkProjects.some(p => p.id === project.id)) {
        return 'parks';
    } else if (governmentSpendingData.educationProjects.some(p => p.id === project.id)) {
        return 'education';
    } else if (governmentSpendingData.healthcareProjects.some(p => p.id === project.id)) {
        return 'healthcare';
    }
    return '';
}
// Set up event listeners
function setupEventListeners() {
    // Category filter checkboxes
    document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Update active filters
            const category = this.value;
            const filterType = this.closest('.filter-section').querySelector('h3').textContent.toLowerCase();
            
            if (filterType.includes('category')) {
                if (this.checked) {
                    if (!activeFilters.includes(category)) {
                        activeFilters.push(category);
                    }
                } else {
                    activeFilters = activeFilters.filter(filter => filter !== category);
                }
            } else if (filterType.includes('status')) {
                if (this.checked) {
                    if (!activeStatusFilters.includes(category)) {
                        activeStatusFilters.push(category);
                    }
                } else {
                    activeStatusFilters = activeStatusFilters.filter(filter => filter !== category);
                }
            }
            
            // Apply filters
            filterMarkers();
        });
    });
    
    // Budget range filter
    document.getElementById('apply-budget-filter').addEventListener('click', function() {
        const minBudget = document.getElementById('min-budget').value;
        const maxBudget = document.getElementById('max-budget').value;
        
        budgetRange.min = minBudget ? parseInt(minBudget) : 0;
        budgetRange.max = maxBudget ? parseInt(maxBudget) : Infinity;
        
        filterMarkers();
    });
    
    // Search functionality
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search');
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Perform search
function performSearch() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    
    if (!searchTerm) {
        // If search is empty, reset to show all filtered markers
        filterMarkers();
        return;
    }
    
    // Hide all markers first
    allMarkers.forEach(marker => map.removeLayer(marker));
    
    // Show only markers that match the search and active filters
    let foundAny = false;
    
    // Search in road projects
    if (activeFilters.includes('roads')) {
        governmentSpendingData.roadProjects.forEach(project => {
            if (projectMatchesSearch(project, searchTerm)) {
                const marker = allMarkers.find(m => m.options.projectId === project.id);
                if (marker) {
                    marker.addTo(map);
                    foundAny = true;
                }
            }
        });
    }
    
    // Search in park projects
    if (activeFilters.includes('parks')) {
        governmentSpendingData.parkProjects.forEach(project => {
            if (projectMatchesSearch(project, searchTerm)) {
                const marker = allMarkers.find(m => m.options.projectId === project.id);
                if (marker) {
                    marker.addTo(map);
                    foundAny = true;
                }
            }
        });
    }
    
    // Search in education projects
    if (activeFilters.includes('education')) {
        governmentSpendingData.educationProjects.forEach(project => {
            if (projectMatchesSearch(project, searchTerm)) {
                const marker = allMarkers.find(m => m.options.projectId === project.id);
                if (marker) {
                    marker.addTo(map);
                    foundAny = true;
                }
            }
        });
    }
    
    // Search in healthcare projects
    if (activeFilters.includes('healthcare')) {
        governmentSpendingData.healthcareProjects.forEach(project => {
            if (projectMatchesSearch(project, searchTerm)) {
                const marker = allMarkers.find(m => m.options.projectId === project.id);
                if (marker) {
                    marker.addTo(map);
                    foundAny = true;
                }
            }
        });
    }
    
    // If no results found, show a message
    if (!foundAny) {
        document.getElementById('project-details').innerHTML = `
            <h3>No Results Found</h3>
            <p>No projects match your search criteria. Try a different search term or adjust your filters.</p>
        `;
    }
}

// Check if a project matches the search term
function projectMatchesSearch(project, searchTerm) {
    return (
        project.name.toLowerCase().includes(searchTerm) ||
        project.ward.toLowerCase().includes(searchTerm) ||
        project.department.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm)
    );
}

// Filter markers based on active filters
function filterMarkers() {
    // Hide all markers first
    allMarkers.forEach(marker => map.removeLayer(marker));
    
    // Show only markers that match active filters
    allMarkers.forEach(marker => {
        const category = marker.options.category;
        const projectId = marker.options.projectId;
        
        // Find the project data
        let project;
        if (category === 'roads') {
            project = governmentSpendingData.roadProjects.find(p => p.id === projectId);
        } else if (category === 'parks') {
            project = governmentSpendingData.parkProjects.find(p => p.id === projectId);
        } else if (category === 'education') {
            project = governmentSpendingData.educationProjects.find(p => p.id === projectId);
        } else if (category === 'healthcare') {
            project = governmentSpendingData.healthcareProjects.find(p => p.id === projectId);
        }
        
        if (project) {
            // Check if project matches all active filters
            const matchesCategory = activeFilters.includes(category);
            const matchesStatus = activeStatusFilters.includes(project.status);
            const matchesBudget = project.budget >= budgetRange.min && project.budget <= budgetRange.max;
            
            if (matchesCategory && matchesStatus && matchesBudget) {
                marker.addTo(map);
            }
        }
    });
    
    // Update summary statistics
    updateSummaryStats();
}

// Update summary statistics
function updateSummaryStats() {
    let totalBudget = 0;
    let totalSpending = 0;
    
    // Calculate totals for all projects regardless of visibility
    // This ensures consistency between dashboard and detail page
    
    // Add road projects
    governmentSpendingData.roadProjects.forEach(project => {
        totalBudget += project.budget;
        totalSpending += project.actualSpending;
    });
    
    // Add park projects
    governmentSpendingData.parkProjects.forEach(project => {
        totalBudget += project.budget;
        totalSpending += project.actualSpending;
    });
    
    // Add education projects
    governmentSpendingData.educationProjects.forEach(project => {
        totalBudget += project.budget;
        totalSpending += project.actualSpending;
    });
    
    // Add healthcare projects
    governmentSpendingData.healthcareProjects.forEach(project => {
        totalBudget += project.budget;
        totalSpending += project.actualSpending;
    });
    
    // Store the totals in a global variable for access from detail page
    window.governmentSpendingTotals = {
        totalBudget: totalBudget,
        totalSpending: totalSpending
    };
    
    // Update summary cards
    document.querySelector('.summary-card:nth-child(1) .amount').textContent = formatCurrency(totalBudget);
    document.querySelector('.summary-card:nth-child(2) .amount').textContent = formatCurrency(totalSpending);
}

// Helper function to get color based on status
function getStatusColor(status) {
    switch (status) {
        case 'completed':
            return '#2ecc71'; // Green
        case 'in-progress':
            return '#f39c12'; // Yellow/Orange
        case 'delayed':
            return '#e74c3c'; // Red
        default:
            return '#3498db'; // Blue
    }
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Chatbot functionality
function initChatbot() {
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeButton = document.getElementById('close-chatbot');
    const sendButton = document.getElementById('send-message');
    const chatInput = document.getElementById('chatbot-input');
    const chatMessages = document.getElementById('chatbot-messages');
    
    // Toggle chatbot window
    chatbotButton.addEventListener('click', function() {
        chatbotWindow.classList.toggle('active');
    });
    
    // Close chatbot window
    closeButton.addEventListener('click', function() {
        chatbotWindow.classList.remove('active');
    });
    
    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message !== '') {
            // Add user message
            addMessage(message, 'user');
            
            // Process user message and respond
            processMessage(message);
            
            // Clear input
            chatInput.value = '';
        }
    }
    
    // Send message on button click
    sendButton.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add message to chat window
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = sender + '-message';
        
        const messagePara = document.createElement('p');
        messagePara.textContent = text;
        
        messageDiv.appendChild(messagePara);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Process user message and generate response
    function processMessage(message) {
        // Convert message to lowercase for easier matching
        const lowerMessage = message.toLowerCase();
        
        // Check for location/ward mentions
        let foundProjects = [];
        let response = '';
        
        // Search for ward mentions
        const wardMatch = lowerMessage.match(/ward\s+(\d+|[a-z]+)/i);
        if (wardMatch) {
            const wardSearch = wardMatch[0].toLowerCase();
            
            // Search all project categories for matching ward
            governmentSpendingData.roadProjects.forEach(project => {
                if (project.ward.toLowerCase().includes(wardSearch)) {
                    foundProjects.push(project);
                }
            });
            
            governmentSpendingData.parkProjects.forEach(project => {
                if (project.ward.toLowerCase().includes(wardSearch)) {
                    foundProjects.push(project);
                }
            });
            
            governmentSpendingData.educationProjects.forEach(project => {
                if (project.ward.toLowerCase().includes(wardSearch)) {
                    foundProjects.push(project);
                }
            });
            
            governmentSpendingData.healthcareProjects.forEach(project => {
                if (project.ward.toLowerCase().includes(wardSearch)) {
                    foundProjects.push(project);
                }
            });
        } else {
            // Search for general area mentions
            ['central', 'north', 'south', 'east', 'west'].forEach(area => {
                if (lowerMessage.includes(area)) {
                    // Search all project categories for matching area
                    governmentSpendingData.roadProjects.forEach(project => {
                        if (project.ward.toLowerCase().includes(area)) {
                            foundProjects.push(project);
                        }
                    });
                    
                    governmentSpendingData.parkProjects.forEach(project => {
                        if (project.ward.toLowerCase().includes(area)) {
                            foundProjects.push(project);
                        }
                    });
                    
                    governmentSpendingData.educationProjects.forEach(project => {
                        if (project.ward.toLowerCase().includes(area)) {
                            foundProjects.push(project);
                        }
                    });
                    
                    governmentSpendingData.healthcareProjects.forEach(project => {
                        if (project.ward.toLowerCase().includes(area)) {
                            foundProjects.push(project);
                        }
                    });
                }
            });
        }
        
        // Generate response based on found projects
        if (foundProjects.length > 0) {
            response = I found ${foundProjects.length} projects in that area:\n\n;
            
            // List up to 3 projects
            const projectsToShow = foundProjects.slice(0, 3);
            projectsToShow.forEach(project => {
                response += - ${project.name} (${capitalizeFirstLetter(project.status)})\n;
                
                // Find the marker for this project and open its popup
                allMarkers.forEach(marker => {
                    if (marker.options.projectId === project.id) {
                        map.setView([project.location.lat, project.location.lng], 14);
                        marker.openPopup();
                    }
                });
            });
            
            if (foundProjects.length > 3) {
                response += \nAnd ${foundProjects.length - 3} more. You can use the filters to explore them all.;
            }
        } else {
            response = "I couldn't find any projects in that location. Please try another area or ward name, such as 'Ward 5' or 'Central Delhi'.";
        }
        
        // Add bot response after a short delay to simulate thinking
        setTimeout(() => {
            addMessage(response, 'bot');
        }, 600);
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initApp();
    initChatbot();
});