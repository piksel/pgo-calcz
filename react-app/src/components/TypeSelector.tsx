
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";

import { types, faIcons } from "@pgocalc/common/pokedata";

interface Props {selected: number[], onChange: (_: (cv: number[])=>number[])=>void, dualType: boolean}
export const TypeSelector: React.FC<Props> = (props) => {
  const {selected, onChange, dualType} = props;

  const updateSelected = useCallback((index: number) => onChange(curr => {
    const selSet = new Set<number>(curr);
    const found = selSet.delete(index);
    if(!dualType) {
      return found ? [] : [index];
    } else if (!found && selSet.size < 2) selSet.add(index);
    return Array.from(selSet);
  }
), [onChange, dualType]);

  return (
    <div className="type-selector">
    {types.map((name, index) => 
      <button className={`${selected.includes(index)?'selected':''}`} key={index} onClick={() => updateSelected(index)}>
        <span>
        <div className={`type-icon pt-${types[index].toLowerCase()}`}>
          <FontAwesomeIcon key={index} icon={faIcons[index]} />
          </div>
          <label >{name}</label>
        </span>
      </button>
    )}
    </div>
  )
}