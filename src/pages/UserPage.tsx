import { Navigate, useParams } from "react-router-dom";
import { useUserStatisticQuery } from "../api/users/useUserStatisticQuery";
import Loader from "../components/Loader/Loader";
import UserProfileBlock from "../components/UserProfileBlock/UserProfileBlock";
import { PAGE_NAVIGATION } from "../constants";

const UserPage = () => {
  const { userId } = useParams<{ userId?: string }>();

  const { data, isLoading, isError } = useUserStatisticQuery(userId);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Navigate to={PAGE_NAVIGATION.ERROR} replace />;
  }

  if (!data) {
    return;
  }
  return (
    <UserProfileBlock user={data.data} userStatistic={data?.data.statistic} />
  );
};

export default UserPage;
