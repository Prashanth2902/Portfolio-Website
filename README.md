# Steam-Inspired Developer Portfolio

A modern, interactive developer portfolio website inspired by the Steam gaming platform design. This portfolio showcases projects, skills, and professional experience with a unique gaming-themed aesthetic.

## 🎮 Features

- **Steam-like UI/UX**: Dark theme with signature Steam colors and design patterns
- **Responsive Design**: Fully responsive across all devices
- **Interactive Elements**: Smooth animations and hover effects
- **Project Showcase**: Dynamic project grid with filtering and sorting
- **Profile System**: Detailed developer profile with skills and achievements
- **Contact Form**: Integrated contact system with form validation
- **Community Section**: Testimonials and FAQ accordion

## 📁 Project Structure

```
Portfolio/
├── index.html              # Main landing page
├── pages/
│   ├── projects.html      # Project library/portfolio
│   ├── about.html         # Developer profile page
│   └── contact.html       # Contact and community page
├── css/
│   ├── main.css          # Core styles and layout
│   ├── components.css    # Reusable component styles
│   └── animations.css    # Animation definitions
├── js/
│   ├── main.js           # Core functionality
│   ├── projects.js       # Project management
│   └── utils.js          # Utility functions
└── assets/
    └── images/           # Image assets (placeholder)
```

## 🚀 Getting Started

1. **Clone or download** the project files
2. **Open** `index.html` in your web browser
3. **Navigate** through the different sections using the navigation bar

### Local Development

For the best development experience, use a local web server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (install http-server globally first)
npx http-server

# Using VS Code Live Server extension
# Right-click on index.html and select "Open with Live Server"
```

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `css/main.css`:

```css
:root {
    --steam-dark: #1b2838;
    --steam-blue: #66c0f4;
    --steam-green: #4c9e00;
    /* ... other colors */
}
```

### Adding Projects

Edit the `projectsData` array in `js/projects.js`:

```javascript
const projectsData = [
    {
        id: 1,
        title: "Your Project",
        category: "web",
        tags: ["React", "Node.js"],
        description: "Project description",
        // ... other properties
    }
];
```

### Updating Personal Information

1. Edit the hero section in `index.html`
2. Update profile details in `pages/about.html`
3. Modify contact information in `pages/contact.html`

## 💻 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, Animations
- **JavaScript**: ES6+, DOM manipulation
- **Design**: Steam-inspired UI/UX

## 🌟 Features in Detail

### Navigation System
- Sticky navigation bar
- Active page highlighting
- Smooth scroll animations
- User status indicator

### Project Showcase
- Dynamic filtering by category
- Sort by date, rating, or price
- Quick view modal
- Project cards with hover effects

### Profile Page
- Animated skill bars
- Experience timeline
- Achievement badges
- Statistics display

### Contact System
- Form validation
- Response time indicator
- Social media links
- FAQ accordion

## 📱 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🔧 Performance Optimizations

- Lazy loading for images
- Debounced scroll events
- CSS animations using transform
- Minimized reflows and repaints

## 📄 License

This project is available for personal and commercial use. Feel free to customize and use it for your own portfolio.

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## 👨‍💻 Author

**Alex Chen** (Portfolio Template)
- Full Stack Developer
- 5+ Years Experience
- Specializing in modern web technologies

## 🎮 Steam Design Credits

This portfolio design is inspired by the Steam platform by Valve Corporation. All design choices are transformative and for educational/portfolio purposes.

## 📞 Contact

- Email: alex.chen@example.com
- Discord: alexchen#1234
- GitHub: [github.com/alexchen](#)
- LinkedIn: [linkedin.com/in/alexchen](#)

---

Built with 💚 and ☕ using Steam-inspired design principles