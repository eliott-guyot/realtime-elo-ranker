import React, { FC, useState } from "react";

export enum MatchResult {
  LEFT_WIN = "LEFT_WIN",
  RIGHT_WIN = "RIGHT_WIN",
  DRAW = "DRAW",
}

interface MatchFormProps {
  callback: (
    adversaryA: string,
    adversaryB: string,
    result: MatchResult
  ) => Promise<Response>;
}

const MatchForm: FC<MatchFormProps> = (props) => {
  const { callback } = props;
  const [adversaryA, setAdversaryA] = useState("");
  const [adversaryB, setAdversaryB] = useState("");

  const getRandomResult = () => {
    const r = Math.random();
    if (r < 1/3) return MatchResult.LEFT_WIN;
    if (r < 2/3) return MatchResult.DRAW;
    return MatchResult.RIGHT_WIN;
  };

  const [result, setResult] = useState<MatchResult>(getRandomResult());

  const resetForm = () => {
    setAdversaryA("");
    setAdversaryB("");
    setResult(getRandomResult());
  };

  return (
    <form
      data-testid="MatchForm"
      className="flex flex-col justify-center mb-4 gap-4 p-2 border border-gray-300 rounded-md"
      onSubmit={(evt) => {
        evt.preventDefault();
        callback(adversaryA, adversaryB, result).then((res) => {
          if (res.ok) {
            resetForm();
          } else {
            // TODO: toast error
            console.error("Error while posting match result");
          }
        });
      }}
    >
      <div className="flex justify-between items-start pt-4 h-32">
        {/* Colonne Joueur A (Gauche) */}
        <div 
          className="flex flex-col items-center gap-2 cursor-pointer w-1/3"
          onClick={() => setResult(MatchResult.LEFT_WIN)}
        >
          <input 
            type="radio" 
            checked={result === MatchResult.LEFT_WIN} 
            onChange={() => setResult(MatchResult.LEFT_WIN)}
            className="transform scale-150 mb-2"
          />
          
          <span className="text-xl font-bold">Adversaire A</span>
          <input 
            type="text" 
            className="border border-gray-300 rounded-md p-1 w-full text-center" 
            placeholder="ID Joueur A"
            value={adversaryA} 
            onChange={(evt) => setAdversaryA(evt.target.value)} 
            onClick={(e) => e.stopPropagation()} 
          />
        </div>

        {/* Colonne Match Nul (Centre) */}
        <div 
          className="flex flex-col items-center justify-start gap-2 cursor-pointer w-1/3 pt-2"
          onClick={() => setResult(MatchResult.DRAW)}
        >
          <input 
            type="radio" 
            checked={result === MatchResult.DRAW} 
            onChange={() => setResult(MatchResult.DRAW)}
            className="transform scale-150 mb-2"
          />
          <span className="text-sm text-gray-500 uppercase tracking-widest mt-2">Match Nul</span>
        </div>

        {/* Colonne Joueur B (Droite) */}
        <div 
          className="flex flex-col items-center gap-2 cursor-pointer w-1/3"
          onClick={() => setResult(MatchResult.RIGHT_WIN)}
        >
          <input 
            type="radio" 
            checked={result === MatchResult.RIGHT_WIN} 
            onChange={() => setResult(MatchResult.RIGHT_WIN)}
            className="transform scale-150 mb-2"
          />

          <span className="text-xl font-bold">Adversaire B</span>
          <input 
            type="text" 
            className="border border-gray-300 rounded-md p-1 w-full text-center" 
            placeholder="ID Joueur B"
            value={adversaryB} 
            onChange={(evt) => setAdversaryB(evt.target.value)} 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-800 text-white px-4 py-2 rounded-md mt-4 self-center w-1/2"
      >
        Déclarer le match
      </button>
    </form>
  );
};

export default MatchForm;
