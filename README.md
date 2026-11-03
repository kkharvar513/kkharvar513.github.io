# Khushi Kharvar - Aspiring Data Analyst Portfolio

A modern, responsive, high-performance personal portfolio website tailored for **Khushi Jayeshkumar Kharvar**, specializing in Data Analytics, Business Intelligence, SQL data modeling, and predictive analytics.

---

## 🌟 Key Portfolio Highlights

- **Hero & Value Proposition**: Punchy headline with live availability status, corporate portrait, quick-access social links, and key career metrics strip (50k+ records, 10+ BI dashboards).
- **About Me & Academic Timeline**: Showcases dual strength in **BBA Finance** (commercial acumen, unit economics) and **PGDM Data Science & Analytics** (rigorous statistical and database modeling).
- **Categorized Skills Matrix**: Clean badges with proficiency indicators covering:
  - *Languages & Queries*: SQL (PostgreSQL/MySQL), Python, MongoDB
  - *Visualization & BI*: Microsoft Power BI (DAX), Tableau Desktop/Public, Advanced Excel, RapidMiner
  - *Data Libraries*: Pandas, NumPy, Matplotlib, Jupyter, Git/GitHub
- **Interactive Featured Projects**:
  1. **Healthcare Operations & Patient Management Analytics** (*Tableau + SQL*) - $18.5k billing leakage identified & 22% idle time reduced.
  2. **FinTech Customer Segmentation & Credit Risk** (*Python + Excel*) - Risk profiling 50k customers to safeguard $45k in loan defaults.
  3. **Automobile Sales & Market Performance Intelligence** (*Power BI + DAX*) - Regional demand rebalancing & 14% turnover gain.
  4. **Crime Patterns & Geospatial Trend Analytics of India** (*Python Pandas/Matplotlib*) - Public safety trend analysis.
- **Deep-Dive Project Modals**: Recruiter-friendly interactive popup modals containing actual SQL queries, DAX formulas, Python code logic, and quantifiable ROI breakdowns.
- **Internship & Certifications Spotlight**: Highlighting the Summer Internship at **ES Healthcare Centre** and verified credentials from **Great Learning, Microsoft, and HP Life**.
- **Interactive Contact Form & Direct Links**: Direct links to LinkedIn, GitHub, Tableau Public, Email (`k.kharvar513@gmail.com`), and Phone.
- **Dark / Light Mode**: Built-in sleek dark mode with glassmorphism and one-click toggle with localStorage persistence.

---

## 🚀 How to Run Locally

You can run the portfolio website using any static file server or Python:

```bash
# Option 1: Using Python
python -m http.server 8080

# Option 2: Using Node.js npx
npx serve .
```

Then open your browser and navigate to:
```
http://localhost:8080
```

---

## 🌐 How to Deploy to GitHub Pages (Free)

1. Create a new GitHub repository named `portfolio` or `khushi-kharvar.github.io`.
2. Push this folder to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Data Analyst Portfolio"
   git branch -M main
   git remote add origin https://github.com/kkharvar513/your-repo-name.git
   git push -u origin main
   ```
3. Go to **Settings** > **Pages** in your GitHub repository and set the branch to `main` and folder to `/ (root)`.
4. Your website will be live at `https://<your-username>.github.io/<repo-name>/`!

---

## 📁 File Structure

```
Portfolio_khushi/
├── index.html           # Main semantic HTML5 markup
├── styles.css           # Custom CSS design system, dark/light themes & glassmorphism
├── app.js               # Theme toggle, project filter, modals & counter animation
├── assets/              # Generated high-resolution image assets
│   ├── profile.jpg      # Profile headshot
│   ├── healthcare_preview.jpg # Healthcare BI dashboard mockup
│   ├── fintech_preview.jpg    # FinTech risk dashboard mockup
│   └── auto_preview.jpg       # Automotive sales dashboard mockup
└── README.md            # Documentation & deployment guide
```
