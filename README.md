E-Commerce Product Management System

A full-stack **E-Commerce Product Management System** built with **Django REST Framework** (backend API) and **React** (frontend UI).
The app allows users to **browse, search, and manage products**, as well as basic user management.

---

## 🚀 Features

### Backend (Django + DRF)

* CRUD for Products & Users
* Product search & category filter
* Media upload for product images
* Optional JWT authentication
* RESTful API endpoints

### Frontend (React)

* Product listing (grid view)
* Product details page
* Search & category filter
* User registration & profile
* Admin product management (Add/Edit/Delete)
* Responsive UI (mobile + desktop)

---

## 🗂 Project Structure

```
ecommerce_api_project/
│
├── backend/                # Django project
│   ├── api/                # API app (models, serializers, views, urls)
│   ├── core/               # Project settings & URLs
│   ├── media/              # Uploaded product images
│   ├── manage.py
│
├── frontend/               # React project
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   └── ProductCard.js
│   │   ├── pages/          # Page components
│   │   ├── App.js          # Routes
│   │   └── index.js
│   ├── package.json
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/your-username/ecommerce_api_project.git
cd ecommerce_api_project
```

---

### 2. Backend Setup (Django)

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # (Windows)
# source venv/bin/activate (Linux/Mac)

pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser   # optional admin user
python manage.py runserver
```

Backend runs at: **[http://127.0.0.1:8000/](http://127.0.0.1:8000/)**

---

### 3. Frontend Setup (React)

```bash
cd ../frontend
npm install
npm start
```

Frontend runs at: **[http://localhost:3000/](http://localhost:3000/)**

---

## 🔗 API Endpoints

### Products

* `GET /api/products/` → List all products
* `POST /api/products/` → Create product
* `GET /api/products/{id}/` → Retrieve product
* `PUT /api/products/{id}/` → Update product
* `DELETE /api/products/{id}/` → Delete product
* `GET /api/products/search/?name=...&category=...` → Search & filter

### Users

* `GET /api/users/` → List all users
* `POST /api/users/` → Create user
* `GET /api/users/{id}/` → Retrieve user
* `PUT /api/users/{id}/` → Update user
* `DELETE /api/users/{id}/` → Delete user

---

## 🖼 Product Images

* Uploaded images are stored in `/media/products/`.
* In development, Django serves them via:

  ```
  http://127.0.0.1:8000/media/products/<filename>
  ```
* Serializer ensures frontend gets **absolute URLs**.

---

## 🛠 Tools & Technologies

**Backend**

* Django 5
* Django REST Framework
* SQLite (dev) / PostgreSQL (production)

**Frontend**

* React 18
* React Router
* Axios
* React Bootstrap / TailwindCSS

**Deployment**

* Backend → Render / Heroku
* Frontend → Vercel / Netlify

---

## 📅 Development Timeline (5 Weeks)

* **Week 1**: Setup Django + models + migrations
* **Week 2**: CRUD APIs for products & users
* **Week 3**: React frontend scaffolding + product list/detail pages
* **Week 4**: Search, filters, image handling, admin management
* **Week 5**: Testing + deployment

---

## ⚠️ Troubleshooting

* **500 Error** → check `DEBUG=True` in `settings.py`.
* **Images not showing** → ensure serializer returns absolute URLs + media config in `urls.py`.
* **Git lock error** → delete `.git/index.lock`.
* **Custom User migration issue** → reset migrations if early in development.

---

## ✨ Future Enhancements

* JWT Authentication (login/logout)
* Pagination for product list
* Category as a separate model
* Shopping cart & checkout flow

---

## 👨‍💻 Author

Developed by **Jacob Otana** 🚀
