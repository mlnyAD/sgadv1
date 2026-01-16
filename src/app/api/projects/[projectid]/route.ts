

import { NextRequest, NextResponse } from "next/server";
import { updateProject } from "@/domain/project/project.repository";
import type { ProjectDbRow } from "@/domain/project/project.db";

/* ------------------------------------------------------------------
   PATCH /api/projects/:id
   ------------------------------------------------------------------ */

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ projectid: string }> }
) {
  try {
    // params sont async en Next 15/16
    const { projectid } = await context.params;

 const projectId = Number(projectid);

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
