import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Header from "./Header";
import React, { ReactElement } from "react";

// import PageHead from "./PageHead";
// import PageTitle from "./PageTitle";
import Sidebar from "./Sidebar";
import Meta from "./meta";
import { Container } from "@mui/material";

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
                            paddingTop:"5rem",
                            marginBottom:"5rem",
                            paddingBottom:"5rem",
                            backgroundColor:"black",
                            margin: { xs: "auto", md: "auto", sm: "auto" },
                            flexGrow: 1,
                        }}
                    >
                        <Container>
                        <Toolbar />
                        {children}
                        </Container>
                    
                    </Box>
              
            </div>
        </>
    );
};

export default Layout;
