import { SkillType } from "./Projects";

const SkillsTag = ({ tag }: { tag: SkillType }) => {
  return (
    <span
      data-testid="project-skill"
      className="bg-primary text-white font-medium text-[12px] px-2 py-1 mr-3 mb-4"
    >
      {tag?.type}
    </span>
  );
};

export { SkillsTag };
