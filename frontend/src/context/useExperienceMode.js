import { useContext } from 'react'
import { ExperienceModeContext } from './experienceMode'

export function useExperienceMode() {
  const context = useContext(ExperienceModeContext)

  if (!context) {
    throw new Error('useExperienceMode must be used within an ExperienceModeProvider')
  }

  return context
}
