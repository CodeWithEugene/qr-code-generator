# QR Code Generator

A modern, feature-rich QR code generator application built with React, TypeScript, and Vite. This application provides a sleek, minimalist interface with glassmorphism design elements and advanced customization options for creating professional QR codes.

## ✨ Features

### 🎨 Advanced Customization
- **Multiple QR Code Types**: URL, Text, WiFi, Email, SMS, and Phone numbers
- **Visual Styles**: Choose from squares, rounded corners, or dots
- **Frame Options**: None, box, corners, scan-me bubble, or dots frame
- **Color Customization**: Full control over foreground and background colors
- **Logo Integration**: Upload and embed custom logos in your QR codes
- **Error Correction Levels**: L, M, Q, H levels for different use cases

### 🤖 AI-Powered Content Generation
- **Smart Content Creation**: Describe what you want in natural language
- **Gemini AI Integration**: Powered by Google's Gemini AI for intelligent content suggestions
- **Automatic Format Detection**: AI understands context and generates appropriate QR code content

### 📱 Modern User Interface
- **Glassmorphism Design**: Beautiful glass-like cards with backdrop blur effects
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **Dark Theme**: Eye-friendly dark interface with gradient accents
- **Intuitive Navigation**: Clean sidebar navigation with dashboard, analytics, settings, and help sections

### 📊 Export Options
- **Multiple Formats**: Download as PNG or SVG
- **High Quality**: Vector SVG for scalable graphics, high-resolution PNG for print
- **Instant Preview**: Real-time preview of your QR code as you customize

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Google Gemini API key (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/qr-code-generator.git
   cd qr-code-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to see the application.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.1.1
- **Language**: TypeScript 5.8.2
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS with custom glassmorphism components
- **QR Code Generation**: qrcode.react 4.2.0
- **AI Integration**: Google Gemini AI (@google/genai 1.21.0)
- **Icons**: Lucide React 0.544.0
- **Font**: Inter (Google Fonts)

## 📁 Project Structure

```
qr-code-generator/
├── components/           # React components
│   ├── AnalyticsPlaceholder.tsx
│   ├── GlassCard.tsx
│   ├── Header.tsx
│   ├── HelpPlaceholder.tsx
│   ├── QrCustomizer.tsx
│   ├── QrPreview.tsx
│   └── Sidebar.tsx
├── services/            # External service integrations
│   └── geminiService.ts
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
├── types.ts            # TypeScript type definitions
├── metadata.json       # Application metadata
├── package.json        # Dependencies and scripts
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── index.html          # HTML template
```

## 🎯 Usage

### Creating QR Codes

1. **Choose Content Type**: Select from URL, Text, WiFi, or Email
2. **Enter Content**: Input your data or use the AI assistant
3. **Customize Appearance**: 
   - Adjust colors and gradients
   - Select module style (squares, rounded, dots)
   - Choose frame style
   - Upload a logo
   - Set error correction level
4. **Preview**: See your QR code update in real-time
5. **Download**: Export as PNG or SVG

### AI Assistant

The AI assistant can help you generate QR code content using natural language:

- **WiFi QR Code**: "Create a WiFi QR code for my network 'CoffeeShop' with password 'welcome123'"
- **Email QR Code**: "Generate an email QR code to contact@mycompany.com"
- **URL QR Code**: "Make a QR code for my website google.com"
- **Text QR Code**: "Create a QR code with the text 'Welcome to our store'"

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key for AI features | Yes (for AI features) |

### Customization

The application uses Tailwind CSS with custom configuration. You can modify:
- Color schemes in `index.html` (Tailwind config)
- Component styles in individual `.tsx` files
- Glassmorphism effects in `GlassCard.tsx`

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful component and variable names
- Maintain the glassmorphism design aesthetic
- Add proper error handling for API calls
- Test on multiple screen sizes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [qrcode.react](https://github.com/zpao/qrcode.react) for QR code generation
- [Google Gemini AI](https://ai.google.dev/) for intelligent content suggestions
- [Lucide React](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

## 📞 Support

For support, email support@codewitheugene.top or create an issue in this repository.

---

**Made with ❤️ by [Eugenius](https://codewitheugene.top/)**
