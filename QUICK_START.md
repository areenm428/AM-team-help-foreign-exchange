# 🚀 Quick Start Guide - AM Team Help Application

Get up and running with the WhatsApp Contact Manager in 5 minutes!

## ⚡ Quick Setup (5 Minutes)

### Step 1: Clone & Navigate
```bash
git clone https://github.com/areenm428/AM-team-help-foreign-exchange.git
cd AM-team-help-foreign-exchange
```

### Step 2: Setup Backend

```bash
# Go to backend folder
cd app-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start server
npm start
```

**Server will run on:** `http://localhost:5000`

### Step 3: Setup Frontend

**Open a new terminal:**

```bash
# Go to frontend folder
cd app-frontend

# Start local server (choose one)

# Option A: Python 3
python -m http.server 8000

# Option B: Node.js
npx http-server

# Option C: Live Server (VS Code extension)
# Right-click index.html > Open with Live Server
```

**Frontend will run on:** `http://localhost:8000`

### Step 4: Open Application

🎉 Visit: **`http://localhost:8000`**

---

## 📱 First Steps

### 1. Add Your First Contact

1. Click **"Add Contact"** from sidebar
2. Fill in the form:
   ```
   Name: Your Name
   Email: your@email.com
   WhatsApp: +91-9876543210 (with country code!)
   Role: Lead
   Team: Comics
   ```
3. Click **"Save Contact"**
4. ✅ Contact appears in "All Contacts"

### 2. Send WhatsApp Message

1. Find your contact in "All Contacts"
2. Click **"Chat"** button
3. WhatsApp opens with pre-filled number
4. Send message! 💬

### 3. View All Contacts

1. Go to **"All Contacts"** tab
2. Filter by team (Comics, Case Studies, etc.)
3. Search by name or email
4. Click contact card for details

### 4. Create a Team

1. Click **"Teams"** in sidebar
2. Click **"Add Team"** button
3. Fill in:
   ```
   Team Name: Comics Team
   Component: Comics
   Description: Team for comic creation
   ```
4. Click **"Create Team"**

### 5. Export Contacts

1. Go to **"Export Contacts"** tab
2. Choose format:
   - **CSV** - Download as Excel file
   - **PDF/Text** - Download as text file
   - **WhatsApp Groups** - Generate group links

---

## 🎯 Common Tasks

### Add Multiple Team Members

Repeat Step 1 (Add Contact) for each member:
- Team Lead
- Designer
- Researcher
- Writer

### View Specific Team

1. Go to "All Contacts"
2. Click team filter button (Comics, Case Studies, etc.)
3. See only that team's contacts

### Search for Someone

1. Type name in search box
2. Results appear instantly
3. Click contact to see details

### Get WhatsApp Number

1. Find contact in grid
2. WhatsApp number shown in contact details
3. Click copy button (or use Chat button)

### Delete Old Contact

1. Find contact card
2. Click **"Delete"** button
3. Confirm deletion
4. ✅ Contact removed

---

## 🔧 Troubleshooting

### ❌ Backend won't start

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
cd app-backend
npm install
npm start
```

**Error:** `MongoDB connection failed`

**Solution:**
1. Install MongoDB locally, OR
2. Use MongoDB Atlas (cloud):
   - Go to: https://www.mongodb.com/cloud/atlas
   - Create free account
   - Create cluster
   - Get connection string
   - Update `.env` file:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/am-team-help
     ```

### ❌ Frontend won't load

**Error:** `Cannot GET /`

**Solution:** Make sure you're in `app-frontend` folder and server is running:
```bash
cd app-frontend
python -m http.server 8000
```

### ❌ Can't add contact

**Error:** `Error adding contact`

**Solution:**
1. Check backend is running (see terminal)
2. Fill ALL required fields (marked with *)
3. WhatsApp number must include country code: `+91-9876543210`
4. Check browser console for errors (F12)

### ❌ WhatsApp chat not opening

**Error:** WhatsApp link not working

**Solution:**
- Phone number must have country code
- Format: `+{COUNTRY}{NUMBER}`
- Example: `+91-9876543210` (India)
- Make sure WhatsApp is installed on device

---

## 📊 Example Data

### Sample Contact
```json
{
  "name": "Areen Meshram",
  "email": "areen@mbaproject.com",
  "whatsappNumber": "+91-9876543210",
  "phoneNumber": "+91-9876543211",
  "role": "Lead",
  "team": "Comics",
  "status": "Active",
  "notes": "Project manager and team lead"
}
```

### Sample Team
```json
{
  "name": "Comics Team",
  "description": "Responsible for creating forex concept comics",
  "component": "Comics",
  "members": [
    { "name": "Areen Meshram", "role": "Lead" },
    { "name": "Raj Kumar", "role": "Designer" }
  ]
}
```

---

## 💡 Pro Tips

### 🎨 Theme Colors
App uses WhatsApp green theme:
- Primary: `#25d366` (WhatsApp green)
- Dark: `#075e54` (Dark teal)
- Accent: `#128c7e` (Light teal)

### ⌨️ Keyboard Shortcuts
- `Ctrl/Cmd + F` - Search contacts
- `Enter` - Submit forms
- `Esc` - Close modals

### 📱 Mobile Friendly
- App works on mobile phones
- Touch-optimized buttons
- Responsive design
- Perfect for on-the-go contact management

### 🔄 Data Persistence
- All data stored in MongoDB
- Changes saved instantly
- Access from any device
- Automatic backups (use export)

---

## 📚 Next Steps

After basic setup:

1. **Add all team members** as contacts
2. **Organize into teams** by component
3. **Create WhatsApp groups** for each team
4. **Export contacts** for backup
5. **Start collaborating!** 🚀

---

## 🆘 Need Help?

### Check Documentation
- Full guide: [APP_README.md](./APP_README.md)
- Project info: [README.md](./README.md)
- Contributing: [CONTRIBUTING.md](./CONTRIBUTING.md)

### Common Questions

**Q: Where is my data stored?**
A: In MongoDB database (local or cloud)

**Q: Can I use on mobile?**
A: Yes! App is mobile responsive

**Q: How do I backup contacts?**
A: Use Export feature → Download CSV

**Q: Can I add photos to contacts?**
A: Not in v1.0, coming in future updates

**Q: How many contacts can I store?**
A: Unlimited (with MongoDB)

**Q: Is my data secure?**
A: Yes, for team use. Add authentication for production

---

## 🎯 Your Team Setup

### Recommended Structure
```
Comics Team (5 members)
├── Team Lead (Areen)
├── Designer 1
├── Designer 2
├── Designer 3
└── Writer

Case Studies Team (3 members)
├── Researcher 1
├── Researcher 2
└── Writer

Research Team (4 members)
├── Lead Researcher
├── Data Analyst
├── Writer 1
└── Writer 2

Presentation Team (2 members)
├── Designer
└── Presenter
```

---

## ✅ Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 8000
- [ ] App opens in browser
- [ ] Can add first contact
- [ ] WhatsApp chat works
- [ ] Can view all contacts
- [ ] Can filter by team
- [ ] Can export contacts
- [ ] All team members added
- [ ] Ready to collaborate! 🎉

---

## 🚀 Ready to Launch!

You're all set! Start managing your team's WhatsApp contacts and collaborate on the Foreign Exchange MBA project!

**Questions?** Check the full [APP_README.md](./APP_README.md)

**Issues?** Create a GitHub issue or contact the team lead

Happy collaborating! 🎯📱💬

---

**Last Updated:** 2026-08-28  
**Version:** 1.0.0  
**Status:** Ready for Production
