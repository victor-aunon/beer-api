export interface InMemoryUsage {
  opened_at: DateTimeString;
  closed_at: null | DateTimeString;
  flow_volume: number;
  total_spent: number;
}
