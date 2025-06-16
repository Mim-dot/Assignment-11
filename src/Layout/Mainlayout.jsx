import React from 'react';
import { Outlet } from 'react-router';
import Nav from '../component/Nav';
import Footer from '../component/Footer';
import { ToastContainer } from 'react-toastify';

const Mainlayout = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
            <Footer></Footer> 
             <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default Mainlayout;