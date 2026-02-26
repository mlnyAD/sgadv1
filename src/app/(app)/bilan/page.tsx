

import { getBilanScreenData } from "@/domain/bilan/getBilanScreenData";
import { BilanScreenClient } from "@/ui/bilan/BilanScreenClient";

export default async function Page(props: {
  searchParams: Promise<{ exerid?: string }>;
}) {
  const sp = await props.searchParams;

  const data = await getBilanScreenData({ exerid: sp.exerid });
  if (!data) throw new Error("getBilanScreenData a retourné undefined");

  return (
    <BilanScreenClient
      exerid={data.exerid}
      exerciseOptions={data.exerciseOptions}
      columns={data.columns}
      meta={data.meta}
    />
  );
}