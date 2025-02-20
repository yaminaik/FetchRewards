# 🐶 Fetch Dog Adoption Finder

🚀 **Find your perfect companion!** This is a React-based web application that helps users search for adoptable shelter dogs using various filters like **breed, age, and location (state, city, ZIP code)**. Users can also save favorites and generate a **best-match recommendation**. 

🔗 **Live Demo:** [fetch-rewards-kappa.vercel.app](#) *(⚠️ Open in Chrome for best experience due to Safari's cookie restrictions.)*

---

## 📌 Features

✅ **User Authentication**  
- Users enter their **name & email** to log in.  
- Secure authentication with `fetch-access-token` (HttpOnly cookie).  

✅ **Dog Search & Filtering**  
- Search by **breed, age, and ZIP code**.  
- Filter by **state and city** (fetches corresponding ZIP codes dynamically).  
- Paginated search results (10 per page).  

✅ **Favorites & Match Generation**  
- Users can **save favorite dogs**.  
- The system recommends the **best-match** dog based on saved favorites.  

✅ **Profile Page**  
- Displays saved matches for users to revisit their favorite dogs.  

✅ **Responsive & Optimized UI**  
- Designed with **TailwindCSS** & **Lucide Icons** for a clean and modern interface.  
- Fully responsive across **desktop, tablet, and mobile**.  

✅ **Browser Compatibility Note**  
- Due to **Safari’s strict privacy settings**, the authentication cookie **may not work properly**.  
- **Use Google Chrome** for the best experience!  

---

## 🛠️ Tech Stack
- **Frontend:** React, TypeScript, Vite  
- **State Management:** React Hooks  
- **UI Styling:** Tailwind CSS, Lucide Icons  
- **API Integration:** Fetch API with authentication  
- **Deployment:** Vercel / Netlify  

---

## 🚀 Installation & Running Locally

1️⃣ **Clone the repository**  
```sh
git clone https://github.com/yourusername/fetch-dog-app.git
cd fetch-dog-app


2️⃣ **Install dependencies**  
npm install

3️⃣ **Start the development server**  
npm run dev

The app should now be running at http://localhost:5173/.
