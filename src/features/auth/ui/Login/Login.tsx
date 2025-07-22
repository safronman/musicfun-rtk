import { Path } from '@/common/routing'
import { useLoginMutation } from '../../api/authApi.ts'

export const Login = () => {
  const [login] = useLoginMutation()

  const loginHandler = () => {
    // Build the redirect URI after authorization
    const redirectUri = import.meta.env.VITE_DOMAIN_ADDRESS + Path.OAuthRedirect

    // Build the OAuth authorization endpoint URL, adding callbackUrl as a query parameter
    const url = `${import.meta.env.VITE_BASE_URL}/auth/oauth-redirect?callbackUrl=${redirectUri}`

    // Open a popup window for OAuth authorization
    window.open(url, 'oauthPopup', 'width=500, height=600')

    // Handler function to receive messages from the popup window
    const receiveMessage = async (event: MessageEvent) => {
      if (event.origin !== import.meta.env.VITE_DOMAIN_ADDRESS) return

      const { code } = event.data
      if (!code) return

      // Unsubscribe from the event to avoid handling duplicate messages
      window.removeEventListener('message', receiveMessage)
      login({ code, redirectUri, rememberMe: false })
    }

    // Subscribe to messages from the popup window
    window.addEventListener('message', receiveMessage)
  }

  return (
    <button type={'button'} onClick={loginHandler}>
      login
    </button>
  )
}
