'use client'
import { Side } from '@/components'
import { Icon } from '@/components/Icons'
import { Config } from '@/constants'

const { socialMedia } = Config

interface Props {
  isHome?: boolean
}

const Social = ({ isHome }: Props) => (
  <Side isHome={isHome} orientation="left">
    {socialMedia?.map(({ url, name }, i) => (
      <li key={i}>
        <a href={url} aria-label={name} target="_blank" rel="noreferrer">
          <Icon name={name} />
        </a>
      </li>
    ))}
  </Side>
)

export default Social
