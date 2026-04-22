

import { getRembtScreenData } from "@/features/rembt/getRembtScreenData";
import { RembtScreenClient } from "@/ui/rembt/RembtScreenClient";

export default async function Page(props: {
  searchParams: Promise<{ exerid?: string }>;
}) {
  const sp = await props.searchParams;

  const data = await getRembtScreenData({ exerid: sp.exerid });
  if (!data) throw new Error("getRembtScreenData a retourné undefined");

  return (
    <RembtScreenClient
      exerid={data.exerid}
      exerciseOptions={data.exerciseOptions}
      state={data.state}
      rows={data.rows}
    />
  );
}


