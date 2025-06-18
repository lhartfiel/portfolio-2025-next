import getHomepageData from "../api/homepage";
import { DataError } from "@/components/DataError";
import { HomeLayout } from "@/components/Home/HomeLayout";

const Home = async () => {
  let homeData = null;
  try {
    homeData = await getHomepageData();
  } catch (error) {
    console.error("Error loading homepage data:", error);
  }

  if (!homeData) {
    return <DataError />;
  }

  return (
    <div className="w-full mx-[12px]">
      <HomeLayout homeData={homeData} />
    </div>
  );
};

export default Home;
