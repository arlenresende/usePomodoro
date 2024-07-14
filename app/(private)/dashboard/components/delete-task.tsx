'use server'
import { deleteDataTask } from '@/app/actions/deleteTask'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export default async function DeleteTaskId(id: string) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return await deleteDataTask(id, user)
}
