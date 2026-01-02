import { Box, Typography } from "@mui/material";
import { useUserStatisticQuery } from "../api/users/useUserStatisticQuery";
import EditProfileBlock from "../components/EditProfileBlock/EditProfileBlock";
import UserProfileBlock from "../components/UserProfileBlock/UserProfileBlock";
import { useAuthStore } from "../store/auth.store";
import { MY_ACCOUNT_PAGE_TEXT, PAGE_NAVIGATION } from "../constants";
import Loader from "../components/Loader/Loader";
import { Navigate } from "react-router-dom";

const MyAccountPage = () => {
  const user = useAuthStore((s) => s.user);

  const { data, isLoading, isError } = useUserStatisticQuery(user?.id);
  const userStatistic = data?.data.statistic;

  if (!user || !userStatistic) {
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }

 if (isError) {
    return <Navigate to={PAGE_NAVIGATION.ERROR} replace />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">
        {MY_ACCOUNT_PAGE_TEXT.TITLE},&nbsp;
        <Typography
          variant="h4"
          component="span"
          sx={{ color: "primary.main", fontWeight: 600 }}
        >
          {user.username}
        </Typography>
        !
      </Typography>
      <UserProfileBlock
        user={user}
        userStatistic={userStatistic}
        isCurrentUser
      />
      <EditProfileBlock />
    </Box>
  );
};

export default MyAccountPage;
