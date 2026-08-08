import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Check, X, Loader2, Github, Linkedin, FileText } from 'lucide-react'
import { useApp } from '../context/AppContext'
import type { ProofType } from '../data/mock'

interface ProofUploadProps {
  type: ProofType
}

const CONFIG: Record<
  ProofType,
  {
    icon: typeof Github
    title: string
    helper: string
    cta: string
    accept: string[]
    error: string
    empty: string
  }
> = {
  github: {
    icon: Github,
    title: 'Github Commit',
    helper: 'Upload proof of your GitHub commit',
    cta: 'Upload GitHub Proof',
    accept: ['.pdf', 'application/pdf'],
    error: 'Please upload a PDF of your GitHub commit.',
    empty: 'Your GitHub proof is waiting.',
  },
  linkedin: {
    icon: Linkedin,
    title: 'LinkedIn Post',
    helper: 'Upload proof of your LinkedIn post',
    cta: 'Upload LinkedIn Proof',
    accept: ['.png', '.jpg', '.jpeg', 'image/png', 'image/jpeg'],
    error: 'Please upload a screenshot (PNG or JPG) of your LinkedIn post.',
    empty: 'Show the world what you built.',
  },
}

type Status = 'idle' | 'uploading' | 'error' | 'uploaded'

function fileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function ProofUpload({ type }: ProofUploadProps) {
  const { uploadProof, removeProof, todayProofs } = useApp()
  const cfg = CONFIG[type]
  const Icon = cfg.icon
  const inputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  const uploadedFile = todayProofs[type]

  const handleFile = (file: File | undefined | null) => {
    setError(null)
    if (!file) return
    const ok =
      file.type.length > 0
        ? cfg.accept.includes(file.type)
        : cfg.accept.some((a) => file.name.toLowerCase().endsWith(a))
    if (!ok) {
      setStatus('error')
      setError(cfg.error)
      return
    }
    setStatus('uploading')
    // Mock upload — no real network request.
    window.setTimeout(() => {
      uploadProof(type, file.name, file.size)
      setStatus('uploaded')
    }, 1300)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0])
    e.target.value = ''
  }

  const remove = () => {
    removeProof(type)
    setStatus('idle')
    setError(null)
  }

  const uploading = status === 'uploading'
  const uploaded = status === 'uploaded' || Boolean(uploadedFile)

  return (
    <div className={`card overflow-hidden border ${uploaded ? 'border-emerald-500/30' : status === 'error' ? 'border-red-500/40' : 'border-line'}`}>
      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        accept={cfg.accept.join(',')}
        onChange={handleChange}
        id={`proof-${type}`}
        aria-label={cfg.title}
      />

      <div className="flex items-center gap-3 p-4 pb-0">
        <span className={`grid h-10 w-10 place-items-center rounded-xl ${uploaded ? 'bg-emerald-500/15 text-emerald-400' : 'bg-white/[0.06] text-smoke'}`}>
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-[15px] font-extrabold tracking-tight text-white">{cfg.title}</p>
          <p className="text-xs text-smoke">{cfg.helper}</p>
        </div>
        {uploaded && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-1 text-2xs font-bold uppercase tracking-[0.12em] text-emerald-400">
            <Check className="h-3 w-3" strokeWidth={3} aria-hidden /> Uploaded
          </span>
        )}
      </div>

      <div className="p-4">
        <AnimatePresence mode="wait">
          {uploading && (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-20 items-center justify-center gap-3 rounded-xl border border-line bg-ink/50 text-sm text-smoke"
            >
              <Loader2 className="h-5 w-5 animate-spin text-orange" aria-hidden />
              Uploading proof…
            </motion.div>
          )}

          {!uploading && uploaded && uploadedFile && (
            <motion.div
              key="uploaded"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] px-3 py-3"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald-500/15 text-emerald-400">
                {type === 'github' ? <FileText className="h-[18px] w-[18px]" aria-hidden /> : <Icon className="h-[18px] w-[18px]" aria-hidden />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">{uploadedFile.fileName}</p>
                <p className="text-2xs font-medium text-ash">{fileSize(uploadedFile.size)} · {type === 'github' ? 'PDF' : 'Screenshot'}</p>
              </div>
              <button
                type="button"
                onClick={remove}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ash transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Remove proof"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </motion.div>
          )}

          {!uploading && !uploaded && (
            <motion.button
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex h-20 w-full flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-line bg-white/[0.02] text-sm transition-colors hover:border-orange/40 hover:bg-orange/[0.06]"
            >
              <Upload className="h-5 w-5 text-orange-soft" aria-hidden />
              <span className="text-sm font-bold text-white">{cfg.cta}</span>
              <span className="text-2xs font-medium text-ash">
                {type === 'github' ? 'PDF accepted' : 'PNG · JPG · JPEG'}
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {status === 'error' && error && (
            <motion.p
              key="error"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <span className="mt-3 flex items-center gap-2 text-sm font-medium text-red-400">
                <X className="h-4 w-4 shrink-0" aria-hidden /> {error}
              </span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
