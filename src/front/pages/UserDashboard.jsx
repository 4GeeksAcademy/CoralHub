import React from "react";

import { DashboardSidebar } from "../components/dashboard/DashboardSidebar";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { DashboardStatsCard } from "../components/dashboard/DashboardStatsCard";
import { DashboardProducts } from "../components/dashboard/DashboardProducts";
import { DashboardOrders } from "../components/dashboard/DashboardOrders";
import { DashboardProfile } from "../components/dashboard/DashboardProfile";
import { DashboardActivity } from "../components/dashboard/DashboardActivity";

export const UserDashboard = () => {
  return (
    <div className="dashboard-layout">

      <DashboardSidebar />

      <main className="dashboard-main">
        <div className="dashboard-container">

          <DashboardHeader />

          <div className="dashboard-content">

            <section className="dashboard-stats-grid">

              <DashboardStatsCard
                title="Active Products"
                value="12"
                subtitle="2 new this week"
              />

              <DashboardStatsCard
                title="Orders"
                value="4"
                subtitle="2 pending"
              />

              <DashboardStatsCard
                title="Revenue"
                value="$1,240"
                subtitle="+18% this month"
              />

              <DashboardStatsCard
                title="Favorites"
                value="23"
                subtitle="Saved products"
              />

            </section>

            <div className="dashboard-dual-grid">

              <DashboardProducts />

              <DashboardOrders />

            </div>
            
            <div className="dashboard-bottom-grid">

              <DashboardActivity />

              <DashboardProfile />

            </div>

          </div>
        </div>
      </main>

    </div>
  );
};








// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   LayoutDashboard,
//   Package,
//   ShoppingBag,
//   MessageSquare,
//   Heart,
//   Settings,
//   User,
//   HelpCircle,
//   LogOut,
//   Bell,
//   DollarSign,
//   Pencil,
//   Trash2,
//   Eye,
//   Mail,
//   Phone,
//   MapPin,
//   Camera,
//   Truck
// } from "lucide-react";

// import "../index.css";

// export const UserDashboard = () => {

//   const navigate = useNavigate();

//   useEffect(() => {

//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/login");
//     }

//   }, []);

//   return (

//     <div className="dashboard-wrapper d-flex">

//       {/* SIDEBAR */}

//       <aside className="dashboard-sidebar">

//         <div>

//           <h2 className="sidebar-logo">
//             Coral<span>Hub</span>
//           </h2>

//           <div className="profile-box text-center">

//             <div className="profile-avatar">
//               AM
//             </div>

//             <h5>
//               Ana Martinez
//             </h5>

//             <p>
//               ☆ Pro Seller
//             </p>

//           </div>

//           <nav className="sidebar-nav">

//             <a href="#" className="active">
//               <LayoutDashboard size={20} />
//               Dashboard
//             </a>

//             <a href="#">
//               <ShoppingBag size={20} />
//               My Products
//             </a>

//             <a href="#">
//               <Package size={20} />
//               My Orders
//             </a>

//             <a href="#">
//               <MessageSquare size={20} />
//               Messages

//               <span className="nav-badge">
//                 3
//               </span>
//             </a>

//             <a href="#">
//               <Heart size={20} />
//               Favorites
//             </a>

//             <a href="#">
//               <Package size={20} />
//               Payouts
//             </a>

//             <a href="#">
//               <User size={20} />
//               Personal Information
//             </a>

//             <a href="#">
//               <Settings size={20} />
//               Settings
//             </a>

//             <a href="#">
//               <HelpCircle size={20} />
//               Help
//             </a>

//           </nav>

//         </div>

//         <button className="logout-btn">

//           <LogOut size={20} />

//           Logout

//         </button>

//       </aside>


//       {/* MAIN */}

//       <main className="dashboard-main flex-grow-1">

//         {/* TOP */}

//         <div className="top-bar d-flex justify-content-between align-items-center">

//           <div>

//             <h1>
//               Welcome back, Ana 👋
//             </h1>

//             <p>
//               Here’s your CoralHub activity overview.
//             </p>

//           </div>

//           <div className="top-actions">

//             <button className="bell-btn">

//               <Bell size={22} />

//               <span></span>

//             </button>

//             <button className="publish-btn">
//               + Publish Product
//             </button>

//           </div>

//         </div>


//         {/* STATS */}

//         <div className="row g-4 mb-4">

//           <div className="col-lg-3 col-md-6">

//             <div className="stat-card">

//               <div className="stat-icon aqua">
//                 <ShoppingBag size={28} />
//               </div>

//               <div>

//                 <p>
//                   Active Products
//                 </p>

//                 <h2>
//                   12
//                 </h2>

//                 <span>
//                   2 new this week
//                 </span>

//               </div>

//             </div>

//           </div>


//           <div className="col-lg-3 col-md-6">

//             <div className="stat-card">

//               <div className="stat-icon coral">
//                 <Package size={28} />
//               </div>

//               <div>

//                 <p>
//                   Orders
//                 </p>

//                 <h2>
//                   4
//                 </h2>

//                 <span className="coral-text">
//                   2 pending
//                 </span>

//               </div>

//             </div>

//           </div>


//           <div className="col-lg-3 col-md-6">

//             <div className="stat-card">

//               <div className="stat-icon aqua">
//                 <DollarSign size={28} />
//               </div>

//               <div>

//                 <p>
//                   Total Revenue
//                 </p>

//                 <h2>
//                   $1,240.00
//                 </h2>

//                 <span>
//                   +18% this month
//                 </span>

//               </div>

//             </div>

//           </div>


//           <div className="col-lg-3 col-md-6">

//             <div className="stat-card">

//               <div className="stat-icon purple">
//                 <Heart size={28} />
//               </div>

//               <div>

//                 <p>
//                   Favorites
//                 </p>

//                 <h2>
//                   23
//                 </h2>

//                 <small>
//                   Saved products
//                 </small>

//               </div>

//             </div>

//           </div>

//         </div>


//         {/* PRODUCTS + ORDERS */}

//         <div className="row g-4 mb-4">


//           {/* PRODUCTS */}

//           <div className="col-lg-6">

//             <div className="dashboard-card">

//               <div className="card-header-custom">

//                 <h3>
//                   My Products
//                 </h3>

//                 <a href="#">
//                   View all
//                 </a>

//               </div>


//               {[
//                 ["Holy Grail Torch", "$250.00", "128", "2", "Active", "active", "https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=300"],

//                 ["Rainbow Bubble Tip", "$180.00", "96", "3", "Active", "active", "https://images.unsplash.com/photo-1520301255226-bf5f144451c1?q=80&w=300"],

//                 ["Green Brain Coral", "$120.00", "73", "1", "Pending", "pending", "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=300"],

//                 ["Ultra Acropora", "$150.00", "45", "0", "Sold Out", "sold", "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=300"],

//               ].map((item, index) => (

//                 <div className="product-item" key={index}>

//                   <div className="product-main">

//                     <img
//                       src={item[6]}
//                       alt={item[0]}
//                     />

//                     <div>

//                       <h5>
//                         {item[0]}
//                       </h5>

//                       <span>
//                         {item[1]}
//                       </span>

//                     </div>

//                   </div>


//                   <div className="product-meta">

//                     <div>

//                       <small>
//                         Views
//                       </small>

//                       <p>
//                         {item[2]}
//                       </p>

//                     </div>

//                     <div>

//                       <small>
//                         Stock
//                       </small>

//                       <p>
//                         {item[3]}
//                       </p>

//                     </div>

//                     <span className={`status ${item[5]}`}>
//                       {item[4]}
//                     </span>

//                   </div>


//                   <div className="product-actions">

//                     <button>
//                       <Pencil size={17} />
//                     </button>

//                     <button>
//                       <Trash2 size={17} />
//                     </button>

//                   </div>

//                 </div>

//               ))}

//             </div>

//           </div>



//           {/* ORDERS */}

//           <div className="col-lg-6">

//             <div className="dashboard-card">

//               <div className="card-header-custom">

//                 <h3>
//                   Recent Orders
//                 </h3>

//                 <a href="#">
//                   View all
//                 </a>

//               </div>


//               {[
//                 ["JD", "John D.", "Holy Grail Torch", "Pending", "pending", "12 May 2024", "$250.00"],

//                 ["SW", "Sarah W.", "Rainbow Bubble Tip", "Paid", "active", "11 May 2024", "$180.00"],

//                 ["MB", "Mike B.", "Green Brain Coral", "Shipped", "shipped", "10 May 2024", "$120.00"],

//                 ["LR", "Lisa R.", "Ultra Acropora", "Delivered", "active", "8 May 2024", "$150.00"],

//               ].map((order, index) => (

//                 <div className="order-item" key={index}>

//                   <div className="order-user">

//                     <div className="small-avatar">
//                       {order[0]}
//                     </div>

//                     <h5>
//                       {order[1]}
//                     </h5>

//                   </div>

//                   <p>
//                     {order[2]}
//                   </p>

//                   <span className={`status ${order[4]}`}>
//                     {order[3]}
//                   </span>

//                   <p>
//                     {order[5]}
//                   </p>

//                   <strong>
//                     {order[6]}
//                   </strong>

//                   <span>
//                     ›
//                   </span>

//                 </div>

//               ))}

//             </div>

//           </div>

//         </div>



//         {/* BOTTOM */}

//         <div className="row g-4">


//           {/* ACTIVITY */}

//           <div className="col-lg-6">

//             <div className="dashboard-card">

//               <h3 className="mb-4">
//                 Recent Activity
//               </h3>


//               <div className="activity-item">

//                 <div className="activity-icon aqua">
//                   <Eye size={18} />
//                 </div>

//                 <p>
//                   Someone viewed your “Holy Grail Torch” listing
//                 </p>

//                 <span>
//                   10 min
//                 </span>

//               </div>


//               <div className="activity-item">

//                 <div className="activity-icon coral">
//                   <ShoppingBag size={18} />
//                 </div>

//                 <p>
//                   Your “Rainbow Bubble Tip” product was purchased
//                 </p>

//                 <span>
//                   1 h
//                 </span>

//               </div>


//               <div className="activity-item">

//                 <div className="activity-icon aqua">
//                   <Mail size={18} />
//                 </div>

//                 <p>
//                   You received a new message from John D.
//                 </p>

//                 <span>
//                   3 h
//                 </span>

//               </div>


//               <div className="activity-item">

//                 <div className="activity-icon yellow">
//                   <Truck size={18} />
//                 </div>

//                 <p>
//                   Order #1232 has been shipped
//                 </p>

//                 <span>
//                   5 h
//                 </span>

//               </div>


//               <a href="#" className="activity-link">
//                 View all activity
//               </a>

//             </div>

//           </div>



//           {/* PERSONAL */}

//           <div className="col-lg-6">

//             <div className="dashboard-card personal-card">

//               <div className="card-header-custom">

//                 <h3>
//                   Personal Information
//                 </h3>

//                 <a href="#">
//                   Edit
//                 </a>

//               </div>


//               <div className="personal-content">


//                 <div className="personal-avatar-area">

//                   <div className="big-avatar">
//                     AM
//                   </div>

//                   <button className="change-photo-btn">

//                     Change Photo

//                     <Camera size={16} />

//                   </button>

//                 </div>


//                 <div className="personal-table">

//                   <div>

//                     <User size={18} />

//                     <span>
//                       Full Name
//                     </span>

//                     <strong>
//                       Ana Martinez
//                     </strong>

//                   </div>


//                   <div>

//                     <Mail size={18} />

//                     <span>
//                       Email
//                     </span>

//                     <strong>
//                       ana.martinez@email.com
//                     </strong>

//                   </div>


//                   <div>

//                     <Phone size={18} />

//                     <span>
//                       Phone
//                     </span>

//                     <strong>
//                       +1 (305) 555-0198
//                     </strong>

//                   </div>


//                   <div>

//                     <MapPin size={18} />

//                     <span>
//                       Address
//                     </span>

//                     <strong>
//                       Miami, Florida, USA
//                     </strong>

//                   </div>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>

//       </main>

//     </div>
//   );
// };