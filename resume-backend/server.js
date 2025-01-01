// server.js
import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type'],
}));
app.use(bodyParser.json());

// Update the temp directory creation
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tempDir = path.join(__dirname, 'temp');
await fs.mkdir(tempDir, { recursive: true, mode: 0o755 });
// Helper function to clean up temp files
async function cleanupTempFiles(directory) {
  try {
    await fs.rm(directory, { recursive: true, force: true });
  } catch (error) {
    console.error('Cleanup error:', error);
  }
}

app.post('/compile', async (req, res) => {
  const { latex } = req.body;
  const timestamp = Date.now();
  const workDir = path.join(tempDir, `${timestamp}`);

  try {
    // Create working directory
    await fs.mkdir(workDir, { recursive: true });

    // Write LaTeX content to file
    const texFile = path.join(workDir, 'resume.tex');
    await fs.writeFile(texFile, latex);

    // After writing the file
    console.log('LaTeX content:', latex);
    console.log('File path:', texFile);
    await fs.readFile(texFile, 'utf8').then(content => console.log('File content:', content));

    // Compile LaTeX to PDF
    await new Promise((resolve, reject) => {
        const pdflatexPath = '/Library/TeX/texbin/pdflatex';
        const process = exec(
          `${pdflatexPath} -interaction=nonstopmode -output-directory=${workDir} ${texFile}`,
          (error, stdout, stderr) => {
            if (error) {
              console.error('LaTeX compilation error:', error);
              console.error('stdout:', stdout);
              console.error('stderr:', stderr);
              reject(new Error(`PDF compilation failed: ${stdout}`));
              return;
            }
            resolve();
          }
        );
      });

    // Read the generated PDF
    const pdfPath = path.join(workDir, 'resume.pdf');
    const pdfContent = await fs.readFile(pdfPath);

    // Send PDF back to client
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
    await cleanupTempFiles(workDir);
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something broke!',
    details: err.message 
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});