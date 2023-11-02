import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import Loader from "../../components/common/Loader";
import Error from "../../components/common/Error";
import EditSection from "../../components/mentoring/writeEdit/EditSection";

export default function Edit() {
  return (
    <Suspense fallback={<Loader />}>
      <ErrorBoundary
        fallback={<Error errorMessage="Failed to load edit page" />}
      >
        <EditSection />
      </ErrorBoundary>
    </Suspense>
  );
}
