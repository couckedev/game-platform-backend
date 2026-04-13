import { bcExampleApplication } from "bc-example-application";
import { createExampleAggregate } from "bc-example-domain";

export interface ExampleProjection {
  aggregateId: string;
  projectionKey: string;
}

export function bcExampleInfrastructure(id: string): ExampleProjection {
  const result = bcExampleApplication(id);
  const aggregate = createExampleAggregate(result.aggregateId);

  return {
    aggregateId: aggregate.id,
    projectionKey: `projection-${aggregate.id}`,
  };
}
