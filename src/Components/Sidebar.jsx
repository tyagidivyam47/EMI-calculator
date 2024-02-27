import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import React, { useEffect, useState } from "react";
import { primaryColor, secondaryColor } from "../Theme";
import styled from "@emotion/styled";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme } from "@emotion/react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import logo from "../assets/EMI-logo1.png";
import { NavLink, useNavigate } from "react-router-dom";
import "./components.css";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
// import d from "../assets/"

const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
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
  maxHeight: "60px",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  backgroundColor: primaryColor,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
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

const links = [
  "Dashboard",
  "Loan Types",
  "Request Management",
  "Profile",
  "Settings",
];

const currencies = [
  {
    value: '₹',
    label: '₹ Rupee',
  },
  {
    value: '$',
    label: '$ Dollar',
  },
  {
    value: '€',
    label: '€ Euro',
  },
  {
    value: '¥',
    label: '¥ Yen',
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [cookies, setCookie, removeCookie] = useCookies([
    "auth_token",
    "user_id",
  ]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [indexActive, setIndexActive] = useState(0);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const currencyChangeHandler = (e) => {
    dispatch(userActions.changeCurrency({
      currency: e.target.value
    }))
  }

  useEffect(() => {
    const path = window.location.pathname;
    switch (path) {
      case "/Dashboard":
        setIndexActive(0);
        break;
      case "/Loan%20Types":
        setIndexActive(1);
        break;
      case "/Request%20Management":
        setIndexActive(2);
        break;
      case "/Profile":
        setIndexActive(3);
        break;
      default:
        setIndexActive(4);
        break;
    }
  }, []);

  const logoutHandler = () => {
    removeCookie("auth_token");
    removeCookie("user_id");
    navigate("/");
  };

  return (
    <Box sx={{ height: "100%", bgcolor: primaryColor }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box>
            <img src={logo} style={{ height: "50px" }} />
            {/* <div>EMI</div> */}
          </Box>
        </DrawerHeader>
        <Divider />
        <List>
          {links.map((text, index) => (
            <NavLink
              key={index}
              to={links[index]}
              style={{ background: "red" }}
              onClick={() => setIndexActive(index)}
            // className={({ isActive }) => (isActive ? "activeLink" : "")}
            >
              {/* <span
                style={{
                  height: "30px",
                  width: "8px",
                  backgroundColor:
                    index === indexActive ? secondaryColor : "#FFFFFF",
                  position: "absolute",
                  marginTop: "28px",
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
              >
                .
              </span> */}
              <ListItem
                key={text}
                disablePadding
                style={{
                  background: index === indexActive ? secondaryColor : "",
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }}
                sx={{ display: "block", marginTop: "20px", marginLeft: "20px" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 0.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: index === indexActive ? "#FFFFFF" : primaryColor,
                    }}
                  >
                    {index === 0 ? (
                      <DashboardIcon />
                    ) : index === 1 ? (
                      <CreditScoreIcon />
                    ) : index === 2 ? (
                      <RequestQuoteIcon />
                    ) : index === 3 ? (
                      <AccountBoxIcon />
                    ) : (
                      <SettingsIcon />
                    )}
                  </ListItemIcon>

                  <ListItemText
                    primary={text}
                    sx={{
                      opacity: open ? 1 : 0,
                      color: index === indexActive ? "#FFFFFF" : primaryColor,
                      fontWeight: 800,
                    }}
                    style={{ fontWeight: 800 }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
          <IconButton
            onClick={handleDrawerToggle}
            style={{
              display: "flex",
              // justifyContent:"center",
              marginLeft: "auto",
              marginRight: "7px",
              marginTop: "35px",
              border: `1px solid ${primaryColor}`,
              // background: primaryColor,
              color: primaryColor,
              // position:"absolute",
              // left:"230px",
            }}
          >
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>

          {open && <ListItem
            // key={"Sign out"}
            // onClick={logoutHandler}
            disablePadding
            sx={{ display: "block", marginTop: "20px", marginLeft: "20px" }}
          >
            <div>
              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                defaultValue="₹"
                helperText="Please select your currency"
                onChange={currencyChangeHandler}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </ListItem>}


          <ListItem
            key={"Sign out"}
            onClick={logoutHandler}
            disablePadding
            style={{
              background: "#c61a09",
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              marginTop: "100px",
            }}
            sx={{ display: "block", marginTop: "20px", marginLeft: "20px" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 0.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "#FFFFFF",
                }}
              >
                <ExitToAppIcon />
              </ListItemIcon>

              <ListItemText
                primary={"Sign Out"}
                sx={{
                  opacity: open ? 1 : 0,
                  color: "#FFFFFF",
                  fontWeight: 800,
                }}
                style={{ fontWeight: 800 }}
              />
            </ListItemButton>
          </ListItem>

        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
