import { Box, Typography } from "@mui/material";
import sadFaceSvg from "../assets/svg/sad-face.svg";
import { ERROR_PAGE_TEXT } from "../constants";

const ErrorPage = () => {
  return (
    <Box
      textAlign="center"
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={sadFaceSvg} alt={ERROR_PAGE_TEXT.ALT.SAD_FACE} width={200} />
      <Typography variant="h2">{ERROR_PAGE_TEXT.TITLE}</Typography>
      <Typography>{ERROR_PAGE_TEXT.DESCRIPTION}</Typography>
    </Box>
  );
};

export default ErrorPage;
