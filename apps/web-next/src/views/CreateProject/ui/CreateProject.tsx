'use client'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { InputText } from '@/shared/ui/InputText'
import { Button } from '@/shared/ui/Button'
import { useCreateProjectMutation } from '@/views/CreateProject/queries/CreateProject.generated'
import { useState } from 'react'
import { redirect, useParams, usePathname, useRouter } from 'next/navigation'
import { buildLink } from '@/shared/ui/Link/hooks/useLink'
import { useCurrentProjectsListSuspenseQuery } from '@/views/ProjectsList/queries/ProjectsList.generated'

export const CreateProject = () => {
  const { data } = useCurrentProjectsListSuspenseQuery()
  const hasProjects = data?.project?.length > 0
  const pathname = usePathname()
  const routerParams = useParams()
  const router = useRouter()
  const [name, setName] = useState('')
  const [create, { loading }] = useCreateProjectMutation({
    variables: {
      name
    }
  })

  const handleCreate = async e => {
    e?.preventDefault()
    const { data } = await create()

    if (data) {
      const projectLink = buildLink({ type: 'project', projectSlug: data?.createProject?.id, pathname, routerParams })
      router.push(projectLink.href)
    }
  }

  return (
    <div>
      <div className={styles.head}>
        <svg className={styles.headPattern} height='100%' width='100%'>
          <defs>
            <pattern height='20' id='«r1da»' patternUnits='userSpaceOnUse' width='10'>
              <line stroke='var(--background-secondary)' x2='10' y1='20'></line>
            </pattern>
            <linearGradient id='«r1da»-fade' x1='0' x2='0' y1='0' y2='1'>
              <stop offset='0%' stopColor='white'></stop>
              <stop offset='100%' stopColor='black'></stop>
            </linearGradient>
            <mask id='«r1da»-mask'>
              <rect fill='url(#«r1da»-fade)' height='100%' width='100%'></rect>
            </mask>
          </defs>
          <rect fill='url(#«r1da»)' height='100%' mask='url(#«r1da»-mask)' width='100%'></rect>
        </svg>
        <Container mode='hug'>
          <h1 className={styles.title}>{hasProjects ? `Let's build something new.` : 'Create you first project'}</h1>

          <form className={styles.row} onSubmit={handleCreate}>
            <InputText
              classNameInput={styles.input}
              value={name}
              size='large'
              placeholder='Input name for your next project'
              onChangeValue={setName}
            />
            <Button disabled={name?.length < 3} loading={loading} size='large' type='submit'>
              Create Project
            </Button>
          </form>
        </Container>
      </div>
    </div>
  )
}
