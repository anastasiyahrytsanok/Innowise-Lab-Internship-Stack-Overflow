import { Avatar, ListItem, ListItemButton, ListItemText } from "@mui/material";
import defaultAvatar from "@/assets/avatar-default.png";
import type { UserListItemProps } from "./UserListItem.types";

const UserListItem = ({ user, onClick }: UserListItemProps) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => onClick(user.id)}
        sx={{
          border: "1px solid #c1c8d7",
          borderRadius: "14px",
          padding: "15px",
        }}
      >
        <Avatar alt="default" src={defaultAvatar} sx={{ marginRight: "15px" }} />
        <ListItemText primary={user.username} />
      </ListItemButton>
    </ListItem>
  );
};

export default UserListItem;
