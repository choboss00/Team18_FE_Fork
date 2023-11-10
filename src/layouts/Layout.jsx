import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import GNB from "./GNB";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "../components/common/Loader";
import Error from "../components/account/atoms/Error";
import { UserContent } from "./UserContent";

export default function Layout() {
  const token = window.localStorage.getItem("token");

  if (!token) {
    return (
      <div className="relative">
        <GNB profileImage={null} />
        <main className="pt-20 pb-20 min-h-screen bg-green-100 flex flex-col">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <Suspense fallback={<Loader />}>
      <ErrorBoundary
        FallbackComponent={(props) => (
          <Error
            error={props.error?.response?.status}
            errorMessage={props.error.message}
          />
        )}
      >
        <UserContent enabled={!!token} />
      </ErrorBoundary>
    </Suspense>
  );
}
