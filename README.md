# 💊 Online Pharmacy Portal (Online Drug Ordering System)

An online platform for users to order medicines/drugs securely. The system supports user authentication, admin management of drug inventory, member registration and approval, and order processing with automatic cart management.

---

## 🛠️ Modules Overview

### 🔐 1. Authentication Module
- **User Login/Logout** functionality
- **Member registration** with approval system
- **Password protection**

---

### 💊 2. Drug Management (Admin)
- Add new drugs
- List all drugs
- Edit drug details
- Delete drugs
- View drug by ID or name

### 🔍 Drug Access (Members)
- View drugs by ID or name (read-only)

---

### 👤 3. Member Management
- Member Registration
- Admin:
  - View all members
  - Disable a defaulting member
  - Delete a member
  - Update member details
- Member:
  - Edit profile (email, phone, etc.)
- Admin approval required before member login is enabled

---

### 🛒 4. Medicine Order Module (Members)
- Search and order drugs by name
- Add multiple drugs to cart
- Automatically calculate total price
- Complete order (no payment gateway included)
- Cart empties after order completion
- Drug quantity updated after purchase
- Block orders if:
  - Drug quantity is zero
  - Requested quantity > available stock

---



---

## 🚀 Getting Started

### Requirements
- Java (JDK 8+)
- MySQL/MariaDB
- Apache Tomcat (if using JSP/Servlets)
- Maven 
- VS Code / IntelliJ IDEA
- React(Vite)

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Deshmukhsne/online-pharma-team6.git

   
