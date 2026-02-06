
//import { createTodo } from "@/domain/todo/todo.repository";
//import { getAuthenticatedOperateur } from '@/lib/auth/get-authenticated-operateur'
//import { revalidatePath } from "next/cache";


export async function POST() {
}
/*export async function POST(req: Request) {
  try {
    const operateur = await getAuthenticatedOperateur()

    if (!operateur) {
      return new Response('Unauthorized', { status: 401 })
    }
    
/*
    const operateurId = operateur.server.id;
    const body = await req.json();

    const { titre, text, urgent, important, etatId, cloture } = body;

    //console.log("Create TODO entrée body ", body);

    //console.log("Create TODO entrée ", titre, text, urgent, important, etatId, cloture);

     if (
      typeof titre !== 'string' ||
      typeof urgent !== 'boolean' ||
      typeof important !== 'boolean' ||
      typeof etatId !== 'number'
    ) {
      return new Response('Invalid payload', { status: 400 })
    }

    await createTodo(
      {
        titre,
        text,
        urgent,
        important,
        etatId,
        cloture,
      },
      operateurId
    )

  revalidatePath("/todos"); // ✅ force le refresh serveur
*/
/*
  return new Response(null, { status: 201 });
  } catch (err) {
    console.error('POST /api/todos error', err)
    return new Response('Server error', { status: 500 })
  }
}
*/