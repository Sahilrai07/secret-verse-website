"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import React from "react";
const handleDownload = () => {
  window.open("/api/users/export", "_blank");
};
const DownloadBtn = () => {
  return (
    <Button className="flex items-center gap-x-2" onClick={handleDownload}>
      <Download className="w-4 h-4 mr-2" />
      Download Excel
    </Button>
  );
};

export default DownloadBtn;
