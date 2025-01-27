import { useReviews } from "@/api/reviews";
import { Fragment } from "react/jsx-runtime";
import { HeaderDashboardReviews } from "./fragments/HeaderDashboardReviews";
import { MainDashboardReviews } from "./fragments/MainDashboardReviews";
import { SkeletonDashboardReviews } from "./fragments/SkeletonDashboardReviews";
import { useFilter } from "@/hooks/useFilter";
import { useFiltersContext } from "@/contexts/FiltersProvider/filters-provider";

export const DashboardReviews = () => {
  const { isLoading, data: reviews = [] } = useReviews();
  const { startDate, endDate, unitSelected } = useFiltersContext()
  const { filteredReviews } = useFilter({
    reviews,
    filterOptions: {
      unitSelected,
      startDate,
      endDate
    }
  })

  if (isLoading) {
    return <SkeletonDashboardReviews />;
  }

  return (
    <Fragment>
      <HeaderDashboardReviews filteredReviews={filteredReviews} />
      <MainDashboardReviews filteredReviews={filteredReviews} />
    </Fragment>
  );
};



