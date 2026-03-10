export interface PortInUsed {
  port?: number;
  allow_from?: string;
  process_id?: number;
  process_name?: string;
  state?: string;
}