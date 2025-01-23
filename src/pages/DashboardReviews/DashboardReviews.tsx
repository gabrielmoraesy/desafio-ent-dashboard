import { useReviews } from "@/api/reviews";
import { Fragment } from "react/jsx-runtime";
import { HeaderDashboardReviews } from "./fragments/HeaderDashboardReviews";
import { MainDashboardReviews } from "./fragments/MainDashboardReviews";
import { SkeletonDashboardReviews } from "./fragments/SkeletonDashboardReviews";

export const DashboardReviews = () => {
  const { isLoading } = useReviews()

  if (isLoading) {
    return <SkeletonDashboardReviews />;
  }

  return (
    <Fragment>
      <HeaderDashboardReviews />
      <MainDashboardReviews />
    </Fragment>
  );
};

