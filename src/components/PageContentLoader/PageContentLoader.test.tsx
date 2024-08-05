import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PageContentLoader from './PageContentLoader';

describe('PageContentLoader', () => {
  it('renders the loading text', () => {
    const { getByText } = render(<PageContentLoader />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('has the correct class name', () => {
    const { container } = render(<PageContentLoader />);
    expect(container.firstChild).toHaveClass('page-content-loader');
  });
});
