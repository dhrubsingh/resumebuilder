// server.js
import express from 'express';
import cors from 'cors';
import { exec, execSync } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tempDir = path.join(__dirname, 'temp');

// Ensure temp directory exists
await fs.mkdir(tempDir, { recursive: true });

// Middleware
app.use(cors({
  origin: '*',  // temporarily allow all origins
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Get pdflatex path
let pdflatexPath;
try {
  pdflatexPath = '/opt/render/project/texlive/bin/x86_64-linux/pdflatex';
  console.log('Using pdflatex at:', pdflatexPath);
} catch (error) {
  console.error('Error finding pdflatex:', error);
  process.exit(1);
}

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Resume Builder API is running' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Test endpoint to check if POST requests work
app.post('/test', (req, res) => {
  res.status(200).json({ message: 'POST request successful' });
});

app.post('/compile', async (req, res) => {
  const { latex } = req.body;
  if (!latex) {
    return res.status(400).json({ error: 'No LaTeX content provided' });
  }

  const timestamp = Date.now();
  const workDir = path.join(tempDir, `${timestamp}`);

  try {
    await fs.mkdir(workDir, { recursive: true });
    const texFile = path.join(workDir, 'resume.tex');
    await fs.writeFile(texFile, latex);

    console.log('Working directory:', workDir);
    console.log('TeX file path:', texFile);
    console.log('Using pdflatex path:', pdflatexPath);

    await new Promise((resolve, reject) => {
      exec(
        `${pdflatexPath} -interaction=nonstopmode -output-directory=${workDir} ${texFile}`,
        (error, stdout, stderr) => {
          if (error) {
            console.error('LaTeX compilation error:', error);
            console.error('stdout:', stdout);
            console.error('stderr:', stderr);
            reject(new Error(`PDF compilation failed: ${stderr || stdout}`));
            return;
          }
          resolve();
        }
      );
    });

    const pdfPath = path.join(workDir, 'resume.pdf');
    const pdfContent = await fs.readFile(pdfPath);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    res.send(pdfContent);

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'PDF generation failed', 
      details: error.message 
    });
  } finally {
    // Clean up temporary files
    try {
      await fs.rm(workDir, { recursive: true, force: true });
    } catch (cleanupError) {
      console.error('Cleanup error:', cleanupError);
    }
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});