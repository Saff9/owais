import { ReactFiberTreeDiagram } from "./react-fiber-tree";
import { DomPipelineDiagram } from "./dom-pipeline-diagram";
import { EventLoopDiagram } from "./event-loop-diagram";
import { CacheFlowDiagram } from "./cache-flow-diagram";
import { BackendRoadmapDiagram } from "./backend-roadmap-diagram";

export function CourseDiagram({
  type,
}: {
  type?: "backend-roadmap" | "fiber-tree" | "dom-pipeline" | "event-loop" | "cache-flow" | "none";
}) {
  if (!type || type === "none") return null;

  switch (type) {
    case "backend-roadmap":
      return <BackendRoadmapDiagram />;
    case "fiber-tree":
      return <ReactFiberTreeDiagram />;
    case "dom-pipeline":
      return <DomPipelineDiagram />;
    case "event-loop":
      return <EventLoopDiagram />;
    case "cache-flow":
      return <CacheFlowDiagram />;
    default:
      return null;
  }
}
