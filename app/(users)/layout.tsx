// app/(user)/layout.tsx
import LayoutWrapper from "@/components/custom/LayoutWrapper";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
