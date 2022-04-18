import React, { useMemo, useState } from 'react';
import './App.scss';
import { colFgDark, faIcons, typeData, types } from '@pgocalc/common/pokedata';
import { getEffectiveness, getGrade, getScore, TypeEffectiveness } from '@pgocalc/common/score';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Toggle, TypeSelector } from './components';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import ReloadPrompt from './components/ReloadPrompt';

const fmtEffect = (factor: number) => (factor*100).toFixed(0) + "%";



const TypeEffictiveness: React.FC<{effectiveness: TypeEffectiveness, targetTypes: number[]}> = (props) => {

  // const [attack, defence] = theirs.map(y => [typeData[y][yours], typeData[yours][y]]);
  // const defence = theirs.map(y => typeData[yours][y]);
  const {effectiveness, targetTypes} = props;
  const {attack, defence, typeIndex} = effectiveness;

  const score = getScore(attack, defence);
  const [grade, gradeCol] = getGrade(score);
  const fgType = colFgDark[typeIndex] ? 'dark' : 'light';

  const scoreCol = `hsl(${(score)*20}deg, 100%, 40%)`;

  return (
    <div className="table-row">
      <div className="col score">
        <div className={gradeCol} title={score.toFixed(1)}>
          {grade}
        </div>
        {/* {score.toFixed(1)} */}
      </div>
      <div className="col type">
        <TypeBadge withName type={typeIndex} />
      </div>
      <div className="col factor attack">
        <div className="half-row">
        {attack.map((a,i) => <EffectBadge key={i} factor={a} type={targetTypes[i]} />)}
        </div>
      </div>
      <div className="col factor defense">
        <div className="half-row">
        {defence.map((d,i) => <EffectBadge key={i} factor={d} type={targetTypes[i]} />)}
        </div>
      </div> 
    </div>
  );
}

const EffectBadge: React.FC<{type: number, factor: number}> = ({type, factor}) => {
  return (
    <div className='effectiveness'>
      <TypeBadge type={type} />
    <label className={factor == 1 ? 'faded' : ''}>{fmtEffect(factor)}</label>
    </div>
  )
}

const TypeBadge: React.FC<{type: number, withName?: boolean}> = props => {
  const {type, withName} = props;
  const fgType = colFgDark[type] ? 'dark' : 'light';
  const typeName = useMemo(() => types[type], [type]);
  return (
    <div className={`type-badge ${withName?'large':''} ${fgType} pt-${typeName.toLowerCase()}`}>
      <FontAwesomeIcon fixedWidth icon={faIcons[type]} />
      {withName && typeName}
  </div>
  )
}

const listFilter = ({score, attack}: TypeEffectiveness) => 
  score != 0 || attack.some(a => a != 1)

function App() {
  const [selected, setSelected] = useState([] as number[]);
  const [dualType, setDualType] = useState(false);
  const [showTypeSelector, setShowTypeSelector] = useState(true);

  const selectedEffectiveness = useMemo<TypeEffectiveness[]>(() => {
    const ef = selected.length < 1 ? [] : getEffectiveness(selected);
   
      console.log("Effectiveness: %o", Object.fromEntries(ef.map(e => [types[e.typeIndex], e])));
      return ef;
    }
  , [selected]);




  return (
    <div className="app-wrapper">
    <div className="app-left" />
    <div className="app">
      <div className="options">
          <h3 onClick={() => setShowTypeSelector(v => !v)}>
            <FontAwesomeIcon rotate={showTypeSelector ? 45 : 0} fixedWidth icon={faCaretRight} />
            Opponent type
          </h3>
          {showTypeSelector ? (
            <Toggle checked={dualType} onChange={setDualType} trueLabel="Dual" falseLabel="Single" suffix="" />

          ): (
            <div className='selected-types'>
            {selected.map(s => <TypeBadge withName type={s} />)}
            </div>
          )}
      </div>

      {showTypeSelector && <TypeSelector selected={selected} onChange={setSelected} dualType={dualType} />}

      <div className="table-container">
      {selected.length > 0 && (
          <div className="flex-table">
            <div className="table-head">
                <div className="col score">Score</div>
                <div className="col type">Type</div>
                <div className="col factor">Opponent attack</div>
                <div className="col factor">Opponent defense</div>
            </div>
            <div className="table-rows">
              {selectedEffectiveness.filter(listFilter).map(effectiveness => 
                <TypeEffictiveness key={effectiveness.typeIndex}
                effectiveness={effectiveness}
                targetTypes={selected}
                />
              )}
            </div>
          </div>
      )}
      </div>
      <ReloadPrompt />
    </div>
    <div className="app-right" />
    </div>
  );
}




export default App;
