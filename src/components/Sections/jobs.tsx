import { getStaticData } from '@/utils/md'
import Jobs from './components/Jobs'

const ServerJobs = async () => {
  return <Jobs jobsData={JSON.stringify(await getStaticData())} />
}

export default ServerJobs
