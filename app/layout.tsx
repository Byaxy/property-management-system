"use client";
import React, { useEffect, useState } from "react";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

export default function RootLayout({ children }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const matchesMidium = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        if (matchesMidium) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }, [matchesMidium]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <html lang="en">
            <body className={`${inter.className} `}>
                <Box className="flex bg-lightGrayColor">
                    <CssBaseline />
                    <AppBar
                        className="bg-white text-textPrimary fixed shadow-sm"
                        open={open}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{
                                    marginRight: 5,
                                    ...(open && { display: "none" }),
                                }}
                            >
                                <MenuIcon titleAccess="Open Side Menu" />
                            </IconButton>

                            {/** Header */}
                            <Header />
                        </Toolbar>
                    </AppBar>

                    {/** Sidebar Navigation */}
                    <Drawer
                        variant="permanent"
                        open={open}
                        className="bg-white"
                    >
                        <DrawerHeader>
                            <h2 className="text-2xl font-extrabold text-primaryColor ml-2">
                                RPMS
                            </h2>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === "rtl" ? (
                                    <ChevronRightIcon titleAccess="Open Side Menu" />
                                ) : (
                                    <ChevronLeftIcon titleAccess="Close Side Menu" />
                                )}
                            </IconButton>
                        </DrawerHeader>
                        <Divider />
                        <Sidebar open={open} />
                    </Drawer>

                    {/** Main Content */}
                    <Box
                        className="min-h-screen flex-grow px-4"
                        component="main"
                    >
                        <DrawerHeader />
                        {children}
                    </Box>
                </Box>
            </body>
        </html>
    );
}
