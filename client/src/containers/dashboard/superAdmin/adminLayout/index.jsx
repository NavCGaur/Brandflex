import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../navbar/index.jsx";
import Sidebar from "../sidebar/index.jsx";



function AdminLayout() {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(isNonMobile);

  const user = useSelector((state) => state.user);

  return (
    <Box display="flex" width="100%" height="100%">
      {/* Sidebar */}
      <Box
        sx={{
          width: isSidebarOpen ? "250px" : "0px",
          flexShrink: 0,
          transition: "width 0.3s ease",
          overflow: "hidden",
        }}
      >
        {isNonMobile || isSidebarOpen ? (
          <Sidebar
            user={user || {}}
            isNonMobile={isNonMobile}
            drawerWidth="250px"
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        ) : null}
      </Box>
      
      {/* Main content area */}
      <Box 
        flexGrow={1}
        sx={{
          width: isSidebarOpen ? "calc(100% - 250px)" : "100%",
          transition: "width 0.3s ease",
        }}
      > 
        <Navbar 
          user={user || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}  
        />
        <Outlet />
      </Box>
    </Box>
  )
}
export default AdminLayout