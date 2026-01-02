import { Box, Typography } from "@mui/material";
import { MY_ACCOUNT_PAGE_TEXT } from "../../constants";
import ChangeUserNameForm from "../ChangeUserNameForm/ChangeUserNameForm";
import ChangePasswordForm from "../ChangePasswordForm/ChangePasswordForm";

const EditProfileBlock = () => {
  return (
    <>
      <Box
        sx={{
          border: "1px solid #c1c8d7",
          borderRadius: "14px",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "70%",
        }}
      >
        <Typography fontStyle="italic" sx={{ textDecoration: "underline" }}>
          {MY_ACCOUNT_PAGE_TEXT.EDIT_FORM.TITLE}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "30px",
          }}
        >
          <ChangeUserNameForm />
          <ChangePasswordForm />
        </Box>
      </Box>
    </>
  );
};

export default EditProfileBlock;
