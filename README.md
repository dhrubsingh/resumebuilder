# Resume Builder

A modern, React-based resume builder with LaTeX PDF generation capabilities. Create professional, ATS-friendly resumes with a user-friendly interface.

Live demo: [https://resumebuilder-ashen.vercel.app/](https://resumebuilder-ashen.vercel.app/)

## Features

- 📝 Interactive form-based resume creation
- 👀 Real-time preview
- 📄 LaTeX PDF generation
- 🎨 Clean, modern UI using Tailwind CSS and shadcn/ui
- 📱 Responsive design
- 🤖 ATS-friendly output

## Project Structure

The project consists of two main parts:

- `resume-builder/`: Frontend React application
- `resume-backend/`: Backend Node.js server for LaTeX compilation

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- LaTeX installation (for local development of the backend)

## Setup & Installation

### Frontend Setup

1. Clone the repository:
```bash
git clone https://github.com/dhrubsingh/resumebuilder.git
cd resumebuilder
```

2. Install frontend dependencies:
```bash
cd resume-builder
npm install
```

3. Create a `.env` file in the resume-builder directory:
```bash
VITE_API_URL=http://localhost:3000  # for local development
```

4. Start the development server:
```bash
npm run dev
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd resume-backend
```

2. Install backend dependencies:
```bash
npm install
```

3. Create a `.env` file in the resume-backend directory:
```bash
PORT=3000
```

4. Install LaTeX (if not already installed):
- For macOS: `brew install mactex`
- For Ubuntu: `sudo apt-get install texlive-full`
- For Windows: Install MiKTeX

5. Start the backend server:
```bash
npm start
```

## Development

The frontend runs on Vite and uses:
- React for UI
- Tailwind CSS for styling
- shadcn/ui for UI components
- React Hooks for state management

Key frontend files:
- `/resume-builder/src/components/ResumeBuilder.jsx`: Main component
- `/resume-builder/src/components/forms/`: Form components for each section
- `/resume-builder/src/components/previews/`: Preview components

The backend uses:
- Express.js for the server
- child_process for LaTeX compilation
- cors for cross-origin requests

## Building for Production

### Frontend
```bash
cd resume-builder
npm run build
```

### Backend
```bash
cd resume-backend
npm run build
```

## Deployment

The project is set up for deployment on:
- Frontend: Vercel
- Backend: Render

### Vercel Deployment
1. Push your code to GitHub
2. Import the project in Vercel
3. Set the following:
   - Framework Preset: Vite
   - Root Directory: resume-builder
   - Build Command: npm run build
   - Output Directory: dist

### Render Deployment (Backend)
1. Create a new Web Service in Render
2. Connect your GitHub repository
3. Set the following:
   - Root Directory: resume-backend
   - Build Command: ./setup-latex.sh && npm install
   - Start Command: npm start
4. Add required environment variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Acknowledgments

- LaTeX template based on modern resume templates
- UI components from shadcn/ui
- Icons from Lucide React

## License

MIT License