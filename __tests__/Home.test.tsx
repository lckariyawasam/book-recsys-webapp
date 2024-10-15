import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import MarketingPage from "@/app/(marketing)/page"; // Ensure the path to your Page component is correct
import { useRouter } from "next/router";
import userEvent from "@testing-library/user-event";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />
}));

// Mock the next/link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => children,
}));

describe("MarketingPage", () => {
  it("renders the main heading", () => {
    render(<MarketingPage />);
    const heading = screen.getByRole('heading', { name: /Discover Your Next Favorite Book with BookMatch/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders the subheading", () => {
    render(<MarketingPage />);
    const subheading = screen.getByText(/Choose your path to personalized book recommendations/i);
    expect(subheading).toBeInTheDocument();
  });

  it("renders the 'Find Similar' button in the hero section", () => {
    render(<MarketingPage />);

    // Get the 'hero' section by test id
    const heroSection = screen.getByTestId("hero-section");
    const findSimilarButton = within(heroSection).getByRole("button", { name: /Find Similar/i });

    expect(findSimilarButton).toBeInTheDocument();
  });

  it("renders the 'Find Similar' button in the feature section", () => {
    render(<MarketingPage />);

    // Get the 'feature' section by test id
    const featureSection = screen.getByTestId("feature-section");
    const findSimilarButton = within(featureSection).getByRole("button", { name: /Find Similar/i });

    expect(findSimilarButton).toBeInTheDocument();
  });

  it("renders the 'Add Books' button", () => {
    render(<MarketingPage />);
    const addBooksButton = screen.getByRole('button', { name: /Add Books/i });
    expect(addBooksButton).toBeInTheDocument();
  });

  it("renders the 'How BookMatch Works' section", () => {
    render(<MarketingPage />);
    const howItWorksHeading = screen.getByRole('heading', { name: /How BookMatch Works/i });
    expect(howItWorksHeading).toBeInTheDocument();
  });

  it("renders the feature image", () => {
    render(<MarketingPage />);
    const featureImage = screen.getByAltText('fearure-section-image');
    expect(featureImage).toBeInTheDocument();
  });
});
