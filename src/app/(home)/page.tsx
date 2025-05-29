import { getClient } from "../ApolloClient";
import { GET_HOME_PAGE } from "../api/graphql/queries";
import parse from "html-react-parser";
import Image from "next/image";

const Home = async () => {
  let homeData = [];
  try {
    const { data } = await getClient().query({ query: GET_HOME_PAGE });
    homeData = data?.home || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }

  console.log("home", homeData);
  return (
    <div className="w-full mx-[12px]">
      <div className="w-full px-6 gap-6 lg:grid lg:grid-cols-12">
        <div
          className="order-1 float-right w-1/2 ml-4 mb-4
                  lg:float-none lg:w-auto lg:ml-0 lg:mb-0
                  lg:order-2 lg:col-span-6 lg:col-start-7"
        >
          <div className="rounded-full max-w-full relative overflow-hidden md:-top-8">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${homeData.image}/`}
              alt={homeData.imageAlt || "Home Image"}
              width={600}
              height={600}
              style={{
                borderRadius: "50%",
                objectFit: "contain",
                objectPosition: "center",
              }}
            />
          </div>
        </div>
        <div className="order-2 lg:order-1 xl:col-span-4 xl:col-start-3 lg:col-span-5 lg:col-start-2 mb-8">
          <h1 className="text-h1-sm md:text-h1 text-primary font-kanit mb-6 mt-9 lg:mt-14">
            {homeData.title}
          </h1>
          <p className="text-intro-sm md:text-intro text-black">
            {parse(homeData.intro)}
          </p>
        </div>
      </div>

      <section className="col-span-4 px-6 grid-cols-4 md:col-span-12 grid md:grid-cols-12 gap-x-6 w-full justify-center items-center border-t-primary border-t-[10px] bg-secondary text-black py-11">
        <h2 className="col-span-4 md:col-span-10 lg:col-span-8 md:col-start-2 lg:col-start-3 text-h2-sm md:text-h2 font-kanit text-center w-full mb-4">
          {homeData.aboutHeading}
        </h2>
        <p className="text-body-sm md:text-body columns-2 col-span-4 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 gap-7">
          {parse(homeData.aboutDescription)}
        </p>
      </section>
    </div>
  );
};

export default Home;
