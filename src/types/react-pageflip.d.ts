declare module 'react-pageflip' {
  import type { ReactNode, Ref } from 'react'

  export interface HTMLFlipBookProps {
    width: number
    height: number
    size?: 'fixed' | 'stretch'
    minWidth?: number
    maxWidth?: number
    minHeight?: number
    maxHeight?: number
    showCover?: boolean
    mobileScrollSupport?: boolean
    maxShadowOpacity?: number
    drawShadow?: boolean
    useMouseEvents?: boolean
    flippingTime?: number
    className?: string
    style?: React.CSSProperties
    children: ReactNode
    ref?: Ref<unknown>
  }

  export default class HTMLFlipBook extends React.Component<HTMLFlipBookProps> {}
}
