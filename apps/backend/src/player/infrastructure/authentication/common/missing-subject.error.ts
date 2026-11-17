export class MissingSubjectError extends Error {
  readonly message = 'Subject is missing from token';
  readonly name = MissingSubjectError.name;
}
