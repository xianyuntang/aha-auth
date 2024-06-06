import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export function validateObject<T>(
  objectClass: ClassConstructor<T>,
  object: Record<string, unknown>
) {
  const validatedObject = plainToInstance(objectClass, object, {
    enableImplicitConversion: true,
  }) as unknown as T;
  const errors = validateSync(validatedObject as object, {
    skipMissingProperties: false,
  });

  return [validatedObject, errors] as const;
}
