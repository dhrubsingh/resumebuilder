// server.js
import express from 'express';
import cors from 'cors';
import { exec, execSync } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Set TeX environment variables
process.env.TEXMFHOME = '/opt/render/project/texmf';
process.env.PATH = `/opt/render/project/texlive/bin/x86_64-linux:${process.env.PATH}`;

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
const pdflatexPath = '/opt/render/project/texlive/bin/x86_64-linux/pdflatex';
console.log('Using pdflatex at:', pdflatexPath);

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Resume Builder API is running' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

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
    // Create working directory
    await fs.mkdir(workDir, { recursive: true });
    const texFile = path.join(workDir, 'resume.tex');
    await fs.writeFile(texFile, latex);

    console.log('Working directory:', workDir);
    console.log('TeX file path:', texFile);
    console.log('Using pdflatex path:', pdflatexPath);

    // Run pdflatex twice to resolve references
    for (let i = 0; i < 2; i++) {
      await new Promise((resolve, reject) => {
        const env = {
          ...process.env,
          TEXMFHOME: '/opt/render/project/texmf',
          PATH: `/opt/render/project/texlive/bin/x86_64-linux:${process.env.PATH}`
        };

        exec(
          `${pdflatexPath} -interaction=nonstopmode -output-directory=${workDir} ${texFile}`,
          { env },
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
    }

    // Check if PDF was generated
    const pdfPath = path.join(workDir, 'resume.pdf');
    try {
      await fs.access(pdfPath);
    } catch (error) {
      throw new Error('PDF file was not generated');
    }

    // Read and send the PDF
    const pdfContent = await fs.readFile(pdfPath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    res.send(pdfContent);

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'PDF generation failed', 
      details: error.message,
      workDir: workDir // Include work directory for debugging
    });

    // For debugging - try to read the log file if it exists
    try {
      const logFile = path.join(workDir, 'resume.log');
      const logContent = await fs.readFile(logFile, 'utf8');
      console.error('LaTeX log file contents:', logContent);
    } catch (logError) {
      console.error('Could not read log file:', logError);
    }

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