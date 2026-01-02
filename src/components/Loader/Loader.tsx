import { Box } from "@mui/material";
import "./style.css";

const Loader = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "200px",
    }}
  >
    <div className="loader" />
  </Box>
);

export default Loader;
