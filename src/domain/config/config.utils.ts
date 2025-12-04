import { ConfigEnum } from "./config.enum";

export function getConfigTypeLabel(typeId: number | null | undefined): string {
  if (typeId == null) return "";
  return ConfigEnum.find((item) => item.id === typeId)?.label ?? "";
}
