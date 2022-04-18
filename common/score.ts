import { typeData, types } from "./pokedata";

export const getGrade = (score: number) => {
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

  export const getScore = (attack: number[], defence: number[]) => {
    const minOffset = 2.4;
    const midOffset = 0;
    const scale = 2;// attack.length > 1 ? 1 : 2;

    const sumScore = combineScores(attack) - combineScores(defence);

    return minOffset - (midOffset + (sumScore * scale));
  }

  const combineScores = (scores: number[]): number => 
    scores.reduce(combinedScore) / scores.length;

  const combinedScore = (p: number, c: number) => (p*c);


  export interface TypeEffectiveness {
    typeIndex: number, attack: number[], defence: number[], score: number
  };

export const getEffectiveness = (targetTypes: number[]): TypeEffectiveness[] =>  {
  const targetStats = targetTypes.map(
    tt => typeData[tt].map(
      (_, si) => [typeData[tt][si], typeData[si][tt]] as [number, number])
    );

  const combined = targetStats.reduce((prev, curr) => 
      prev.map(([pa, pd], i) => {
        const [ca, cd] = curr[i];
        const cma = combinedScore(pa, ca);
        const cmd = combinedScore(pd, cd);
        return [cma, cmd];
      })
    );

  const scores = combined.map(([attackScore, defenceScore], typeIndex) => {
    const score = parseFloat((attackScore - defenceScore).toFixed(2));
    const stats = targetStats.map(s => s[typeIndex]);
    const attack = stats.map(([a, _]) => a);
    const defence = stats.map(([_, d]) => d);

    return ({typeIndex, attack, defence, score})
  })
    
  return scores.sort((a, b) => a.score - b.score);
}

const debugScores = () => {
  const allScores = types.flatMap((_, a) => 
  types.map((_, b) => {
    const ef = getEffectiveness([a, b]);
    const [min, max] = ef.reduce(([pmin, pmax]: [number, number], c, i) => 
    [
      (c.score < ef[pmin].score) ? i : pmin, 
      (c.score > ef[pmax].score) ? i : pmax
    ], [0, 0])
    return {types: `${types[a]}/${types[b]}`, min: ef[min], max: ef[max]};
  }
  )
);

const [imin, imax] = allScores.reduce(([pmin, pmax]: [number, number], c, i) => 
  [
    (c.min.score < allScores[pmin].min.score) ? i : pmin, 
    (c.max.score > allScores[pmax].max.score) ? i : pmax
  ]
, [0, 0]);

allScores.forEach((t, i) => 
  console.log("%s Min: %o, Max: %o", t.types.padEnd(20), t.min, t.max));

console.log('Min: %f (%s vs %s)', allScores[imin].min.score, allScores[imin].types, types[allScores[imin].min.typeIndex]);
console.log('Max: %f (%s vs %s)', allScores[imax].max.score, allScores[imax].types, types[allScores[imax].max.typeIndex]);

}


// debugScores()

