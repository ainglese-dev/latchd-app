const defaultClass = 'w-4 h-4 inline-block shrink-0'

export function ArrowRight({ className = defaultClass }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638l-3.96-3.96a.75.75 0 111.06-1.06l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06l3.96-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
    </svg>
  )
}

export function ArrowLeft({ className = defaultClass }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l3.96 3.96a.75.75 0 11-1.06 1.06l-5.25-5.25a.75.75 0 010-1.06l5.25-5.25a.75.75 0 111.06 1.06l-3.96 3.96h10.638A.75.75 0 0117 10z" clipRule="evenodd" />
    </svg>
  )
}

export function Lock({ className = defaultClass }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
    </svg>
  )
}

export function Flame({ className = defaultClass }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M13.5 4.938a7 7 0 11-9.006 8.615A7 7 0 0113.5 4.938zM10 2a.75.75 0 01.614.318 8.003 8.003 0 01-1.439 10.467A5.475 5.475 0 007 9.658V9.5a.75.75 0 00-1.5 0v.158a6.98 6.98 0 01-.537-.846A5.5 5.5 0 0110 2z" clipRule="evenodd" />
    </svg>
  )
}

export function CheckCircle({ className = defaultClass }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  )
}

export function XCircle({ className = defaultClass }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
    </svg>
  )
}

export function Star({ className = defaultClass }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
    </svg>
  )
}

export function Compass({ className = defaultClass }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="10" cy="10" r="8" />
      <polygon points="10,4 12,9 10,8 8,9" fill="currentColor" stroke="none" />
      <polygon points="10,16 8,11 10,12 12,11" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Gift({ className = defaultClass }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M14 6h2.75a.75.75 0 01.75.75v3.5a.75.75 0 01-.75.75H11V6h1.5a1.5 1.5 0 001.5-1.5A1.5 1.5 0 0012.5 3c-.825 0-1.574.477-2.03 1.09a.75.75 0 01-.94 0C9.074 3.477 8.325 3 7.5 3A1.5 1.5 0 006 4.5 1.5 1.5 0 007.5 6H9v5H3.25a.75.75 0 01-.75-.75v-3.5A.75.75 0 013.25 6H6a3 3 0 01-.5-1.5A3 3 0 017.5 1.5c1.02 0 1.924.476 2.5 1.199A3.48 3.48 0 0112.5 1.5 3 3 0 0114.5 4.5 3 3 0 0114 6z" />
      <path d="M3 12.5h6V18H4.25a1.25 1.25 0 01-1.25-1.25V12.5zM11 12.5h6v4.25c0 .69-.56 1.25-1.25 1.25H11V12.5z" />
    </svg>
  )
}

export function Target({ className = defaultClass }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="10" cy="10" r="8" />
      <circle cx="10" cy="10" r="5" />
      <circle cx="10" cy="10" r="2" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Zap({ className = defaultClass }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z" />
    </svg>
  )
}
