import { Avatar, ListItem, Typography } from "@mui/material";
import defaultAvatar from "@/assets/avatar-default.png";
import type { CommentsListItemProps } from "./CommentsListItem.types";

const CommentsListItem = ({ comment }: CommentsListItemProps) => {
  return (
    <ListItem
      key={comment.id}
      sx={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}
    >
      <Avatar alt="default" src={defaultAvatar} sx={{ marginRight: "15px" }} />
      <Typography sx={{ fontSize: "15px", opacity: "0.8" }}>
        {comment.content}
      </Typography>
    </ListItem>
  );
};

export default CommentsListItem;
