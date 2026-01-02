import { Box, List, Typography } from "@mui/material";
import UserListItem from "../components/UserListItem/UserListItem";
import { PAGE_NAVIGATION, USERS_PAGE_TEXT } from "../constants";
import Loader from "../components/Loader/Loader";
import { Navigate, useNavigate } from "react-router-dom";
import { useUsersInfiniteQuery } from "../api/users/useUsersInfiniteQuery";
import { useEffect, useMemo, useRef } from "react";

const UsersPage = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUsersInfiniteQuery();

  const navigate = useNavigate();

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const users = useMemo(
    () => data?.pages.flatMap((p) => p.data.data) ?? [],
    [data]
  );

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "600px",
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const isUsersExist = users && users?.length !== 0;

  const handleUserItemClick = (userId: string) => {
    navigate(`${PAGE_NAVIGATION.USERS}/${userId}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Navigate to={PAGE_NAVIGATION.ERROR} replace />;
  }

  return (
    <>
      <List sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {isUsersExist ? (
          users.map((user) => (
            <UserListItem
              user={user}
              onClick={handleUserItemClick}
              key={user.id}
            />
          ))
        ) : (
          <Typography variant="h4" textAlign={"center"} sx={{ mt: "50px" }}>
            {USERS_PAGE_TEXT.NO_USERS}
          </Typography>
        )}
      </List>

      <Box ref={sentinelRef} sx={{ height: 30 }} />
    </>
  );
};

export default UsersPage;
