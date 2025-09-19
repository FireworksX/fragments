import { useParams } from 'next/navigation'
import { useQuery } from '@apollo/client'
import { useProjectQuery } from './queries/Project.generated'
import { useState } from 'react'

export const useProject = () => {
  const { projectSlug: urlProjectSlug } = useParams()
  const projectSlug = urlProjectSlug ? +urlProjectSlug : 0

  const { data, loading } = useProjectQuery({
    variables: {
      projectSlug
    }
  })

  const project = data?.project?.at(0)

  const [properties, setProperties] = useState([
    {
      nodePropertyControlReference: null,
      name: 'Primary color',
      type: 'Color',
      defaultValue: 'rgb(213, 207, 29)',
      required: false,
      _id: 'b4c65f89592e18',
      _type: 'Variable'
    }
  ])

  return {
    projectSlug,
    project,
    loading,
    properties,
    updateProperties: setProperties
  }
}
