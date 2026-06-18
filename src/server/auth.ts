import { auth } from "@clerk/nextjs/server";

export async function getSessionTenantId() {
  const { userId } = await auth();

  console.log("User Id: ", userId);
  return userId;
}
