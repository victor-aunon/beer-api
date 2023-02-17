import type { InMemoryUsage } from "./in-memory-usage.schema";

export interface InMemoryDispenser {
  id: UniqueId;
  status: DispenserStatus;
  flow_volume: number;
  cost_litre: number;
  usages: InMemoryUsage[];
}
