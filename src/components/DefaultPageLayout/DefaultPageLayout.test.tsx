import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DefaultPageLayout, { DefaultPageLayoutProps } from "./DefaultPageLayout";

const setup = (setupProps = {}) => {
  const props: DefaultPageLayoutProps = {
    pageTitle: "Test Title",
    ...setupProps,
  };
  const { container } = render(<DefaultPageLayout {...props} />);
  return container;
};
describe("DefaultPageLayout", () => {
  it("with all props", () => {
    const container = setup();
    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
  });
  it("renders the page title when provided", () => {
    render(<DefaultPageLayout pageTitle="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });
  it("renders children when loading is false", () => {
    render(
      <DefaultPageLayout>
        <div>Child Element</div>
      </DefaultPageLayout>
    );
    expect(screen.getByText("Child Element")).toBeInTheDocument();
  });

  it("does not render PageHeader if pageTitle is not provided", () => {
    render(<DefaultPageLayout />);
    expect(screen.queryByText("Mocked PageHeader")).not.toBeInTheDocument();
  });

  it("does not render PageContentLoader if loading is false", () => {
    render(<DefaultPageLayout />);
    expect(
      screen.queryByText("Mocked PageContentLoader")
    ).not.toBeInTheDocument();
  });
});
