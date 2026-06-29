import { Introduction } from "@/components/sections/Introduction";
import { CreativeProjects } from "@/components/sections/CreativeProjects";
import { Timeline } from "@/components/sections/Timeline";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { WorkWithMe } from "@/components/sections/WorkWithMe";

export default function HomePage() {
  return (
    <>
      <Introduction />
      <WhatIDo />
      <Timeline />
      <CreativeProjects />
      <WorkWithMe />
    </>
  );
}
