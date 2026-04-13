export interface ExampleAggregate {
  id: string;
}

export function createExampleAggregate(id: string): ExampleAggregate {
  return { id };
}
