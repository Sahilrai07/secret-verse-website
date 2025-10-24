import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full flex h-screen overflow-hidden">{children}</div>;
};

export default AdminLayout;
