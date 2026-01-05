

import { NextRequest, NextResponse } from "next/server";
import { updateProject } from "@/domain/project/project.repository";
import type { ProjectDbRow } from "@/domain/project/project.db";

/* ------------------------------------------------------------------
   PATCH /api/projects/:id
   ------------------------------------------------------------------ */

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // params sont async en Next 15/16
    const { id } = await context.params;

 const projectId = Number(id);

if (Number.isNaN(projectId)) {
  return NextResponse.json(
    { error: "Invalid project id" },
    { status: 400 }
  );
}
    const body = (await request.json()) as Partial<ProjectDbRow>;

    await updateProject(projectId, body);

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (err) {
    console.error("PATCH /api/projects/:id failed", err);

    return NextResponse.json(
      { error: "Project update failed" },
      { status: 500 }
    );
  }
}
