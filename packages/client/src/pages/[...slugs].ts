import { app } from "@paprika/server";

const handle = ({ request }: { request: Request }) => app.handle(request);

export const GET = handle;
export const POST = handle;