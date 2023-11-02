import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import Loader from "../../components/common/Loader";
import Error from "../../components/common/Error";
import PostsSection from "../../components/mentoring/posts/PostsSection";

export default function Posts() {
  return (
    <Suspense fallback={<Loader />}>
      <ErrorBoundary
        fallback={<Error errorMessage="Failed to load mentoring list page" />}
      >
        <PostsSection />
      </ErrorBoundary>
    </Suspense>
  );
}
