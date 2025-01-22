import { Fragment } from "react/jsx-runtime";
import { useDashboardReviews } from "./DashboardReviews.hook";
import { HeaderDashboardReviews } from "./fragments/HeaderDashboardReviews";
import { MainDashboardReviews } from "./fragments/MainDashboardReviews";
import { SkeletonDashboardReviews } from "./fragments/SkeletonDashboardReviews";

export const DashboardReviews = () => {
  const { loading } = useDashboardReviews()

  if (loading) {
    return <SkeletonDashboardReviews />
  }

  return (
    <Fragment>
      <HeaderDashboardReviews />
      <MainDashboardReviews />
    </Fragment>
  );
};

