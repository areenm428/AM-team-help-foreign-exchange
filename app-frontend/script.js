const API_BASE_URL = 'http://localhost:5000/api';
let currentFilter = 'all';
let allContacts = [];
let allTeams = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadContacts();
    loadTeams();
});

function setupEventListeners() {
    // Tab Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const tab = item.dataset.tab;
            switchTab(tab);
        });
    });

    // Search
    document.getElementById('searchInput').addEventListener('input', (e) => {
        searchContacts(e.target.value);
    });

    // Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            filterContacts();
        });
    });

    // Add Contact Form
    document.getElementById('addContactForm').addEventListener('submit', addContact);

    // Add Team Button
    document.getElementById('addTeamBtn').addEventListener('click', () => {
        document.getElementById('teamModal').classList.add('show');
    });

    // Add Team Form
    document.getElementById('addTeamForm').addEventListener('submit', addTeam);

    // Export Buttons
    document.getElementById('exportCSV').addEventListener('click', exportToCSV);
    document.getElementById('exportPDF').addEventListener('click', exportToPDF);
    document.getElementById('generateGroups').addEventListener('click', generateWhatsAppGroups);

    // Modal Close
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            e.target.closest('.modal').classList.remove('show');
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
        }
    });
}

// Tab Switching
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Load Contacts
async function loadContacts() {
    try {
        const response = await fetch(`${API_BASE_URL}/contacts`);
        allContacts = await response.json();
        displayContacts(allContacts);
    } catch (error) {
        console.error('Error loading contacts:', error);
        showToast('Error loading contacts', 'error');
    }
}

// Display Contacts
function displayContacts(contacts) {
    const contactsList = document.getElementById('contactsList');
    contactsList.innerHTML = '';

    if (contacts.length === 0) {
        contactsList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999; padding: 2rem;">No contacts found</p>';
        return;
    }

    contacts.forEach(contact => {
        const card = createContactCard(contact);
        contactsList.appendChild(card);
    });
}

// Create Contact Card
function createContactCard(contact) {
    const div = document.createElement('div');
    div.className = 'contact-card';
    div.innerHTML = `
        <div class="contact-header">
            <div class="contact-avatar">${contact.name.charAt(0).toUpperCase()}</div>
            <div class="contact-info">
                <p class="contact-name">${contact.name}</p>
                <p class="contact-role">${contact.role}</p>
            </div>
        </div>
        <span class="team-badge">${contact.team}</span>
        <div class="contact-details">
            <p><i class="fas fa-envelope"></i> ${contact.email}</p>
            <p><i class="fab fa-whatsapp"></i> ${contact.whatsappNumber}</p>
            ${contact.phoneNumber ? `<p><i class="fas fa-phone"></i> ${contact.phoneNumber}</p>` : ''}
            ${contact.notes ? `<p><i class="fas fa-note"></i> ${contact.notes}</p>` : ''}
        </div>
        <div class="contact-actions">
            <a href="https://wa.me/${contact.whatsappNumber.replace(/[^0-9]/g, '')}" target="_blank" class="whatsapp-btn">
                <i class="fab fa-whatsapp"></i> Chat
            </a>
            <button class="edit-btn" onclick="editContact('${contact._id}')">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="delete-btn" onclick="deleteContact('${contact._id}')">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `;
    return div;
}

// Search Contacts
function searchContacts(query) {
    const filtered = allContacts.filter(contact => 
        contact.name.toLowerCase().includes(query.toLowerCase()) ||
        contact.email.toLowerCase().includes(query.toLowerCase()) ||
        contact.whatsappNumber.includes(query)
    );
    displayContacts(filtered);
}

// Filter Contacts
function filterContacts() {
    if (currentFilter === 'all') {
        displayContacts(allContacts);
    } else {
        const filtered = allContacts.filter(contact => contact.team === currentFilter);
        displayContacts(filtered);
    }
}

// Add Contact
async function addContact(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        whatsappNumber: document.getElementById('whatsappNumber').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        role: document.getElementById('role').value,
        team: document.getElementById('team').value,
        status: 'Active',
        notes: document.getElementById('notes').value
    };

    try {
        const response = await fetch(`${API_BASE_URL}/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            showToast('Contact added successfully!');
            document.getElementById('addContactForm').reset();
            loadContacts();
        } else {
            showToast('Error adding contact', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error adding contact', 'error');
    }
}

// Delete Contact
async function deleteContact(id) {
    if (confirm('Are you sure you want to delete this contact?')) {
        try {
            const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                showToast('Contact deleted successfully!');
                loadContacts();
            } else {
                showToast('Error deleting contact', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('Error deleting contact', 'error');
        }
    }
}

// Edit Contact
async function editContact(id) {
    const contact = allContacts.find(c => c._id === id);
    if (!contact) return;

    const newName = prompt('Name:', contact.name);
    if (!newName) return;

    const newWhatsapp = prompt('WhatsApp Number:', contact.whatsappNumber);
    if (!newWhatsapp) return;

    try {
        const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newName,
                whatsappNumber: newWhatsapp
            })
        });

        if (response.ok) {
            showToast('Contact updated successfully!');
            loadContacts();
        } else {
            showToast('Error updating contact', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error updating contact', 'error');
    }
}

// Load Teams
async function loadTeams() {
    try {
        const response = await fetch(`${API_BASE_URL}/teams`);
        allTeams = await response.json();
        displayTeams(allTeams);
    } catch (error) {
        console.error('Error loading teams:', error);
    }
}

// Display Teams
function displayTeams(teams) {
    const teamsList = document.getElementById('teamsList');
    teamsList.innerHTML = '';

    teams.forEach(team => {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.innerHTML = `
            <h3>${team.name}</h3>
            <span class="team-badge">${team.component}</span>
            <p>${team.description || 'No description'}</p>
            <div class="team-members">
                <h4>Team Members (${team.members ? team.members.length : 0})</h4>
                <ul class="member-list">
                    ${team.members && team.members.length > 0 
                        ? team.members.map(m => `<li>${m.name} - ${m.role}</li>`).join('')
                        : '<li>No members yet</li>'}
                </ul>
            </div>
        `;
        teamsList.appendChild(card);
    });
}

// Add Team
async function addTeam(e) {
    e.preventDefault();

    const teamData = {
        name: document.getElementById('teamName').value,
        component: document.getElementById('teamComponent').value,
        description: document.getElementById('teamDescription').value
    };

    try {
        const response = await fetch(`${API_BASE_URL}/teams`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(teamData)
        });

        if (response.ok) {
            showToast('Team created successfully!');
            document.getElementById('addTeamForm').reset();
            document.getElementById('teamModal').classList.remove('show');
            loadTeams();
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error creating team', 'error');
    }
}

// Export to CSV
function exportToCSV() {
    let csv = 'Name,Email,WhatsApp,Phone,Role,Team,Notes\n';
    allContacts.forEach(contact => {
        csv += `"${contact.name}","${contact.email}","${contact.whatsappNumber}","${contact.phoneNumber || ''}","${contact.role}","${contact.team}","${contact.notes || ''}"
`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'am-team-contacts.csv';
    a.click();
    showToast('Contacts exported as CSV!');
}

// Export to PDF
function exportToPDF() {
    let pdfContent = 'AM TEAM HELP - FOREIGN EXCHANGE PROJECT\n';
    pdfContent += 'Contact Directory\n';
    pdfContent += '=====================================\n\n';

    allContacts.forEach((contact, index) => {
        pdfContent += `${index + 1}. ${contact.name}\n`;
        pdfContent += `   Email: ${contact.email}\n`;
        pdfContent += `   WhatsApp: ${contact.whatsappNumber}\n`;
        pdfContent += `   Role: ${contact.role}\n`;
        pdfContent += `   Team: ${contact.team}\n`;
        if (contact.notes) pdfContent += `   Notes: ${contact.notes}\n`;
        pdfContent += '\n';
    });

    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'am-team-contacts.txt';
    a.click();
    showToast('Contacts exported as text file!');
}

// Generate WhatsApp Groups
function generateWhatsAppGroups() {
    const groups = {};
    allContacts.forEach(contact => {
        if (!groups[contact.team]) {
            groups[contact.team] = [];
        }
        groups[contact.team].push(contact.whatsappNumber.replace(/[^0-9]/g, ''));
    });

    let message = 'WhatsApp Group Links:\n\n';
    Object.keys(groups).forEach(team => {
        message += `${team}:\n`;
        message += `https://wa.me/?text=Hello%20from%20${team}%20team\n\n`;
    });

    alert(message);
    showToast('WhatsApp group links generated!');
}

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Close Team Modal
function closeTeamModal() {
    document.getElementById('teamModal').classList.remove('show');
}