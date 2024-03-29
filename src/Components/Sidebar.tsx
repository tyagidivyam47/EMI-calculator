import {
  Box,
  CSSObject,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField,
  Theme,
} from "@mui/material";
import MuiDrawer, { DrawerProps } from "@mui/material/Drawer";
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

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }:any) => ({
  display: 'flex',
  alignItems: 'center',
  // justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  background: primaryColor,
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }:any) => ({
    ...theme.mixins.toolbar,
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const links = ["Dashboard", "Loan Types"];

const currencies = [
  {
    value: "₹",
    label: "₹ Rupee",
  },
  {
    value: "$",
    label: "$ Dollar",
  },
  {
    value: "€",
    label: "€ Euro",
  },
  {
    value: "¥",
    label: "¥ Yen",
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

  const currencyChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      userActions.changeCurrency({
        currency: e.target.value,
      })
    );
  };

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
          <Box display={'flex'} alignItems={'center'} gap={'5px'}>
            <img src={logo} style={{ height: "50px" }} />
            <span className="text-xl font-semibold text-white"
            style={{ fontFamily: "Sixtyfour, sans-serif" }}>EMI Buddy</span>
          </Box>
        </DrawerHeader>
        <Divider />
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
        <List>
          {links.map((text, index) => (
            <NavLink
              key={index}
              to={links[index]}
              style={{ background: "red", textDecoration:"none" }}
              onClick={() => setIndexActive(index)}
              // className={({ isActive }) => (isActive ? "activeLink" : "")}
            >
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
                      textDecoration:"none"
                    }}
                    style={{ fontWeight: 800, textDecoration:"none" }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}

          {open && (
            <ListItem
              // key={"Sign out"}
              // onClick={logoutHandler}
              disablePadding
              sx={{ display: "block", marginTop: "150px", marginLeft: "20px" }}
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
            </ListItem>
          )}

          {/* <ListItem
            key={"Sign out"}
            onClick={logoutHandler}
            disablePadding
            style={{
              background: "#c61a09",
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              marginTop: "200px",
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
          </ListItem> */}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
