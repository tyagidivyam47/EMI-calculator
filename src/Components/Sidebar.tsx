import {
  Box,
  CSSObject,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  SwipeableDrawer,
  TextField,
  Theme,
} from "@mui/material";
import MuiDrawer, { DrawerProps } from "@mui/material/Drawer";
import React, { useEffect, useState } from "react";
import {
  activeBgColor,
  primaryBgColor,
  primaryColor,
  secondaryBgColor,
  secondaryColor,
} from "../Theme";
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
import logo from "../assets/EMI-logo1.svg";
import { NavLink, useNavigate } from "react-router-dom";
import "./components.css";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import BungalowIcon from "@mui/icons-material/Bungalow";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import SchoolIcon from "@mui/icons-material/School";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import GiteIcon from "@mui/icons-material/Gite";
import SavingsIcon from "@mui/icons-material/Savings";
// import d from "../assets/"

const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  background: primaryColor,
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: primaryColor,
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }: any) => ({
  display: "flex",
  alignItems: "center",
  // justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  background: primaryColor,
  ...theme.mixins.toolbar,
}));

const DrawerLg = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }: any) => ({
  ...theme.mixins.toolbar,
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

const links = ["Dashboard", "Loan Types"];
const loanTypes = [
  "Home Loan",
  "Car Loan",
  "Education Loan",
  "Personal Loan",
  "Loan Against Property",
  "Loan as per budget",
];
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
  const [listActInd, setListActInd] = useState(0);
  const [smOpen, setSmOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);

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
    <Box>
      <Box sx={{}}>
        <SwipeableDrawer
          onOpen={() => setSmOpen(true)}
          onClose={() => setSmOpen(false)}
          open={smOpen}
        >
          <Box
            sx={{ width: 250, overflowX:"hidden" }}
            role="presentation"
            onClick={() => setSmOpen(false)}
          >
            <Box display={"flex"} alignItems={"center"} gap={"5px"} padding={'10px'} >
              <img src={logo} />
              <span
                className="text-xl font-semibold text-white"
                style={{ fontFamily: "Sixtyfour, sans-serif" }}
              >
                EMI Buddy
              </span>
            </Box>
            <Divider />
            <List>
              {links.map((text, index) => (
                <NavLink
                  key={index}
                  to={text === "Loan Types" ? loanTypes[0] : links[index]}
                  style={{ background: "red", textDecoration: "none" }}
                  onClick={() => {
                    if (index === 1) {
                      setListOpen(!listOpen);
                      setListActInd(0);
                    } else {
                      setListActInd(0);
                      setListOpen(false);
                    }
                    setIndexActive(index);
                  }}
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
                    sx={{
                      display: "block",
                      marginTop: "20px",
                      marginLeft: "20px",
                    }}
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
                          color:
                            index === indexActive ? "#FFFFFF" : primaryColor,
                        }}
                      >
                        {index === 0 ? (
                          <BungalowIcon />
                        ) : index === 1 ? (
                          <DirectionsCarFilledIcon />
                        ) : index === 2 ? (
                          <SchoolIcon />
                        ) : index === 3 ? (
                          <SettingsAccessibilityIcon />
                        ) : index === 4 ? (
                          <GiteIcon />
                        ) : (
                          <SavingsIcon />
                        )}
                      </ListItemIcon>

                      <ListItemText
                        primary={index === 0 ? "Home" : text}
                        sx={{
                          opacity: open ? 1 : 0,
                          color:
                            index === indexActive ? "#FFFFFF" : primaryColor,
                          fontWeight: 800,
                          textDecoration: "none",
                        }}
                        style={{ fontWeight: 800, textDecoration: "none" }}
                      />
                    </ListItemButton>
                  </ListItem>
                </NavLink>
              ))}
            </List>
            <ListItem>
              <Collapse in={listOpen} timeout="auto" unmountOnExit>
                {loanTypes.map((loanType, index) => (
                  <NavLink
                    key={index}
                    to={loanTypes[index]}
                    style={{ background: "red", textDecoration: "none" }}
                    onClick={() => {
                      setListActInd(index);
                    }}
                    // className={({ isActive }) => (isActive ? "activeLink" : "")}
                  >
                    <ListItem
                      key={index}
                      disablePadding
                      style={{
                        background: index === listActInd ? secondaryColor : "",
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                      }}
                      sx={{
                        display: "block",
                        marginTop: "20px",
                        marginLeft: "20px",
                      }}
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
                            color:
                              index === listActInd ? "#FFFFFF" : primaryColor,
                          }}
                        >
                          {index === 0 ? (
                            <BungalowIcon />
                          ) : index === 1 ? (
                            <DirectionsCarFilledIcon />
                          ) : index === 2 ? (
                            <SchoolIcon />
                          ) : index === 3 ? (
                            <SettingsAccessibilityIcon />
                          ) : index === 4 ? (
                            <GiteIcon />
                          ) : (
                            <SavingsIcon />
                          )}
                        </ListItemIcon>

                        <ListItemText
                          primary={loanType}
                          sx={{
                            opacity: open ? 1 : 0,
                            color:
                              index === listActInd ? "#FFFFFF" : primaryColor,
                            fontWeight: 800,
                            textDecoration: "none",
                          }}
                          style={{ fontWeight: 800, textDecoration: "none" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </NavLink>
                ))}
              </Collapse>
            </ListItem>
            <Divider />
            <ListItem
              // key={"Sign out"}
              // onClick={logoutHandler}
              disablePadding
              sx={{
                display: "block",
                marginTop: "150px",
                marginLeft: "20px",
              }}
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
          </Box>
        </SwipeableDrawer>
      </Box>

      {/* Small Screen */}

      <Box
        sx={{
          display: {
            lg: "none",
            md: "none",
            sm: "contents",
            xs: "contents",
          },
        }}
      >
        <Box
          onClick={() => setSmOpen(true)}
          sx={{ position: "fixed", left: "15px", top: "25px", zIndex: 100 }}
        >
          <MenuIcon />
        </Box>
      </Box>

      {/* Large Screen */}

      <Box
        sx={{
          display: {
            lg: "contents",
            md: "contents",
            sm: "none",
            xs: "none",
          },
        }}
      >
        <DrawerLg variant="permanent" open={open}>
          <DrawerHeader>
            <Box display={"flex"} alignItems={"center"} gap={"5px"}>
              <img src={logo} />
              <span
                className="text-xl font-semibold text-white"
                style={{
                  fontFamily: "Sixtyfour, sans-serif",
                  color: "#FFFFFF",
                  paddingLeft:"18px"
                }}
              >
                EMI Buddy
              </span>
            </Box>
          </DrawerHeader>
          <Divider />
          <IconButton
            onClick={handleDrawerToggle}
            style={{
              display: "flex",
              marginLeft: "auto",
              marginRight: "7px",
              marginTop: "5px",
              // border: `1px solid #FFFFFF`,
              color: "#FFFFFF",
              background: activeBgColor,
            }}
          >
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
          <List>
            {links.map((text, index) => (
              <NavLink
                key={index}
                to={text === "Loan Types" ? loanTypes[listActInd] : links[index]}
                style={{ background: "red", textDecoration: "none" }}
                onClick={() => {
                  if (index === 1) {
                    setListOpen(!listOpen);
                  } else {
                    setListActInd(0);
                    setListOpen(false);
                  }
                  setIndexActive(index);
                }}
                // className={({ isActive }) => (isActive ? "activeLink" : "")}
              >
                <ListItem
                  key={text}
                  disablePadding
                  style={{
                    background: index === indexActive ? activeBgColor : "",
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}
                  sx={{
                    display: "block",
                    marginTop: "20px",
                    marginLeft: "20px",
                  }}
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
                        color: index === indexActive ? "#FFFFFF" : "#FFFFFF",
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
                        color: index === indexActive ? "#FFFFFF" : "#FFFFFF",
                        fontWeight: 800,
                        textDecoration: "none",
                      }}
                      style={{ fontWeight: 800, textDecoration: "none" }}
                    />
                    {index === 1 && (
                      <div style={{ marginRight: "20px", color: "#FFFFFF" }}>
                        {!listOpen && <KeyboardArrowDownIcon />}
                        {listOpen && <KeyboardArrowUpIcon />}
                      </div>
                    )}
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))}
            {listOpen && <Divider variant="inset" sx={{marginTop:"10px", background:"#ffffff"}}/>}
            <ListItem>
              <Collapse in={listOpen} timeout="auto" unmountOnExit>
                {loanTypes.map((loanType, index) => (
                  <NavLink
                    key={index}
                    to={loanTypes[index]}
                    style={{ background: "red", textDecoration: "none" }}
                    onClick={() => {
                      setListActInd(index);
                    }}
                  >
                    <ListItem
                      key={index}
                      disablePadding
                      style={{
                        background: index === listActInd ? activeBgColor : "",
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                      }}
                      sx={{
                        display: "block",
                        // marginTop: "20px",
                        marginLeft:"5px"
                      }}
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
                            color:
                              index === indexActive ? "#FFFFFF" : "#FFFFFF",
                          }}
                        >
                          {index === 0 ? (
                            <BungalowIcon />
                          ) : index === 1 ? (
                            <DirectionsCarFilledIcon />
                          ) : index === 2 ? (
                            <SchoolIcon />
                          ) : index === 3 ? (
                            <SettingsAccessibilityIcon />
                          ) : index === 4 ? (
                            <GiteIcon />
                          ) : (
                            <SavingsIcon />
                          )}
                        </ListItemIcon>

                        <ListItemText
                          primary={loanType}
                          sx={{
                            opacity: open ? 1 : 0,
                            color:
                              index === indexActive ? "#FFFFFF" : "#FFFFFF",
                            fontWeight: 800,
                            textDecoration: "none",
                          }}
                          style={{ fontWeight: 800, textDecoration: "none" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </NavLink>
                ))}
              </Collapse>
            </ListItem>

            {open && (
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  marginTop: "50px",
                  // marginLeft: "20px",
                  padding: "10px",
                }}
              >
                <Box
                  sx={{
                    background: primaryBgColor,
                    display: "flex",
                    padding: "8px 16px",
                    borderRadius: 2,
                  }}
                >
                  <TextField
                    id="outlined-select-currency"
                    variant="filled"
                    select
                    label="Select"
                    defaultValue="₹"
                    helperText="Please select your currency"
                    onChange={currencyChangeHandler}
                    inputProps={{ color: "#FFFFFF" }}
                    sx={{ margin: "auto" }}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
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
        </DrawerLg>
      </Box>
    </Box>
  );
};

export default Sidebar;
