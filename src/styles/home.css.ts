import { keyframes, style } from '@vanilla-extract/css'

export const canvas = style({
  width: '100vw',
  height: '100vh',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 0,
})

export const fullScreen = style({
  position: 'absolute',
  top: '0.4rem',
  right: '0.5rem',
  fontSize: '1rem',
  opacity: 0.4,
})

const fadein = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

export const container = style({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#4c566a',
  margin: '0.2rem 0.2rem 0 0.5rem',
  gap: '0.5rem',
  animation: `${fadein} 2s ease-out 1s both`,
  zIndex: 100,
})

export const typograph = style({
  fontSize: '1.2rem',
  fontWeight: 300,
  zIndex: 0,
})
