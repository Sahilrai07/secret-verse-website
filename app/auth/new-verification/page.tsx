// app/auth/new-verification/page.tsx
import EmailVerifiedPage from "@/components/custom/EmailVerifiedPage";
import { Suspense } from "react";

export default function NewVerificationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center mt-32 text-yellow-400">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_25px_rgba(253,224,71,0.6)]" />
          <p className="text-lg font-semibold tracking-wide animate-pulse">
            Verifying your email...
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Please wait while we complete the magic ✨
          </p>
        </div>
      }
    >
      <EmailVerifiedPage />
    </Suspense>
  );
}
