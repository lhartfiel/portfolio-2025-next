import { getUxProjectBySlug } from "src/app/api/uxprojects";
import { PageIntro } from "@/components/PageIntro";
import { UxBlock } from "@/components/UX/UxBlock";
import { UxDetails } from "@/components/UX/UxDetails";

interface UxProjectParams {
  params: Promise<{
    slug: string;
  }>;
}
export const revalidate = 86400;
export const dynamic = "force-static";

const UxProjectPage = async ({ params }: UxProjectParams) => {
  let uxProjectData = null;
  const { slug } = await params;

  try {
    uxProjectData = await getUxProjectBySlug({ slug });
  } catch (error) {
    console.error("Error loading about UX page data:", error);
  }

  if (!uxProjectData) {
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
      <PageIntro title={uxProjectData.title} intro={uxProjectData.intro} />
      <UxDetails
        role={uxProjectData.role}
        duration={uxProjectData.duration}
        type={uxProjectData.projectType}
      />
      <UxBlock
        blocks={
          Array.isArray(uxProjectData.blocks)
            ? uxProjectData.blocks
            : [uxProjectData.blocks]
        }
      />
    </>
  );
};

export default UxProjectPage;
