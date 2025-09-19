export const getFeaturedContests = async (): Promise<GContest[]> => {
  try {
    const res = await fetch("/api/contests/featured", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch featured contests");
    }

    const data = await res.json();
    return data.contests;
  } catch (error: any) {
    console.error("❌ Error fetching featured contests:", error);
    throw new Error(error.message || "Failed to fetch featured contests");
  }
};
