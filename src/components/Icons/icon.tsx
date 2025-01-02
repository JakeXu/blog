import {
  IconAppStore,
  IconBookmark,
  IconCodepen,
  IconDiscord,
  IconExternal,
  IconFolder,
  IconFork,
  IconGitHub,
  IconLinkedin,
  IconLoader,
  IconLogo,
  IconPlayStore,
  IconStar,
  IconTwitter
} from '@/components/Icons'

interface Props {
  name: string
}

const Icon = ({ name }: Props) => {
  switch (name) {
    case 'AppStore':
      return <IconAppStore />
    case 'Bookmark':
      return <IconBookmark />
    case 'Codepen':
      return <IconCodepen />
    case 'External':
      return <IconExternal />
    case 'Folder':
      return <IconFolder />
    case 'Fork':
      return <IconFork />
    case 'GitHub':
      return <IconGitHub />
    case 'Linkedin':
      return <IconLinkedin />
    case 'Loader':
      return <IconLoader />
    case 'Logo':
      return <IconLogo />
    case 'PlayStore':
      return <IconPlayStore />
    case 'Star':
      return <IconStar />
    case 'Twitter':
      return <IconTwitter />
    case 'Discord':
      return <IconDiscord />
    default:
      return <IconExternal />
  }
}

export default Icon
