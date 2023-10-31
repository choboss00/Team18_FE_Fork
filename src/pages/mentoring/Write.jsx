import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import Loader from "../../components/common/Loader";
import Error from "../../components/common/Error";
import WriteSection from "../../components/mentoring/writeEdit/WriteSection";

export default function Write() {
  return (
    <Suspense fallback={<Loader />}>
      <ErrorBoundary
        fallback={<Error errorMessage="Failed to load write page" />}
      >
        <WriteSection />
      </ErrorBoundary>
    </Suspense>
  );
}
