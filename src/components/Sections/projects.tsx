import { getStaticData } from '@/utils/md'
import Projects from './components/Projects'

const ServerProjects = async () => {
  return <Projects projectsData={JSON.stringify(await getStaticData('projects'))} />
}

export default ServerProjects
