import { Route, Routes } from 'react-router'
import { PageNotFound } from '@/common/components'
import { MainPage } from '@/app/ui/MainPage.tsx'
import { PlaylistsPage } from '@/features/playlists/ui/PlaylistsPage/PlaylistsPage.tsx'

export const Path = {
  Main: '/',
  Playlists: '/playlists',
  NotFound: '*',
} as const

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<MainPage />} />
    <Route path={Path.Playlists} element={<PlaylistsPage />} />
    <Route path={Path.NotFound} element={<PageNotFound />} />
  </Routes>
)
