import { Route, Routes } from 'react-router'
import { PageNotFound } from '@/common/components'
import { CardPage } from '@/app/ui/CardPage.tsx'
import { GlassPage } from '@/pages/GlassPage.tsx'
import { MainPage } from '@/app/ui/MainPage.tsx'
import { PlaylistsPage } from '@/features/playlists/ui/PlaylistsPage/PlaylistsPage.tsx'
import { TracksPage } from '@/features/tracks/ui/TracksPage/TracksPage.tsx'
import { ProfilePage } from '@/features/auth/ui/ProfilePage/ProfilePage.tsx'
import { OAuthCallback } from '@/features/auth/ui/OAuthCallback/OAuthCallback.tsx'

export const Path = {
  Main: '/',
  Card: '/card',
  Glass: '/glass',
  Playlists: '/playlists',
  Tracks: '/tracks',
  Profile: '/profile',
  OAuthRedirect: '/oauth/callback',
  NotFound: '*',
} as const

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<MainPage />} />
    <Route path={Path.Card} element={<CardPage />} />
    <Route path={Path.Glass} element={<GlassPage />} />
    <Route path={Path.Playlists} element={<PlaylistsPage />} />
    <Route path={Path.Tracks} element={<TracksPage />} />
    <Route path={Path.Profile} element={<ProfilePage />} />
    <Route path={Path.OAuthRedirect} element={<OAuthCallback />} />
    <Route path={Path.NotFound} element={<PageNotFound />} />
  </Routes>
)
