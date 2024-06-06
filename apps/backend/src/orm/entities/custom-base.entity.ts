import { Opt, PrimaryKey, Property } from '@mikro-orm/core';
import { nanoid } from 'nanoid';

/**
 *  You should inherit this class in all entities.
 */
export abstract class CustomBaseEntity {
  @PrimaryKey({ length: 21 })
  id = nanoid();

  @Property()
  createdAt: Date & Opt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date & Opt = new Date();
}
