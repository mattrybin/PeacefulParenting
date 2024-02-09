import { ReactNode } from "react";

export const PageContainer = ({ children }: { children: ReactNode }) => (
  <div className="px-3">{children}</div>
);

export const SectionContainer = ({ children }: { children: ReactNode }) => (
  <div className="max-content">{children}</div>
);
