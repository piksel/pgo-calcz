import React, { useMemo, useState } from 'react';
import './App.scss';
import { colFgDark, faIcons, typeData, types } from './pokedata';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Toggle, TypeSelector } from './components';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

const fmtEffect = (factor: number) => (factor*100).toFixed(0) + "%";

const getGrade = (score: number) => {
  if(score >= 4.8) return ['S', 'grade-s'];
  if(score >= 4.4) return ['A+', 'grade-aplus'];
  if(score >= 4.0) return ['A', 'grade-a'];
  if(score >= 3.8) return ['B', 'grade-b'];
  if(score >= 3.4) return ['C+', 'grade-cplus'];
  if(score >= 3.0) return ['C', 'grade-c'];
  if(score >= 2.4) return ['D', 'grade-d'];

  if(score >= 0.2) return ['F', 'grade-f'];


  return ['F-', 'grade-fminus'];

}

const TypeEffictiveness: React.FC<{theirs: number[], yours: number}> = ({theirs, yours}) => {

  const attack = theirs.map(y => typeData[y][yours]);
  const defence = theirs.map(y => typeData[yours][y]);
  const scale = theirs.length > 1 ? 1 : 2;
  const score = 3.4-(1+((attack.reduce((p, c) => p*c) - defence.reduce((p, c) => p*c)) * scale));
  const [grade, gradeCol] = getGrade(score);
  const fgType = colFgDark[yours] ? 'dark' : 'light';

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
        <TypeBadge withName type={yours} />
      </div>
      <div className="col factor attack">
        <div className="half-row">
        {attack.map((a,i) => <EffectBadge key={i} factor={a} type={theirs[i]} />)}
        </div>
      </div>
      <div className="col factor defense">
        <div className="half-row">
        {defence.map((d,i) => <EffectBadge key={i} factor={d} type={theirs[i]} />)}
        </div>
      </div> 
    </div>
  );
}

const EffectBadge: React.FC<{type: number, factor: number}> = ({type, factor}) => {
  return (
    <div style={{display: 'flex'}}>
      <TypeBadge type={type} />
    <label>{fmtEffect(factor)}</label>
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

function App() {
  const [selected, setSelected] = useState([] as number[]);
  const [dualType, setDualType] = useState(false);
  const [showTypeSelector, setShowTypeSelector] = useState(true);

  const selectedEffectiveness = useMemo<[number, number][]>(() => {
    const ef = selected.length < 1 ? [] : 
    selected.map(s => 
    typeData[s]
      .map((attack, i) => [i, (attack - typeData[i][s])] as [number, number])
      ).reduce((prev, curr) => prev.map(([pa,pb], i) => {
        const [ca, cb] = curr[i];
        if(ca !== pa) throw Error(`Curr type ${ca} does not match prev type ${pa}}`)
        return [ca, (cb + pb)];
      })).sort(([,a], [,b]) => a - b);
      // console.log(ef.map(([i, s]) => [types[i], s]));
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
        {/* <FontAwesomeIcon icon={showTypeSelector ? faCaretDown : faCaretRight} /> */}
            Opponent type</h3>

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
                <div className="col factor">Attack</div>
                <div className="col factor">Defense</div>
            </div>
            <div className="table-rows">
              {selectedEffectiveness.filter(([t,s]) => s != 0 || typeData[selected[0]][t] != 1).map(([t,s]) => <TypeEffictiveness key={t} yours={t} theirs={selected} />)}
            </div>
          </div>
      )}
      </div>

    </div>
    <div className="app-right" />
    </div>
  );
}




export default App;
