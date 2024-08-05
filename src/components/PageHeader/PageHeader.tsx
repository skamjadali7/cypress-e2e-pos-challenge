import React from 'react';
import './PageHeader.scss';
interface PageHeaderProps {
  className?: string;
  pageTitle?: string;
  children?: React.ReactNode;
}
//Reusable component to accept page Title etc
const PageHeader: React.FC<PageHeaderProps> = ({ className, pageTitle, children }) => {
  return (
    <header className={`page-header ${className}`}>
      {pageTitle && <h1>{pageTitle}</h1>}
      {children && <div className="children-content">{children}</div>}
    </header>
  );
};

export default PageHeader;
