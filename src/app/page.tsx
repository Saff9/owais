import { Hero } from "@/components/home/hero";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { SkillsPreview } from "@/components/home/skills-preview";
import { LatestWriting } from "@/components/home/latest-writing";
import { ExperiencePreview } from "@/components/home/experience-preview";
import { CtaBand } from "@/components/home/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <SkillsPreview />
      <LatestWriting />
      <ExperiencePreview />
      <CtaBand />
    </>
  );
}
