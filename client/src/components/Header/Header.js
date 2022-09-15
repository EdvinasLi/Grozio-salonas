import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'
export default function Header() {
  return (
    <header className="p-3 text-bg-dark">
    <div className="container">
    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <h1>Beauty Parlor</h1>
        </a>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 ms-5 justify-content-center mb-md-0">
        <li><Link to='/' className="nav-link px-2 text-secondary">Home</Link>
        </li>
        <li><Link to='/admin' className="nav-link px-2 text-white">Admin</Link>
        <div className="dropdownContent">
        <li><Link to='/admin/saloons/new' className="nav-link px-2 text-black">Add new saloon</Link></li>
        <li><Link to='/admin/services/new' className="nav-link px-2 text-black">Add new service</Link></li>
        <li><Link to='/admin/workers/new' className="nav-link px-2 text-black">Add new worker</Link></li>
        <li><Link to='/admin/services' className="nav-link px-2 text-black">All services</Link></li>
        <li><Link to='/admin' className="nav-link px-2 text-black">All saloons</Link></li>
      
        <li><Link to='/admin/workers' className="nav-link px-2 text-black">All workers</Link></li></div></li>
        
        <li><Link to='/' className="nav-link px-2 text-white">Test1</Link></li>
        </ul>
        
        <div className="text-end">
            <button type="button" className="btn btn-outline-light me-2">Login</button>
            <button type="button" className="btn btn-warning">Sign-up</button>
        </div>
    </div>
    </div>
</header>
  )
}
