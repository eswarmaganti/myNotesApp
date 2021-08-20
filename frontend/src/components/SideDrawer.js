import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  makeStyles,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Typography,
  SvgIcon,
  Collapse,
} from "@material-ui/core";
import {
  DashboardRounded,
  ExpandLess,
  ExpandMore,
  PostAddRounded,
  SettingsRounded,
  VpnKeyRounded,
} from "@material-ui/icons";
import { indigo } from "@material-ui/core/colors";
import { useHistory, useLocation } from "react-router-dom";
import logoutIcon from "../assets/logouticon.svg";
import { logout } from "../actions/userActions";
import { useDispatch } from "react-redux";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
  return {
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    list: {
      padding: `${theme.spacing(3)}px 0`,
    },
    listItemText: {
      fontWeight: 500,
    },
    listItem: {
      borderRight: `4px solid transparent`,
      transition: "background-color 300ms ease-out",
      "&:hover": {
        backgroundColor: indigo[100],
        borderRight: `4px solid ${theme.palette.primary.main}`,
      },
    },
    listItemActive: {
      backgroundColor: indigo[100],
      borderRight: `4px solid ${theme.palette.primary.main}`,
      "&:hover": {
        backgroundColor: indigo[100],
        borderRight: `4px solid ${theme.palette.primary.main}`,
      },
    },
    listItemNested: {
      borderRight: `4px solid transparent`,
      paddingLeft: theme.spacing(2),
      transition: "background-color 300ms ease-out",
      "&:hover": {
        backgroundColor: indigo[100],
        borderRight: `4px solid ${theme.palette.primary.main}`,
      },
    },
    listItemActiveNested: {
      paddingLeft: theme.spacing(2),
      backgroundColor: indigo[100],
      borderRight: `4px solid ${theme.palette.primary.main}`,
      "&:hover": {
        backgroundColor: indigo[100],
        borderRight: `4px solid ${theme.palette.primary.main}`,
      },
    },
  };
});

const SideDrawer = () => {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleClick = () => {
    setOpen(!open);
  };

  //logout handler

  const logoutHandler = () => {
    dispatch(logout());
  };

  const drawerItems = [
    {
      text: "Dashboard",
      icon: <DashboardRounded />,
      link: "/app/dashboard",
    },
    {
      text: "Add Notes",
      icon: <PostAddRounded />,
      link: "/app/notes/create",
    },
    {
      text: "Settings",
      icon: <SettingsRounded />,
      link: "/app/user/settings",
      childern: [
        {
          text: "Update Password",
          icon: <VpnKeyRounded />,
          link: "/app/user/settings/updatePassword",
        },
        {
          text: "Update Profile",
          icon: (
            <SvgIcon>
              <g>
                <path d="M0,0h24v24H0V0z" fill="none" />
              </g>
              <g>
                <g>
                  <path d="M10.67,13.02C10.45,13.01,10.23,13,10,13c-2.42,0-4.68,0.67-6.61,1.82C2.51,15.34,2,16.32,2,17.35V19c0,0.55,0.45,1,1,1 h8.26C10.47,18.87,10,17.49,10,16C10,14.93,10.25,13.93,10.67,13.02z" />
                  <circle cx="10" cy="8" r="4" />
                  <path d="M20.75,16c0-0.22-0.03-0.42-0.06-0.63l0.84-0.73c0.18-0.16,0.22-0.42,0.1-0.63l-0.59-1.02c-0.12-0.21-0.37-0.3-0.59-0.22 l-1.06,0.36c-0.32-0.27-0.68-0.48-1.08-0.63l-0.22-1.09c-0.05-0.23-0.25-0.4-0.49-0.4h-1.18c-0.24,0-0.44,0.17-0.49,0.4 l-0.22,1.09c-0.4,0.15-0.76,0.36-1.08,0.63l-1.06-0.36c-0.23-0.08-0.47,0.02-0.59,0.22l-0.59,1.02c-0.12,0.21-0.08,0.47,0.1,0.63 l0.84,0.73c-0.03,0.21-0.06,0.41-0.06,0.63s0.03,0.42,0.06,0.63l-0.84,0.73c-0.18,0.16-0.22,0.42-0.1,0.63l0.59,1.02 c0.12,0.21,0.37,0.3,0.59,0.22l1.06-0.36c0.32,0.27,0.68,0.48,1.08,0.63l0.22,1.09c0.05,0.23,0.25,0.4,0.49,0.4h1.18 c0.24,0,0.44-0.17,0.49-0.4l0.22-1.09c0.4-0.15,0.76-0.36,1.08-0.63l1.06,0.36c0.23,0.08,0.47-0.02,0.59-0.22l0.59-1.02 c0.12-0.21,0.08-0.47-0.1-0.63l-0.84-0.73C20.72,16.42,20.75,16.22,20.75,16z M17,18c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2 S18.1,18,17,18z" />
                </g>
              </g>
            </SvgIcon>
          ),
          link: "/app/user/settings/updateProfile",
        },
      ],
    },
  ];
  console.log(open);
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
    >
      <Toolbar />

      <List className={classes.list}>
        {drawerItems.map((item, index) => {
          if (item.text === "Settings") {
            return (
              <div key={index}>
                <ListItem
                  button
                  className={
                    pathname === item.link
                      ? classes.listItemActive
                      : classes.listItem
                  }
                  onClick={handleClick}
                >
                  <ListItemIcon className={classes.listItemicon}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText>
                    <Typography className={classes.listItemText}>
                      {item.text}
                    </Typography>
                  </ListItemText>
                  {open ? <ExpandMore /> : <ExpandLess />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.childern.map((childItem, childIndex) => {
                      return (
                        <ListItem
                          key={childIndex}
                          button
                          className={
                            pathname === childItem.link
                              ? classes.listItemActiveNested
                              : classes.listItemNested
                          }
                          onClick={() => history.push(childItem.link)}
                        >
                          <ListItemIcon className={classes.listItemicon}>
                            {childItem.icon}
                          </ListItemIcon>
                          <ListItemText>
                            <Typography className={classes.listItemText}>
                              {childItem.text}
                            </Typography>
                          </ListItemText>
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              </div>
            );
          } else {
            return (
              <ListItem
                key={index}
                button
                className={
                  pathname === item.link
                    ? classes.listItemActive
                    : classes.listItem
                }
                onClick={() => history.push(item.link)}
              >
                <ListItemIcon className={classes.listItemicon}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText>
                  <Typography className={classes.listItemText}>
                    {item.text}
                  </Typography>
                </ListItemText>
              </ListItem>
            );
          }
        })}
        <ListItem onClick={logoutHandler} button className={classes.listItem}>
          <ListItemIcon>
            <img src={logoutIcon} />
          </ListItemIcon>
          <ListItemText>
            <Typography className={classes.listItemText}>Logout</Typography>
          </ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideDrawer;
