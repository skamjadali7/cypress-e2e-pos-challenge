import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PageHeader from './PageHeader';

describe('PageHeader', () => {
  it('renders the page title', () => {
    const { getByText } = render(<PageHeader pageTitle="Test Title" />);
    expect(getByText('Test Title')).toBeInTheDocument();
  });

  it('renders children elements', () => {
    const { getByText } = render(
      <PageHeader>
        <p>Child Element</p>
      </PageHeader>
    );
    expect(getByText('Child Element')).toBeInTheDocument();
  });

  it('does not render an h1 if no page title is provided', () => {
    const { container } = render(<PageHeader />);
    expect(container.querySelector('h1')).toBeNull();
  });
});
