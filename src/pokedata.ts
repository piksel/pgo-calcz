import { IconDefinition, IconName } from "@fortawesome/fontawesome-common-types";

import {    faBug,
    faDragon,
    faBolt,
    faFistRaised,
    faFire,
    faDove,
    faGhost,
    faLeaf,
    faSnowflake,
    faDotCircle,
    faSkull,
    faCog,
    faTint,
 } from '@fortawesome/free-solid-svg-icons';
 import {
    faSparkles,
    faMountains,
    faGalaxy,
    faGuitarElectric,
    faSpaceStationMoon,
 } from '@fortawesome/pro-solid-svg-icons';

export const typeData =
        [
            [1.0, 1.6, 1.0, 1.0, 0.6, 0.6, 0.6, 0.6, 0.6, 1.6, 1.0, 1.0, 1.0, 0.6, 1.6, 1.0, 0.6, 1.0],
            [1.0, 0.6, 1.0, 1.0, 0.6, 0.6, 1.0, 1.0, 1.6, 1.0, 1.0, 1.0, 1.0, 1.0, 1.6, 1.0, 1.0, 1.0],
            [1.0, 1.0, 1.6, 1.0, 0.4, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.6, 1.0],
            [1.0, 1.0, 0.6, 0.6, 1.0, 1.0, 1.0, 1.6, 1.0, 0.6, 0.4, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.6],
            [1.0, 1.6, 1.6, 1.0, 1.0, 1.6, 0.6, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.6, 1.0, 1.0, 0.6, 1.0],
            [0.6, 1.6, 1.0, 1.0, 0.6, 1.0, 1.0, 0.6, 0.4, 1.0, 1.0, 1.6, 1.6, 0.6, 0.6, 1.6, 1.6, 1.0],
            [1.6, 1.0, 0.6, 1.0, 1.0, 1.0, 0.6, 1.0, 1.0, 1.6, 1.0, 1.6, 1.0, 1.0, 1.0, 0.6, 1.6, 0.6],
            [1.6, 1.0, 1.0, 0.6, 1.0, 1.6, 1.0, 1.0, 1.0, 1.6, 1.0, 1.0, 1.0, 1.0, 1.0, 0.6, 0.6, 1.0],
            [1.0, 0.6, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.6, 1.0, 1.0, 1.0, 0.4, 1.0, 1.6, 1.0, 1.0, 1.0],
            [0.6, 1.0, 0.6, 1.0, 1.0, 1.0, 0.6, 0.6, 1.0, 0.6, 1.6, 1.0, 1.0, 0.6, 1.0, 1.6, 0.6, 1.6],
            [0.6, 1.0, 1.0, 1.6, 1.0, 1.0, 1.6, 0.4, 1.0, 0.6, 1.0, 1.0, 1.0, 1.6, 1.0, 1.6, 1.6, 1.0],
            [1.0, 1.0, 1.6, 1.0, 1.0, 1.0, 0.6, 1.6, 1.0, 1.6, 1.6, 0.6, 1.0, 1.0, 1.0, 1.0, 0.6, 0.6],
            [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.4, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.6, 0.6, 1.0],
            [1.0, 1.0, 1.0, 1.0, 1.6, 1.0, 1.0, 1.0, 0.6, 1.6, 0.6, 1.0, 1.0, 0.6, 1.0, 0.6, 0.4, 1.0],
            [1.0, 0.4, 1.0, 1.0, 1.0, 1.6, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.6, 0.6, 1.0, 0.6, 1.0],
            [1.6, 1.0, 1.0, 1.0, 1.0, 0.6, 1.6, 1.6, 1.0, 1.0, 0.6, 1.6, 1.0, 1.0, 1.0, 1.0, 0.6, 1.0],
            [1.0, 1.0, 1.0, 0.6, 1.6, 1.0, 0.6, 1.0, 1.0, 1.0, 1.0, 1.6, 1.0, 1.0, 1.0, 1.6, 0.6, 0.6],
            [1.0, 1.0, 0.6, 1.0, 1.0, 1.0, 1.6, 1.0, 1.0, 0.6, 1.6, 1.0, 1.0, 1.0, 1.0, 1.6, 1.0, 0.6]
        ];

export const types = ['Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water'];
export const icons: IconName[] = ['bug', 'circle', 'dragon', 'bolt', 'sparkles', 'fist-raised', 'fire', 'dove', 'ghost', 'leaf', 'mountains', 'snowflake', 'dot-circle', 'skull', 'galaxy', 'guitar-electric', 'cog', 'tint'];

export const faIcons: IconDefinition[] = [
    faBug,
    faSpaceStationMoon,
    faDragon,
    faBolt,
    faSparkles,
    faFistRaised,
    faFire,
    faDove,
    faGhost,
    faLeaf,
    faMountains,
    faSnowflake,
    faDotCircle,
    faSkull,
    faGalaxy,
    faGuitarElectric,
    faCog,
    faTint,
    ];

export enum Type {
    'Bug', 
    'Dark',
    'Dragon', 
    'Electric', 
    'Fairy', 
    'Fighting',
     'Fire',
    'Flying',
    'Ghost', 
    'Grass', 
    'Ground', 
    'Ice', 
    'Normal',
     'Poison',
      'Psychic', 
      'Rock',
       'Steel', 
       'Water'
}

export const colFgDark = [
    true,
    false,
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    false,
]