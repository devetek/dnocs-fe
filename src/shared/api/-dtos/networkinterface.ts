export interface NetworkInterface {
  interface_name?: string;
  interface_data?: NetworkInterfaceData[];
}

export interface NetworkInterfaceData {
  subnet?: string;
  address?: string;
  ip_v4?: string;
  ip_v6?: string;
  is_interface_local_multicast?: boolean;
  is_link_local_multicast?: boolean;
  is_link_local_unicast?: boolean;
  is_global_unicast?: boolean;
  is_multicast?: boolean;
  is_loopback?: boolean;
}