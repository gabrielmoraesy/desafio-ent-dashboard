import { useReviewsContext } from "@/contexts/ReviewsProvider/reviews-provider";
import { Fragment } from "react/jsx-runtime";
import { HeaderDashboardReviews } from "./fragments/HeaderDashboardReviews";
import { MainDashboardReviews } from "./fragments/MainDashboardReviews";
import { SkeletonDashboardReviews } from "./fragments/SkeletonDashboardReviews";

export const DashboardReviews = () => {
  const { isLoadingReviews } = useReviewsContext()

  if (isLoadingReviews) {
    return <SkeletonDashboardReviews />;
  }

  return (
    <Fragment>
      <HeaderDashboardReviews />
      <MainDashboardReviews />
    </Fragment>
  );
};



