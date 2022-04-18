import './ReloadPrompt.scss'
import { useRegisterSW } from 'virtual:pwa-register/react'

interface Props {offlineReady: boolean, needRefresh: boolean, onReload: ()=>void, onClose: ()=>void}
export const ReloadPrompt: React.FC<{}> = (props) => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
        console.log('SW Registered: %o', r)
    },
    onRegisterError(error) {
        console.log('SW registration error: %o', error)
    },
  })

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  }

  const reload = () => {
    updateServiceWorker(true);
  }

  return <_ReloadPrompt 
    offlineReady={offlineReady} 
    needRefresh={needRefresh} 
    onClose={close} 
    onReload={reload} />
}

const _ReloadPrompt: React.FC<Props> = (props) => {
    const {offlineReady, needRefresh, onClose, onReload} = props;
  
    return (
      <div className="ReloadPrompt-container">
        { (offlineReady || needRefresh)
          && <div className="ReloadPrompt-toast">
              <div className="ReloadPrompt-message">
                { offlineReady
                      ? <span>App ready to work offline</span>
                      : <span>New content available, click on reload button to update.</span>
                }
              </div>
              <div className="ReloadPrompt-toast-buttons">
                { needRefresh && <button onClick={() => onReload()}>Reload</button> }
                <button className="secondary" onClick={() => onClose()}>Dismiss</button>
              </div>
          </div>
        }
      </div>
    )
  }

export default ReloadPrompt