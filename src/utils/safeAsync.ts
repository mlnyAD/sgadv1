export async function safeAsync<T>(promise: Promise<T>): Promise<[T | null, any]> {
  try {
    const res = await promise;
    return [res, null];
  } catch (err) {
    console.error("🔥 Supabase/Server error:", err);
    return [null, err];
  }
}
