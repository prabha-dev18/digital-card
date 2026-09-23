import { Suspense } from "react";
import HomeShell from "../components/HomeShell";

// HomeShell reads ?data= via useSearchParams → must sit inside a Suspense boundary.
export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center bg-[#eef1f5] text-sm text-slate-500">
          Loading your digital business card…
        </div>
      }
    >
      <HomeShell />
    </Suspense>
  );
}