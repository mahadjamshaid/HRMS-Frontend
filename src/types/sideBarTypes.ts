export type SidebarChildItem = {
  label: string;
  path: string;
};

export type SidebarItem = {
  label: string;
  icon?: string;
  path?: string;
  children?: SidebarChildItem[];
};
