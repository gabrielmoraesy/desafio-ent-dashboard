import { Fragment } from "react/jsx-runtime";
import { useDashboardReviews } from "./DashboardReviews.hook";
import { HeaderDashboardReviews } from "./fragments/HeaderDashboardReviews";
import { MainDashboardReviews } from "./fragments/MainDashboardReviews";

export const DashboardReviews = () => {
  useDashboardReviews()

  return (
    <Fragment>
      <HeaderDashboardReviews />
      <MainDashboardReviews />
    </Fragment>
  );
};

