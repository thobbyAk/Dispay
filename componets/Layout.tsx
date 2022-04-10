import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Header from "./Header";
import React, { ReactElement } from "react";

// import PageHead from "./PageHead";
// import PageTitle from "./PageTitle";
import Sidebar from "./Sidebar";
import Meta from "./meta";

const Layout = ({
    children,
    
}: {
  children: ReactElement | ReactElement[];
}) => {
    const [height, setHeight] = useState(Number);
    useEffect(() => {
        setHeight(window.screen.height);
    }, []);
    return (
        <>
            {/* <PageHead headTitle={headTitle} /> */}
            <div id="main-wrapper">
                <Meta/>
                <Header />
                {/* <Sidebar /> */}
                    <Box
                        component="main"
                        sx={{
                            height:"100vh",
                            backgroundColor:"black",
                            margin: { xs: "auto", md: "0 0 0 140px", sm: "auto" },
                            flexGrow: 1,
                        }}
                    >
                        <Toolbar />
                        {children}
                    </Box>
              
            </div>
        </>
    );
};

export default Layout;
