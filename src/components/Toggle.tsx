import { IconDefinition, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";
import './Toggle.scss'

interface ToggleProps {trueIcon?: IconDefinition, falseIcon?: IconDefinition, trueLabel:string, falseLabel:string, suffix?: string, prefix?:string, checked: boolean, onChange: (value: boolean) => void}
export const Toggle: React.FC<ToggleProps> = (props) => {
  const {checked, onChange, prefix, suffix, trueLabel, falseLabel, trueIcon, falseIcon} = props;

  const icon = useMemo(() => !trueIcon && !falseIcon ? null : ( (checked ? trueIcon : falseIcon) ?? faCircle ) ,[checked, trueIcon, falseIcon])

  return (<>
    <label className={`toggle${checked ? ' checked':''}`}>
    <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      {/* {icon && <FontAwesomeIcon icon={icon} />} */}
      {prefix ?? ''}
      <span className="false-label">{falseLabel}{' '}{suffix ?? ''}</span>
      <span className="true-label">{trueLabel}{' '}{suffix ?? ''}</span>
      
    </label>
    </>
  )
}
