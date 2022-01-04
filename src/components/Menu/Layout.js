import * as React from "react";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListAltTwoToneIcon from "@mui/icons-material/ListAltTwoTone";
import PlaylistAddCircleTwoToneIcon from "@mui/icons-material/PlaylistAddCircleTwoTone";
import { makeStyles } from "@material-ui/core";
import Drawer from "@mui/material/Drawer";
import logo from "../../assets/images/logo.png";
import Box from "@mui/material/Box";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    drawerPaper: {
      width: drawerWidth,
    },
  };
});

const Layout = ({ children }) => {
  const history = useHistory();
  const classes = useStyles();

  const menuItems = [
    {
      text: "Entities",
      path: "entities",
      icon: <ListAltTwoToneIcon />,
      active: true,
    },
    {
      text: "Fields",
      path: "fields",
      icon: <PlaylistAddCircleTwoToneIcon />,
      active: false,
    },
    {
      text: "Actions",
      path: "actions",
      icon: <PlaylistAddCircleTwoToneIcon />,
      active: false,
    },
    {
      text: "Enums",
      path: "enums",
      icon: <ListAltTwoToneIcon />,
      active: true,
    },
    {
      text: "EnumMembers",
      path: "enumMembers",
      icon: <PlaylistAddCircleTwoToneIcon />,
      active: false,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        style={{
          width: drawerWidth,
        }}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div>
          <Typography
            variant="h5"
            sx={{
              padding: 2,
            }}
          >
            <img
              style={{ width: "30px" }}
              src={logo}
              alt="logo"
              loading="lazy"
            />{" "}
            SMS
          </Typography>
        </div>

        {/* links/list section */}
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={`listKey${index}`}
              onClick={() => history.push(`/${item.path}`)}
              // className={item.active ? classes.active : ""}
              style={item.active ? { background: "#f4f4f4" } : {}}
            >
              {item.icon}
              <ListItemText key={`textKey${index}`} primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* main content */}
      <Box
        sx={{
          background: "#f9f9f9",
          width: "100%",
          height: "100vh",
          padding: 0.5,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
