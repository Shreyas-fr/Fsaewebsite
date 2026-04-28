const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3005;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads dir exists safely
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure Multer for PDF resumes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir)
  },
  filename: function (req, file, cb) {
    const safeName = req.body.name ? req.body.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'applicant';
    cb(null, `${safeName}_${Date.now()}${path.extname(file.originalname)}`)
  }
});
const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF format is allowed for resumes!'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB strict limit
});

// Smooth Rate Limiting for heavy file uploads
const applyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 3, 
  message: { error: 'Too many applications submitted. Please try again later.' }
});

const applications = [];
const sponsors = [];

app.post('/api/sponsor', applyLimiter, (req, res) => {
  const { company, email, message } = req.body;
  
  if (!company || !email || !message) {
    return res.status(400).json({ error: 'All fields are strictly required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const newSponsor = {
    id: Date.now().toString(),
    company,
    email,
    message,
    timestamp: new Date().toISOString()
  };

  sponsors.push(newSponsor);
  console.log(`🤝 New Sponsor Inquiry: \x1b[36m${company}\x1b[0m! (Email: ${email})`);

  setTimeout(() => {
    res.status(200).json({ success: true, message: 'Inquiry securely saved.' });
  }, 1500);
});

app.post('/api/apply', applyLimiter, upload.single('resume'), (req, res) => {
  const { name, email, subTeam, message } = req.body;
  const file = req.file;
  
  if (!name || !email || !subTeam || !message || !file) {
    return res.status(400).json({ error: 'All fields and a resume PDF are strictly required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const newApp = {
    id: Date.now().toString(),
    name,
    email,
    subTeam,
    message,
    resumePath: file.path,
    timestamp: new Date().toISOString()
  };

  applications.push(newApp);
  console.log(`🏁 New Application: ${name} applied for \x1b[36m${subTeam}\x1b[0m! (Resume saved to ${file.filename})`);

  setTimeout(() => {
    res.status(200).json({ success: true, message: 'Application securely saved.' });
  }, 1500);
});

// Fallback error handler for multer specifically
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`🏎️ FSAE Backend running incredibly smoothly on http://localhost:${PORT}`);
});
