import { useRef, useState } from 'react';
import './App.css';

function App() {
  const [opponentTypes, setOpponentTypes] = useState<string[]>([]);

  const outcomeSectionRef = useRef<HTMLElement | null>(null);

  const handleSelectOpponentType = (typeName: string) => {
    setOpponentTypes((prev) => {
      if (prev.includes(typeName)) {
        return prev.filter((type) => type !== typeName);
      }

      if (prev.length === 2) {
        return [prev[1], typeName];
      }

      return [...prev, typeName];
    });

    // if (window.innerWidth < 768) {
    //   setTimeout(() => {
    //     outcomeSectionRef.current?.scrollIntoView({
    //       behavior: 'smooth',
    //       block: 'start'
    //     });
    //   }, 50);
    // }
  };

  const getMultiplier = (attackType: string, defenders: string[]) => {
    const data = effectiveness[attackType];

    return defenders.reduce((multiplier, defender) => {
      if (data.immune.includes(defender)) return 0;
      if (data.strong.includes(defender)) return multiplier * 2;
      if (data.weak.includes(defender)) return multiplier * 0.5;
      return multiplier;
    }, 1);
  };

  const getMatchup = (defenders: string[]) => {
    const quadrupleEffective: string[] = [];
    const superEffective: string[] = [];
    const notVeryEffective: string[] = [];
    const quarterEffective: string[] = [];
    const noEffect: string[] = [];

    Object.keys(effectiveness).forEach((attackType) => {
      const multiplier = getMultiplier(attackType, defenders);

      if (multiplier === 0) {
        noEffect.push(attackType);
      } else if (multiplier === 4) {
        quadrupleEffective.push(attackType);
      } else if (multiplier === 2) {
        superEffective.push(attackType);
      } else if (multiplier === 0.5) {
        notVeryEffective.push(attackType);
      } else if (multiplier === 0.25) {
        quarterEffective.push(attackType);
      }
    });

    return {
      quadrupleEffective,
      superEffective,
      notVeryEffective,
      quarterEffective,
      noEffect
    };
  };

  const types = [
    { name: 'Normal', jp: 'ノーマル', cn: '一般', color: 'bg-zinc-400 text-white' },
    { name: 'Fire', jp: 'ほのお', cn: '火', color: 'bg-red-500 text-white' },
    { name: 'Water', jp: 'みず', cn: '水', color: 'bg-blue-500 text-white' },
    { name: 'Grass', jp: 'くさ', cn: '草', color: 'bg-green-500 text-white' },
    { name: 'Electric', jp: 'でんき', cn: '电', color: 'bg-yellow-400 text-black' },
    { name: 'Ice', jp: 'こおり', cn: '冰', color: 'bg-cyan-300 text-black' },
    { name: 'Fighting', jp: 'かくとう', cn: '格斗', color: 'bg-orange-700 text-white' },
    { name: 'Poison', jp: 'どく', cn: '毒', color: 'bg-purple-500 text-white' },
    { name: 'Ground', jp: 'じめん', cn: '地面', color: 'bg-amber-600 text-white' },
    { name: 'Flying', jp: 'ひこう', cn: '飞行', color: 'bg-indigo-300 text-black' },
    { name: 'Psychic', jp: 'エスパー', cn: '超能力', color: 'bg-pink-500 text-white' },
    { name: 'Bug', jp: 'むし', cn: '虫', color: 'bg-lime-500 text-black' },
    { name: 'Rock', jp: 'いわ', cn: '岩石', color: 'bg-yellow-700 text-white' },
    { name: 'Ghost', jp: 'ゴースト', cn: '幽灵', color: 'bg-violet-700 text-white' },
    { name: 'Dragon', jp: 'ドラゴン', cn: '龙', color: 'bg-indigo-600 text-white' },
    { name: 'Dark', jp: 'あく', cn: '恶', color: 'bg-neutral-800 text-white' },
    { name: 'Steel', jp: 'はがね', cn: '钢', color: 'bg-slate-400 text-black' },
    { name: 'Fairy', jp: 'フェアリー', cn: '妖精', color: 'bg-pink-300 text-black' }
  ];

  const typeMap = Object.fromEntries(types.map((type) => [type.name, type]));

  type EffectivenessEntry = {
    strong: string[];
    weak: string[];
    immune: string[];
  };

  const effectiveness: Record<string, EffectivenessEntry> = {
    Normal: {
      strong: [],
      weak: ['Rock', 'Steel'],
      immune: ['Ghost']
    },
    Fire: {
      strong: ['Grass', 'Ice', 'Bug', 'Steel'],
      weak: ['Fire', 'Water', 'Rock', 'Dragon'],
      immune: []
    },
    Water: {
      strong: ['Fire', 'Ground', 'Rock'],
      weak: ['Water', 'Grass', 'Dragon'],
      immune: []
    },
    Grass: {
      strong: ['Water', 'Ground', 'Rock'],
      weak: ['Fire', 'Grass', 'Poison', 'Flying', 'Bug', 'Dragon', 'Steel'],
      immune: []
    },
    Electric: {
      strong: ['Water', 'Flying'],
      weak: ['Electric', 'Grass', 'Dragon'],
      immune: ['Ground']
    },
    Ice: {
      strong: ['Grass', 'Ground', 'Flying', 'Dragon'],
      weak: ['Fire', 'Water', 'Ice', 'Steel'],
      immune: []
    },
    Fighting: {
      strong: ['Normal', 'Ice', 'Rock', 'Dark', 'Steel'],
      weak: ['Poison', 'Flying', 'Psychic', 'Bug', 'Fairy'],
      immune: ['Ghost']
    },
    Poison: {
      strong: ['Grass', 'Fairy'],
      weak: ['Poison', 'Ground', 'Rock', 'Ghost'],
      immune: ['Steel']
    },
    Ground: {
      strong: ['Fire', 'Electric', 'Poison', 'Rock', 'Steel'],
      weak: ['Grass', 'Bug'],
      immune: ['Flying']
    },
    Flying: {
      strong: ['Grass', 'Fighting', 'Bug'],
      weak: ['Electric', 'Rock', 'Steel'],
      immune: []
    },
    Psychic: {
      strong: ['Fighting', 'Poison'],
      weak: ['Psychic', 'Steel'],
      immune: ['Dark']
    },
    Bug: {
      strong: ['Grass', 'Psychic', 'Dark'],
      weak: ['Fire', 'Fighting', 'Poison', 'Flying', 'Ghost', 'Steel', 'Fairy'],
      immune: []
    },
    Rock: {
      strong: ['Fire', 'Ice', 'Flying', 'Bug'],
      weak: ['Fighting', 'Ground', 'Steel'],
      immune: []
    },
    Ghost: {
      strong: ['Psychic', 'Ghost'],
      weak: ['Dark'],
      immune: ['Normal']
    },
    Dragon: {
      strong: ['Dragon'],
      weak: ['Steel'],
      immune: ['Fairy']
    },
    Dark: {
      strong: ['Psychic', 'Ghost'],
      weak: ['Fighting', 'Dark', 'Fairy'],
      immune: []
    },
    Steel: {
      strong: ['Ice', 'Rock', 'Fairy'],
      weak: ['Fire', 'Water', 'Electric', 'Steel'],
      immune: []
    },
    Fairy: {
      strong: ['Fighting', 'Dragon', 'Dark'],
      weak: ['Fire', 'Poison', 'Steel'],
      immune: []
    }
  };

  const matchup = opponentTypes.length > 0 ? getMatchup(opponentTypes) : null;

  return (
    <>
      <main className="flex flex-col gap-8 p-8">
        <header>
          <h1 className="!text-6xl !font-black">
            <span className="[webkit-text-stroke:4px_red]">Pokémon</span> Type Matchup
          </h1>
          <p className="flex flex-col">
            <span>宝可梦类型相性诊断</span>
            <span>ポケモンタイプ相性診断</span>
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          <section className="flex flex-1 flex-col items-start gap-6 p-8 outline-4 rounded-2xl h-fit">
            <div className="flex flex-col items-start">
              <h2 className="!text-2xl !font-extrabold">Opponent's Type</h2>
              <p className="flex flex-col items-start">
                <span>请选择最多两个对方的类型。</span>
                <span>相手のタイプを2つまで選んでください。</span>
              </p>
            </div>

            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {types.map((type) => (
                <li key={type.name} className="h-full">
                  <button
                    onClick={() => handleSelectOpponentType(type.name)}
                    className={`flex flex-col ${type.color} h-full w-full p-4 rounded-xl aspect-square outline-2 outline-black dark:outline-white transition-opacity justify-center ${opponentTypes.includes(type.name) ? 'ring-4 ring-black dark:ring-white opacity-100' : opponentTypes.length > 0 ? 'opacity-40' : 'opacity-100'}`}
                  >
                    <div className="flex flex-col">
                      <span>{type.name}</span>
                      <span className="text-xs opacity-50">{type.cn}</span>
                      <span className="text-xs opacity-50">{type.jp}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section
            ref={outcomeSectionRef}
            className={`flex flex-1 flex-col items-start gap-6 p-8 outline-4 rounded-2xl ${!matchup ? 'opacity-30' : ''} `}
          >
            <div className="flex flex-col gap-10 w-full">
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col items-start gap-2">
                  <h2 className="text-white !text-2xl !font-extrabold">Ultra Effective (4x)</h2>
                  <p className="flex flex-col items-start">
                    <span>效果绝佳（4倍）</span>
                    <span>効果はばつぐん！（4倍）</span>
                  </p>
                </div>

                <ul className="grid grid-cols-2 gap-6 w-full">
                  {!matchup ? null : matchup.quadrupleEffective.length > 0 ? (
                    matchup.quadrupleEffective.map((type) => {
                      const currentType = typeMap[type];
                      return (
                        <li
                          key={type}
                          className={`flex flex-col ${currentType.color} h-full w-full p-4 rounded-xl aspect-square justify-center outline outline-black dark:outline-white ring-4 ring-black dark:ring-white`}
                        >
                          <div className="flex flex-col">
                            <span>{currentType.name}</span>
                            <span className="text-xs opacity-50">{currentType.cn}</span>
                            <span className="text-xs opacity-50">{currentType.jp}</span>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <li
                      className={`flex flex-col col-span-full h-full w-full p-4 rounded-xl justify-center opacity-40`}
                    >
                      <div className="flex flex-col">
                        <span>There's no matchup.</span>
                        <span className="text-xs opacity-50">没有匹配。</span>
                        <span className="text-xs opacity-50">なし</span>
                      </div>
                    </li>
                  )}
                </ul>
              </div>

              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col items-start gap-2">
                  <h2 className="text-white !text-2xl !font-extrabold">Super Effective (2x)</h2>
                  <p className="flex flex-col items-start">
                    <span>超级有效（2倍）</span>
                    <span>効果はばつぐん！（2倍）</span>
                  </p>
                </div>

                <ul className="grid grid-cols-2 gap-6 w-full">
                  {!matchup ? null : matchup.superEffective.length > 0 ? (
                    matchup.superEffective.map((type) => {
                      const currentType = typeMap[type];
                      return (
                        <li
                          key={type}
                          className={`flex flex-col ${currentType.color} h-full w-full p-4 rounded-xl aspect-square justify-center outline outline-black dark:outline-white ring-4 ring-black dark:ring-white`}
                        >
                          <div className="flex flex-col">
                            <span>{currentType.name}</span>
                            <span className="text-xs opacity-50">{currentType.cn}</span>
                            <span className="text-xs opacity-50">{currentType.jp}</span>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <li
                      className={`flex flex-col col-span-full h-full w-full p-4 rounded-xl justify-center opacity-40`}
                    >
                      <div className="flex flex-col">
                        <span>There's no matchup.</span>
                        <span className="text-xs opacity-50">没有匹配。</span>
                        <span className="text-xs opacity-50">なし</span>
                      </div>
                    </li>
                  )}
                </ul>
              </div>

              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col items-start gap-2">
                  <h2 className="text-white !text-2xl !font-extrabold">Not Very Effective (0.5x)</h2>
                  <p className="flex flex-col items-start">
                    <span>不是很有效（0.5倍）</span>
                    <span>効果はいまひとつ（0.5倍）</span>
                  </p>
                </div>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                  {!matchup ? null : matchup.notVeryEffective.length > 0 ? (
                    matchup.notVeryEffective.map((type) => {
                      const currentType = typeMap[type];
                      return (
                        <li
                          key={type}
                          className={`flex flex-col ${currentType.color} h-full w-full p-4 rounded-xl aspect-square justify-center outline-2 outline-black dark:outline-white`}
                        >
                          <div className="flex flex-col">
                            <span>{currentType.name}</span>
                            <span className="text-xs opacity-50">{currentType.cn}</span>
                            <span className="text-xs opacity-50">{currentType.jp}</span>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <li
                      className={`flex flex-col col-span-full h-full w-full p-4 rounded-xl justify-center opacity-40`}
                    >
                      <div className="flex flex-col">
                        <span>There's no matchup.</span>
                        <span className="text-xs opacity-50">没有匹配。</span>
                        <span className="text-xs opacity-50">なし</span>
                      </div>
                    </li>
                  )}
                </ul>
              </div>

              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col items-start gap-2">
                  <h2 className="text-white !text-2xl !font-extrabold">Barely Effective (0.25x)</h2>
                  <p className="flex flex-col items-start">
                    <span>不是很有效（0.25倍）</span>
                    <span>効果はいまひとつ（0.25倍）</span>
                  </p>
                </div>

                <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                  {!matchup ? null : matchup.quarterEffective.length > 0 ? (
                    matchup.quarterEffective.map((type) => {
                      const currentType = typeMap[type];
                      return (
                        <li
                          key={type}
                          className={`flex flex-col ${currentType.color} h-full w-full p-4 rounded-xl aspect-square justify-center outline-2 outline-black dark:outline-white`}
                        >
                          <div className="flex flex-col">
                            <span>{currentType.name}</span>
                            <span className="text-xs opacity-50">{currentType.cn}</span>
                            <span className="text-xs opacity-50">{currentType.jp}</span>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <li
                      className={`flex flex-col col-span-full h-full w-full p-4 rounded-xl justify-center opacity-40`}
                    >
                      <div className="flex flex-col">
                        <span>There's no matchup.</span>
                        <span className="text-xs opacity-50">没有匹配。</span>
                        <span className="text-xs opacity-50">なし</span>
                      </div>
                    </li>
                  )}
                </ul>
              </div>

              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col items-start gap-2">
                  <h2 className="text-white !text-2xl !font-extrabold">No Effect (0x)</h2>
                  <p className="flex flex-col items-start">
                    <span>没有效果（0倍）</span>
                    <span>効果がない（0倍）</span>
                  </p>
                </div>

                <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                  {!matchup ? null : matchup.noEffect.length > 0 ? (
                    matchup.noEffect.map((type) => {
                      const currentType = typeMap[type];
                      return (
                        <li
                          key={type}
                          className={`flex flex-col ${currentType.color} h-full w-full p-4 rounded-xl aspect-square justify-center outline-2 outline-black dark:outline-white`}
                        >
                          <div className="flex flex-col">
                            <span>{currentType.name}</span>
                            <span className="text-xs opacity-50">{currentType.cn}</span>
                            <span className="text-xs opacity-50">{currentType.jp}</span>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <li className={`flex flex-col col-span-full h-full w-full p-4 rounded-xl opacity-40`}>
                      <div className="flex flex-col">
                        <span>There's no matchup.</span>
                        <span className="text-xs opacity-50">没有匹配。</span>
                        <span className="text-xs opacity-50">なし</span>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
