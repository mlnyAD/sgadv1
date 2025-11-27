"use client";

import ConfigList from "./configList/ConfigList";
import ConfigListToastFeedback from "./configList/ConfigListToastFeedback";

export default function ConfigsPageClient({
  searchParams,
  data,
}: {
  searchParams: { [key: string]: string | undefined };
  data: any[];
}) {
  const flags = {
    created: searchParams?.created === "1",
    updated: searchParams?.updated === "1",
    deleted: searchParams?.deleted === "1",
    deleteError: searchParams?.deleteError === "1",
  };

  return (
    <>
      <ConfigListToastFeedback flags={flags} />
      <ConfigList initialData={data} />
    </>
  );
}
