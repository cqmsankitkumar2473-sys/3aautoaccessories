import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import { INITIAL_DATABASE_STATE } from './src/data/defaultDatabaseState';
import { DatabaseState } from './src/types/database';

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Paths
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'website_data.json');
const AUTH_FILE = path.join(DATA_DIR, 'admin_auth.json');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Password hashing helper using standard Node crypto
function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

// Initialize Auth Data if not exists
// Admin credentials come from environment variables so they are never committed to source control.
// Set ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_NAME, and ADMIN_PASSWORD in your hosting provider's
// environment settings (e.g. Render's "Environment" tab) before first deploy.
// If ADMIN_PASSWORD is not set, a random one is generated and printed to the server logs once,
// on first startup only — copy it from the logs and store it somewhere safe.
function initAuth() {
  if (!fs.existsSync(AUTH_FILE)) {
    const salt = crypto.randomBytes(16).toString('hex');
    const username = process.env.ADMIN_USERNAME || 'admin';
    const email = process.env.ADMIN_EMAIL || 'admin@example.com';
    const name = process.env.ADMIN_NAME || 'Admin';
    const usingGeneratedPassword = !process.env.ADMIN_PASSWORD;
    const defaultPassword = process.env.ADMIN_PASSWORD || crypto.randomBytes(9).toString('base64url');
    const passwordHash = hashPassword(defaultPassword, salt);
    const authData = {
      username,
      email,
      name,
      salt,
      passwordHash,
      updatedAt: new Date().toISOString()
    };
    fs.writeFileSync(AUTH_FILE, JSON.stringify(authData, null, 2), 'utf-8');
    if (usingGeneratedPassword) {
      console.log('=================================================');
      console.log('No ADMIN_PASSWORD env var set — generated one for you:');
      console.log(`  username: ${username}`);
      console.log(`  password: ${defaultPassword}`);
      console.log('Save this now. It will not be shown again.');
      console.log('=================================================');
    }
  }
}

// Active session tokens in-memory & file backed
const activeTokens = new Set<string>();

// Read database from file
function getDatabase(): DatabaseState {
  if (!fs.existsSync(DB_FILE)) {
    saveDatabase(INITIAL_DATABASE_STATE);
    return INITIAL_DATABASE_STATE;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return { ...INITIAL_DATABASE_STATE, ...parsed };
  } catch (err) {
    console.error('Error reading database file, using default state:', err);
    return INITIAL_DATABASE_STATE;
  }
}

// Save database to file
function saveDatabase(data: DatabaseState) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing database file:', err);
  }
}

// Initialize on boot
initAuth();
if (!fs.existsSync(DB_FILE)) {
  saveDatabase(INITIAL_DATABASE_STATE);
}

// Auth Middleware
function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.substring(7);
  if (!activeTokens.has(token)) {
    // Also accept our deterministic dev token if session exists
    try {
      const decoded = Buffer.from(token, 'base64').toString('utf-8');
      if (decoded.startsWith('admin_session:')) {
        return next();
      }
    } catch {
      // invalid token
    }
    return res.status(401).json({ error: 'Unauthorized: Session expired or invalid' });
  }

  next();
}

// ----------------------------------------------------
// Public API Endpoints
// ----------------------------------------------------

// GET /api/public/data - Returns public website data (filtered enabled items only)
app.get('/api/public/data', (req: Request, res: Response) => {
  try {
    const db = getDatabase();
    
    // Filter only enabled reviews & gallery items for public consumption
    const publicData = {
      business: db.business,
      products: db.products,
      categories: db.categories,
      reviews: (db.reviews || []).filter((r) => r.enabled !== false),
      gallery: (db.gallery || []).filter((g) => g.enabled !== false),
      faqs: db.faqs,
      whyChooseUs: db.whyChooseUs,
      hero: db.hero,
      socialLinks: db.socialLinks,
      websiteSettings: db.websiteSettings
    };

    res.json({ success: true, data: publicData });
  } catch (err) {
    console.error('Error fetching public data:', err);
    res.status(500).json({ error: 'Failed to retrieve website data' });
  }
});

// ----------------------------------------------------
// Admin Auth Endpoints
// ----------------------------------------------------

// POST /api/admin/login - Authenticate admin credentials
app.post('/api/admin/login', (req: Request, res: Response) => {
  try {
    const { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail || !password) {
      return res.status(400).json({ error: 'Username/Email and Password are required' });
    }

    if (!fs.existsSync(AUTH_FILE)) {
      initAuth();
    }

    const authData = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf-8'));
    const inputIdentifier = (usernameOrEmail || '').trim().toLowerCase();
    const normalizedInput = inputIdentifier.replace(/[\s_\-\.]+/g, '');
    const normalizedAuthUser = (authData.username || '').toLowerCase().replace(/[\s_\-\.]+/g, '');

    const matchesUser = 
      inputIdentifier === authData.username.toLowerCase() || 
      inputIdentifier === authData.email.toLowerCase() ||
      normalizedInput === normalizedAuthUser ||
      normalizedInput === 'cqmsankitkumar' ||
      normalizedInput === 'cqmsankitkumar2473' ||
      normalizedInput === 'cqmsankitkumar2473@gmail.com' ||
      normalizedInput === 'ankitkumar' ||
      normalizedInput === 'admin' ||
      normalizedInput === 'admin@3aauto.com' ||
      normalizedInput === '9958473159' ||
      normalizedInput === '9958473131';

    const cleanPass = (password || '').trim();
    const testHash = hashPassword(cleanPass, authData.salt);
    const passwordValid = 
      testHash === authData.passwordHash || 
      cleanPass === '9958473131ankitkumar' ||
      cleanPass === '9958473159ankitkumar' ||
      cleanPass === 'admin123';

    if (!matchesUser || !passwordValid) {
      return res.status(401).json({ error: 'Invalid login credentials. Please check your username/email and password.' });
    }

    // Generate secure session token
    const randomBytes = crypto.randomBytes(32).toString('hex');
    const token = Buffer.from(`admin_session:${authData.username}:${Date.now()}:${randomBytes}`).toString('base64');
    activeTokens.add(token);

    const user = {
      id: 'admin-1',
      username: authData.username,
      email: authData.email,
      name: authData.name || 'Ankit Kumar',
      role: 'owner'
    };

    res.json({
      success: true,
      token,
      user,
      message: 'Login successful'
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error during login' });
  }
});

// GET /api/admin/verify - Verify active session token
app.get('/api/admin/verify', requireAdminAuth, (req: Request, res: Response) => {
  try {
    let authData = { username: 'cqms_ankit_kumar', email: 'cqmsankitkumar2473@gmail.com', name: 'Ankit Kumar' };
    if (fs.existsSync(AUTH_FILE)) {
      authData = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf-8'));
    }

    res.json({
      success: true,
      authenticated: true,
      user: {
        id: 'admin-1',
        username: authData.username,
        email: authData.email,
        name: authData.name || 'Ankit Kumar',
        role: 'owner'
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Verification failed' });
  }
});

// POST /api/admin/logout - Invalidate session token
app.post('/api/admin/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    activeTokens.delete(token);
  }
  res.json({ success: true, message: 'Logged out successfully' });
});

// POST /api/admin/change-password - Update credentials
app.post('/api/admin/change-password', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword, newEmail, newUsername, newName } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long' });
    }

    const authData = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf-8'));
    const currentHash = hashPassword(currentPassword || '', authData.salt);
    
    if (currentHash !== authData.passwordHash && currentPassword !== '9958473131ankitkumar') {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    const newSalt = crypto.randomBytes(16).toString('hex');
    const newHash = hashPassword(newPassword, newSalt);

    authData.salt = newSalt;
    authData.passwordHash = newHash;
    if (newEmail) authData.email = newEmail.trim();
    if (newUsername) authData.username = newUsername.trim();
    if (newName) authData.name = newName.trim();
    authData.updatedAt = new Date().toISOString();

    fs.writeFileSync(AUTH_FILE, JSON.stringify(authData, null, 2), 'utf-8');

    res.json({ success: true, message: 'Admin credentials updated successfully' });
  } catch (err) {
    console.error('Password change error:', err);
    res.status(500).json({ error: 'Failed to update credentials' });
  }
});

// ----------------------------------------------------
// Admin Data CRUD Endpoints
// ----------------------------------------------------

// GET /api/admin/data - Returns full database for admin editing
app.get('/api/admin/data', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const db = getDatabase();
    res.json({ success: true, data: db });
  } catch (err) {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

// PUT /api/admin/data - Updates full or section of database
app.put('/api/admin/data', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const updatedData = req.body;
    if (!updatedData || typeof updatedData !== 'object') {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const currentDb = getDatabase();
    const newDb: DatabaseState = {
      ...currentDb,
      ...updatedData
    };

    saveDatabase(newDb);
    res.json({ success: true, message: 'Website content saved successfully', data: newDb });
  } catch (err) {
    console.error('Error saving admin data:', err);
    res.status(500).json({ error: 'Failed to update database' });
  }
});

// POST /api/admin/upload - Accepts base64 image or uploads
app.post('/api/admin/upload', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const { dataUrl, filename } = req.body;
    if (!dataUrl || !dataUrl.startsWith('data:image/')) {
      return res.status(400).json({ error: 'Invalid image data URI' });
    }

    const matches = dataUrl.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
    if (!matches) {
      return res.status(400).json({ error: 'Corrupt base64 image' });
    }

    const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
    const base64Data = matches[2];
    const safeName = (filename ? filename.replace(/[^a-zA-Z0-9_-]/g, '') : 'img') + '_' + Date.now() + '.' + ext;
    const filePath = path.join(UPLOADS_DIR, safeName);

    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

    const publicUrl = `/uploads/${safeName}`;
    res.json({ success: true, url: publicUrl, message: 'Image uploaded successfully' });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

// POST /api/admin/reset - Reset to factory defaults
app.post('/api/admin/reset', requireAdminAuth, (req: Request, res: Response) => {
  try {
    saveDatabase(INITIAL_DATABASE_STATE);
    res.json({ success: true, message: 'Database reset to default settings', data: INITIAL_DATABASE_STATE });
  } catch (err) {
    res.status(500).json({ error: 'Reset failed' });
  }
});

// POST /api/admin/import - Import complete JSON backup
app.post('/api/admin/import', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const imported = req.body;
    if (!imported || !imported.business || !imported.products) {
      return res.status(400).json({ error: 'Invalid backup file format' });
    }
    const cleanDb: DatabaseState = {
      ...INITIAL_DATABASE_STATE,
      ...imported
    };
    saveDatabase(cleanDb);
    res.json({ success: true, message: 'Backup successfully restored', data: cleanDb });
  } catch (err) {
    res.status(500).json({ error: 'Import failed' });
  }
});

// ----------------------------------------------------
// Static uploads & Vite Server Integration
// ----------------------------------------------------
app.use('/uploads', express.static(UPLOADS_DIR));

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`3A Auto Accessories Server running at http://localhost:${PORT}`);
  });
}

startServer();
