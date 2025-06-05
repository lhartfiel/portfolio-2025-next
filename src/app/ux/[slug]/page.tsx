import { getUxProjectBySlug } from "src/app/api/uxprojects";
import { PageIntro } from "@/components/PageIntro";

interface UxProjectParams {
  params: Promise<{
    slug: string;
  }>;
}

const UxProject = async ({ params }: UxProjectParams) => {
  let uxProject = null;
  const { slug } = await params;

  try {
    uxProject = await getUxProjectBySlug({ slug });
  } catch (error) {
    console.error("Error loading about UX page data:", error);
  }

  console.log("ux", uxProject);

  if (!uxProject) {
    return (
      <div className="w-full mx-[12px]">
        <p className="text-red-500 text-lg">
          {"Sorry. We're having trouble loading the data."}
        </p>
      </div>
    );
  }
  return (
    <>
      <PageIntro title={uxProject.title} intro={uxProject.intro} />
    </>
  );
};

export default UxProject;
