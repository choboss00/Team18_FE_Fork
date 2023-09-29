import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  Navigate,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Navigate to="watching/videos" />} />
      <Route path="login" element={<h1>LogIn</h1>} />
      <Route path="signup" element={<h1>SignUp</h1>} />
      <Route
        element={
          <>
            <h1>AuthCheck</h1>
            <Outlet />
          </>
        }
      >
        <Route path="interest" element={<h1>Interest</h1>} />
      </Route>
      <Route
        element={
          <>
            <h1>Layout</h1>
            <Outlet></Outlet>
          </>
        }
      >
        <Route path="watching/videos" element={<h1>Vidoes</h1>} />
        <Route path="watching/video/:videoId" element={<h1>Video</h1>} />
        <Route path="mentoring/posts" element={<h1>Posts</h1>} />
        <Route path="mentoring/post/:postId" element={<h1>Post</h1>} />
        <Route path="chatting/rooms" element={<h1>Rooms</h1>} />
        <Route
          path="chatting/roomprofile/:roomId"
          element={<h1>RoomProfile</h1>}
        />
        <Route
          element={
            <>
              <h1>AuthCheck</h1>
              <Outlet />
            </>
          }
        >
          <Route path="watching/history" element={<h1>History</h1>} />
          <Route path="mentoring/write" element={<h1>PostWrite</h1>} />
          <Route path="mentoring/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="chatting/room/:roomId" element={<h1>Room</h1>} />
          <Route path="chatting/create" element={<h1>RoomCreate</h1>} />
          <Route path="mypage/profile" element={<h1>Profile</h1>} />
          <Route path="mypage/profile/fix" element={<h1>ProfileFix</h1>} />
          <Route path="mypage/information" element={<h1>Information</h1>} />
          <Route
            path="mypage/information/fix"
            element={<h1>InformationFix</h1>}
          />
        </Route>
      </Route>
      <Route path="*" element={<h1>NotFound</h1>} />
    </Route>
  )
);

function App() {
  const [count, setCount] = useState(0);

  return <RouterProvider router={router} />;
}

export default App;
