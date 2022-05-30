import * as React from 'react'
import { Button } from '@mui/material'
interface IClipBoard {
  copyText: string
}
function ClipboardCopy({ copyText }: IClipBoard) {
  const [isCopied, setIsCopied] = React.useState(false)

  async function copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text)
    } else {
      return document.execCommand('copy', true, text)
    }
  }

  const handleCopyClick = () => {
    copyTextToClipboard(copyText)
      .then(() => {
        setIsCopied(true)
        setTimeout(() => {
          setIsCopied(false)
        }, 1500)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <Button
        type="submit"
        onClick={handleCopyClick}
        sx={{
          my: 2,
          backgroundColor: 'white',
          color: 'black',
          borderRadius: '4px',
          cursor: 'pointer',
          textTransform: 'none',
        }}
        variant="contained"
        size="medium"
      >
        {isCopied ? 'Copied!' : 'Copy'}
      </Button>
    </div>
  )
}
export default ClipboardCopy
