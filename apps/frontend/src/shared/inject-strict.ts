import { type InjectionKey, inject } from 'vue';

export function injectStrict<Dependency>(dependencyToken: InjectionKey<Dependency>): Dependency {
  const dependency = inject(dependencyToken);
  if (!dependency) {
    throw new Error(`Dependency ${dependencyToken.description} is not provided`);
  }
  return dependency;
}
