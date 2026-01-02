import type { SidebarProps } from "./Sidebar.types";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ListAltIcon from "@mui/icons-material/ListAlt";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import GroupIcon from "@mui/icons-material/Group";
import { Avatar, IconButton, Typography } from "@mui/material";
import defaultAvatar from "@/assets/avatar-default.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { SIDEBAR_WIDTH } from "../../constants";

const sidebarArray = [
  { name: "Home", icon: <HomeIcon />, navigateTo: "/home" },
  { name: "My Account", icon: <PersonIcon />, navigateTo: "/myaccount" },
  { name: "Post snippet", icon: <ListAltIcon />, navigateTo: "/postsnippet" },
  { name: "My snippets", icon: <ListAltIcon />, navigateTo: "/mysnippets" },
  { name: "Questions", icon: <QuestionMarkIcon />, navigateTo: "/questions" },
  { name: "Users", icon: <GroupIcon />, navigateTo: "/users" },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  const handleNavigate = (to: string) => {
    navigate(to);
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isOpen}
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: SIDEBAR_WIDTH,
          boxSizing: "border-box",
          backgroundColor: "#1d7ade",
          color: "#ffffff",
          position: "relative", 
        },
      }}
    >
      <Box sx={{ height: "100%" }}>
        <Box
          sx={{
            p: 1.25,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar alt="default" src={defaultAvatar} />
            <Typography noWrap>{user?.username}</Typography>
          </Box>

          <IconButton onClick={() => onClose(false)} sx={{ color: "#fff" }}>
            <ArrowBackIosIcon fontSize="small" />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

        <List>
          {sidebarArray.map((field) => (
            <ListItem key={field.name} disablePadding>
              <ListItemButton onClick={() => handleNavigate(field.navigateTo)}>
                <ListItemIcon sx={{ color: "#ffffff", minWidth: 40 }}>
                  {field.icon}
                </ListItemIcon>
                <ListItemText primary={field.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
