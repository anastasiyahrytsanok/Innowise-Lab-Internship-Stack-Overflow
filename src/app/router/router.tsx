import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import HomePage from "../../pages/HomePage";
import { AuthLayout } from "../layouts/AuthLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import MyAccountPage from "../../pages/MyAccountPage";
import PostPage from "../../pages/PostPage";
import CreatePostSnippetPage from "../../pages/CreatePostSnippetPage";
import MySnippetsPage from "../../pages/MySnippetsPage";
import QuestionsPage from "../../pages/QuestionsPage";
import UsersPage from "../../pages/UsersPage";
import { PAGE_NAVIGATION } from "../../constants";
import EditSnippetPage from "../../pages/EditSnippetPage";
import UserPage from "../../pages/UserPage";
import CreateQuestionPage from "../../pages/CreateQuestionPage";
import QuestionPage from "../../pages/QuestionPage";
import EditQuestionPage from "../../pages/EditQuestionPage";
import ErrorPage from "../../pages/ErrorPage";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to={PAGE_NAVIGATION.HOME} replace /> },

      { path: PAGE_NAVIGATION.HOME, element: <HomePage /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: PAGE_NAVIGATION.MY_ACCOUNT, element: <MyAccountPage /> },
          { path: "/posts/:postId", element: <PostPage /> },
          {
            path: PAGE_NAVIGATION.POST_SNIPPETS,
            element: <CreatePostSnippetPage />,
          },
          {
            path: PAGE_NAVIGATION.MY_SNIPPETS,
            element: <MySnippetsPage />,
          },
          {
            path: `${PAGE_NAVIGATION.MY_SNIPPETS}/edit/:snippetId`,
            element: <EditSnippetPage />,
          },
          { path: PAGE_NAVIGATION.QUESTIONS, element: <QuestionsPage /> },
          {
            path: `${PAGE_NAVIGATION.QUESTIONS}/:questionId`,
            element: <QuestionPage />,
          },
          {
            path: `${PAGE_NAVIGATION.QUESTIONS}/create`,
            element: <CreateQuestionPage />,
          },
          {
            path: `${PAGE_NAVIGATION.QUESTIONS}/edit/:questionId`,
            element: <EditQuestionPage />,
          },
          {
            path: PAGE_NAVIGATION.USERS,
            element: <UsersPage />,
          },
          {
            path: `${PAGE_NAVIGATION.USERS}/:userId`,
            element: <UserPage />,
          },
        ],
      },
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      { path: PAGE_NAVIGATION.LOGIN, element: <LoginPage /> },
      { path: PAGE_NAVIGATION.REGISTRATION, element: <RegisterPage /> },
    ],
  },

  {
    path: `${PAGE_NAVIGATION.ERROR}`,
    element: <ErrorPage />,
  },
]);
