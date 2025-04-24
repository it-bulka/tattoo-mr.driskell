import { memo } from 'react'
import { HStack, CopyButton } from '@/shared/ui'
import { ShareOnInstagram } from './ShareOnInstagramButton.tsx'
import { withShareLib, useShareLib } from '@/shared/libs/components'

interface ShareContent {
  titleToShare?: string
}

const ShareContentAnim = memo(({ titleToShare = '' }: ShareContent) => {
  const sharableLink = window.location.origin + window.location.pathname
  const {
    TelegramShareButton,
    TelegramIcon,
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    WhatsappShareButton,
    WhatsappIcon,
    ViberShareButton,
    ViberIcon,
    TwitterShareButton,
    TwitterIcon,
    ThreadsShareButton,
    ThreadsIcon,
    EmailShareButton,
    EmailIcon
  } = useShareLib().ShareLib

  return (
    <HStack wrap gap='10' justify='end'>
      <CopyButton textToCopy={sharableLink} />

      <EmailShareButton url={sharableLink} title={titleToShare}>
        <EmailIcon size={32} round />
      </EmailShareButton>

      <TelegramShareButton url={sharableLink} title={titleToShare}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>

      <WhatsappShareButton url={sharableLink} title={titleToShare}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      <ViberShareButton url={sharableLink} title={titleToShare}>
        <ViberIcon size={32} round />
      </ViberShareButton>

      <FacebookShareButton url={sharableLink} title={titleToShare}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <LinkedinShareButton url={sharableLink} title={titleToShare}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      <ThreadsShareButton url={sharableLink} title={titleToShare}>
        <ThreadsIcon size={32} round />
      </ThreadsShareButton>

      <TwitterShareButton url={sharableLink} title={titleToShare}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <ShareOnInstagram url={sharableLink} />
    </HStack>
  )
})

const ShareContent = withShareLib(ShareContentAnim)
export default ShareContent
ShareContentAnim.displayName = 'ShareContent'