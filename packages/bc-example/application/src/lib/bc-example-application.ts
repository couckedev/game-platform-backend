import { createExampleAggregate } from "bc-example-domain";

export interface ExampleUseCaseResult {
  aggregateId: string;
}

export function bcExampleApplication(id: string): ExampleUseCaseResult {
  const aggregate = createExampleAggregate(id);

  return { aggregateId: aggregate.id };
}
