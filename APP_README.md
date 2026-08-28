# AM Team Help - WhatsApp Contact Manager

A comprehensive team collaboration application for the MBA Foreign Exchange project with WhatsApp contact management, team organization, and communication features.

## 🎯 Features

### ✅ Core Features
- **WhatsApp Contact Management** - Store and manage team member WhatsApp numbers
- **Team Organization** - Organize contacts by project components (Comics, Case Studies, Research, Presentation)
- **Contact Directory** - Beautiful contact card interface with quick actions
- **Search & Filter** - Find contacts by name, email, or WhatsApp number
- **Direct WhatsApp Chat** - One-click WhatsApp messaging from the app
- **Export Functionality** - Export contacts as CSV or text file
- **Responsive Design** - Works on desktop, tablet, and mobile devices

### 🚀 Advanced Features
- Team management and grouping
- Contact role assignment (Designer, Researcher, Writer, Lead)
- Contact status tracking (Active/Inactive)
- Add notes to contacts
- Edit and delete contacts
- WhatsApp group link generation
- Toast notifications for user feedback

## 📁 Project Structure

```
AM-team-help-foreign-exchange/
├── app-backend/                 # Node.js/Express Backend
│   ├── server.js               # Express server setup
│   ├── package.json            # Dependencies
│   ├── .env.example            # Environment template
│   ├── models/
│   │   ├── Contact.js          # Contact schema
│   │   └── Team.js             # Team schema
│   └── routes/
│       ├── contacts.js         # Contact API endpoints
│       └── teams.js            # Team API endpoints
│
├── app-frontend/                # HTML/CSS/JavaScript Frontend
│   ├── index.html              # Main application page
│   ├── styles.css              # Styling (WhatsApp green theme)
│   └── script.js               # Client-side logic
│
├── comics/                      # Comic section
├── case-studies/                # Case study analysis
├── research/                    # Research documentation
├── presentation/                # Presentation materials
├── assets/                      # Images, data, references
├── README.md                    # Project overview
├── CONTRIBUTING.md             # Contribution guidelines
└── PROJECT_BOARD.md            # Task tracking
```

## 🔧 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM library
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling (with WhatsApp green theme)
- **Vanilla JavaScript** - Client-side logic
- **Font Awesome** - Icons
- **Fetch API** - HTTP requests

## 📋 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. **Navigate to backend folder:**
```bash
cd app-backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```bash
cp .env.example .env
```

4. **Configure environment variables:**
```
MONGODB_URI=mongodb://localhost:27017/am-team-help
PORT=5000
NODE_ENV=development
```

5. **Start the server:**
```bash
npm start
# Or with auto-reload:
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend folder:**
```bash
cd app-frontend
```

2. **Start a local server:**
```bash
# Using Python 3
python -m http.server 8000

# Or using Node.js
npx http-server
```

3. **Open in browser:**
```
http://localhost:8000
```

## 🎨 Features Walkthrough

### Adding a Contact

1. Click **"Add Contact"** in the sidebar
2. Fill in the form:
   - Name
   - Email
   - WhatsApp Number (with country code)
   - Phone Number (optional)
   - Role (Designer, Researcher, Writer, Lead, Other)
   - Team Component (Comics, Case Studies, Research, Presentation)
   - Notes (optional)
3. Click **"Save Contact"**

### Viewing All Contacts

1. Click **"All Contacts"** in the sidebar
2. Browse contacts in grid view
3. Use filters to show specific teams
4. Search by name, email, or WhatsApp number
5. Click WhatsApp button to open chat
6. Edit or delete contacts as needed

### Managing Teams

1. Click **"Teams"** in the sidebar
2. Click **"Add Team"** to create new team
3. Fill in team details (name, component, description)
4. View team members
5. Teams auto-populate from contacts

### Exporting Contacts

1. Click **"Export Contacts"** in the sidebar
2. Choose export format:
   - **CSV** - For spreadsheets (Excel, Google Sheets)
   - **PDF/Text** - For documents
   - **WhatsApp Groups** - Generate group links

## 📱 WhatsApp Integration

### Direct WhatsApp Chat
Each contact card has a **WhatsApp button** that:
- Opens WhatsApp Web/App
- Starts a direct chat with the contact
- Pre-fills the phone number

**Format:** `https://wa.me/{PHONE_NUMBER}`

### WhatsApp Groups
Generate WhatsApp group invite links for each team:
- Comics Team
- Case Studies Team
- Research Team
- Presentation Team

## 🔌 API Endpoints

### Contacts API

#### GET All Contacts
```bash
GET /api/contacts
```

#### GET Single Contact
```bash
GET /api/contacts/:id
```

#### CREATE Contact
```bash
POST /api/contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "whatsappNumber": "+91-9876543210",
  "phoneNumber": "+91-9876543210",
  "role": "Designer",
  "team": "Comics",
  "status": "Active",
  "notes": "Team lead"
}
```

#### UPDATE Contact
```bash
PUT /api/contacts/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "whatsappNumber": "+91-9876543210"
}
```

#### DELETE Contact
```bash
DELETE /api/contacts/:id
```

#### GET Contacts by Team
```bash
GET /api/contacts/team/:team
```

### Teams API

#### GET All Teams
```bash
GET /api/teams
```

#### GET Single Team
```bash
GET /api/teams/:id
```

#### CREATE Team
```bash
POST /api/teams
Content-Type: application/json

{
  "name": "Comics Team",
  "description": "Comic creation team",
  "leader": "contact_id",
  "members": ["contact_id_1", "contact_id_2"],
  "component": "Comics"
}
```

#### UPDATE Team
```bash
PUT /api/teams/:id
```

#### DELETE Team
```bash
DELETE /api/teams/:id
```

## 🎯 Usage Examples

### Add Team Member WhatsApp Contact
```javascript
const contact = {
  name: "Areen Meshram",
  email: "areen@example.com",
  whatsappNumber: "+91-9876543210",
  role: "Lead",
  team: "Comics",
  notes: "Project manager"
};

fetch('/api/contacts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(contact)
});
```

### Get All Team Members
```javascript
fetch('/api/contacts/team/Comics')
  .then(res => res.json())
  .then(contacts => console.log(contacts));
```

### Export Contacts
```javascript
// CSV Export
function exportCSV() {
  let csv = 'Name,Email,WhatsApp\\n';
  allContacts.forEach(c => {
    csv += `"${c.name}","${c.email}","${c.whatsappNumber}"\\n`;
  });
  // Download csv
}
```

## 🔐 Security Considerations

### Current Implementation
- No authentication (for team use only)
- CORS enabled for localhost
- Input validation on forms

### Future Improvements
- Add user authentication
- Implement JWT tokens
- Add role-based access control
- Encrypt sensitive data
- Add audit logging

## 📊 Database Schema

### Contact Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  whatsappNumber: String (required),
  phoneNumber: String,
  role: String (Designer|Researcher|Writer|Lead|Other),
  team: String (Comics|Case Studies|Research|Presentation|General),
  status: String (Active|Inactive),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Team Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String,
  leader: ObjectId (ref: Contact),
  members: [ObjectId] (ref: Contact),
  component: String (Comics|Case Studies|Research|Presentation),
  createdAt: Date
}
```

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** 
- Make sure MongoDB is running
- Check connection string in `.env`
- Use MongoDB Atlas for cloud database

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Backend CORS is configured for `http://localhost:*`
- Check that frontend and backend URLs match

### WhatsApp Link Not Working
- Ensure phone number includes country code
- Format: `+{COUNTRY_CODE}{PHONE_NUMBER}`
- Example: `+91-9876543210`

## 🚀 Future Enhancements

- [ ] User authentication and authorization
- [ ] Direct messaging within app
- [ ] File sharing (comics, documents)
- [ ] Real-time notifications
- [ ] Contact backup and sync
- [ ] Mobile app (React Native)
- [ ] Video call integration
- [ ] Calendar/meeting scheduler
- [ ] Task assignment system
- [ ] Analytics dashboard

## 📝 Contributing

Please follow the guidelines in [CONTRIBUTING.md](./CONTRIBUTING.md)

1. Create a feature branch
2. Commit your changes
3. Create a pull request
4. Wait for team review

## 📞 Support

### Contact Information
- **Project Lead:** [Add name]
- **Email:** am-team-help@gmail.com
- **WhatsApp Group:** [Add group link]

### Getting Help
1. Check the FAQ below
2. Search existing GitHub issues
3. Create a new issue with detailed information
4. Contact project lead

## ❓ FAQ

**Q: How do I add multiple contacts at once?**
A: Currently you need to add one by one. We're working on bulk import feature.

**Q: Can I use this without MongoDB?**
A: Not currently. The app requires MongoDB. Use MongoDB Atlas (cloud) for free.

**Q: How do I backup my contacts?**
A: Use the Export feature to download as CSV, then store safely.

**Q: Can I send messages directly from the app?**
A: Currently it opens WhatsApp. Native messaging feature coming soon.

**Q: Is this secure for production?**
A: No, this is for team collaboration only. Add authentication before production use.

## 📄 License

This project is part of the AM Team Help MBA Project. All rights reserved.

## 🙏 Acknowledgments

- Built for MBA Foreign Exchange Project
- WhatsApp API integration
- Font Awesome icons
- MongoDB database

---

**Last Updated:** 2026-08-28

**Version:** 1.0.0

**Status:** Active Development

For more information, visit: [GitHub Repository](https://github.com/areenm428/AM-team-help-foreign-exchange)
