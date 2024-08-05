import React, { FC } from "react";
import PageHeader from "../PageHeader/PageHeader";
import PageContentLoader from "../PageContentLoader/PageContentLoader";
import "./default-page-layout.scss";

//Added loading component to use while working with apis
export interface DefaultPageLayoutProps {
  pageTitle?: string;
  children?: React.ReactNode;
  loading?: boolean;
}
//Common layout page that could be used as a provider around all the pages to contain common details
const DefaultPageLayout: FC<DefaultPageLayoutProps> = ({
  pageTitle,
  children,
  loading,
}) => {
  const renderMain = () => {
    if (loading) {
      return <PageContentLoader />;
    }
    return children;
  };
  const showPageHeader = pageTitle;

  return (
    <div>
      {showPageHeader && <PageHeader pageTitle={pageTitle} />}
      {renderMain()}
    </div>
  );
};

export default DefaultPageLayout;
