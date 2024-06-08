export type ExtractArrayElementType<T> = T extends Array<infer U> ? U : never;
