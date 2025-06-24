import { render, screen } from "@testing-library/react";
import { PageIntro } from "./PageIntro";

jest.mock("./Home/HomeImg", () => ({
  HomeImg: ({ image, imageAlt }: { image: string; imageAlt?: string }) => (
    <img
      src={image}
      alt={imageAlt || "Page Image"}
      data-testid="mock-home-img"
    />
  ),
}));

const introPropTitle = "Welcome to My Portfolio";
const introPropIntro = "<p>This is a brief introduction to my portfolio.</p>";
const introPropImage = "/assets/intro-image.jpg";
const introPropImageAlt = "Intro Image";
const introPropHighFiveCount = 100;
const introPropType = "home";
const introPropId = 1;

describe("PageIntro Component with no Image", () => {
  it("should render only the PageIntroContent if no image is provided", () => {
    render(
      <PageIntro
        title={introPropTitle}
        intro={introPropIntro}
        type={introPropType}
        id={introPropId}
      />
    );
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      introPropTitle
    );
    expect(screen.queryByTestId("intro")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByTestId("content-wrapper")).toHaveClass(
      "col-span-4 lg:col-span-10 lg:col-start-2 xl:col-span-6 xl:col-start-4 justify-center text-center my-9 lg:my-14"
    );
  });
});

describe("PageIntro Component with Image", () => {
  it("should render the yellow arrow and the image when type is 'home'", () => {
    render(
      <PageIntro
        title={introPropTitle}
        intro={introPropIntro}
        type={introPropType}
        image={introPropImage}
        imageAlt={introPropImageAlt}
        highFiveCount={introPropHighFiveCount}
        id={introPropId}
      />
    );
    expect(
      screen.getByRole("img", { name: /yellow arrow/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /yellow arrow/i })).toHaveAttribute(
      "alt",
      "yellow arrow"
    );
    expect(screen.getByRole("img", { name: /yellow arrow/i })).toHaveAttribute(
      "width",
      "100"
    );
  });

  it("should render the HomeImg component with the provided image and alt text if the type is 'home'", () => {
    render(
      <PageIntro
        title={introPropTitle}
        intro={introPropIntro}
        type={introPropType}
        image={introPropImage}
        imageAlt={introPropImageAlt}
        highFiveCount={introPropHighFiveCount}
        id={introPropId}
      />
    );
    expect(screen.getByTestId("mock-home-img")).toBeInTheDocument();
    expect(screen.getByTestId("mock-home-img")).toHaveAttribute(
      "src",
      introPropImage
    );
    expect(screen.getByTestId("mock-home-img")).toHaveAttribute(
      "alt",
      introPropImageAlt
    );
  });

  it("should display the Next Image with the provided image and alt text if the type is not 'home'", () => {
    render(
      <PageIntro
        title={introPropTitle}
        intro={introPropIntro}
        type=""
        image={introPropImage}
        imageAlt={introPropImageAlt}
        highFiveCount={introPropHighFiveCount}
        id={introPropId}
      />
    );

    expect(
      screen.getByRole("img", { name: introPropImageAlt })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: introPropImageAlt })
    ).toHaveAttribute(
      "src",
      `${process.env.NEXT_PUBLIC_IMAGE_PATH}${introPropImage}`
    );
    expect(
      screen.getByRole("img", { name: introPropImageAlt })
    ).toHaveAttribute("alt", introPropImageAlt);
    expect(
      screen.getByRole("img", { name: introPropImageAlt })
    ).toHaveAttribute("width", "600");
  });

  it("should display the default alt text when the imageAlt prop is not provided", () => {
    render(
      <PageIntro
        title={introPropTitle}
        intro={introPropIntro}
        type=""
        image={introPropImage}
        imageAlt=""
        highFiveCount={introPropHighFiveCount}
        id={introPropId}
      />
    );

    expect(screen.getByRole("img")).toHaveAttribute("alt", "Page Image");
  });

  it("should render the PageIntroContent with appropriate class names", () => {
    render(
      <PageIntro
        title={introPropTitle}
        intro={introPropIntro}
        image={introPropImage}
        type={introPropType}
        id={introPropId}
      />
    );
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      introPropTitle
    );
    expect(screen.queryByTestId("intro")).toBeInTheDocument();
    expect(screen.getByTestId("content-wrapper")).toHaveClass(
      "order-2 lg:order-1 lg:col-span-5 lg:col-start-2 xl:col-span-4 xl:col-start-3 my-9 lg:my-14"
    );
  });
});
