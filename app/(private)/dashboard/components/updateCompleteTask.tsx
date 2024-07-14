'use server'

import { TaskProps } from '@/app/actions/createTask'
import { updateDataTask } from '@/app/actions/updateTask'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export default async function UpdateDeleteTask(data: TaskProps, id: string) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const newData = {
    ...data,
    id,
  }

  return await updateDataTask(newData, user)
}
