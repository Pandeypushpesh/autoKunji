import React from "react";
import { useState,useEffect,useCallback ,useRef} from "react";


function App() {
  const [Length, setLength] = useState(6);
  const [numAllowed, setnumAllowed] = useState(false); //<---- useState
  const [charAllowed, setcharAllowed] = useState(false); //<---- useState
  const [Password, setPassword] = useState(""); //<---- useState


  //useRef

  const passRefe = useRef(null);

  //password generator
  //UseCallback hook
  const passGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";
    //for loop
    for (let i = 0; i < Length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
setPassword(pass);

  }, [Length, numAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(()=>{
    passRefe.current?.select(Password)
    window.navigator.clipboard.writeText(Password);
  },[Password])

  //useEffect hook 

  useEffect(()=>{
    passGen();

  },[Length, numAllowed, charAllowed, passGen])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-4xl text-center text-amber-400 mx-auto w-fit font-[cursive] drop-shadow-[0_0_10px_#facc15] tracking-wider">
        कुंजी 
      </h1>
      <br />
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={Password}
          className="outline-none w-full py-1 px-3 bg-white"
          placeholder="Password"
          readOnly
          ref={passRefe}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="cursor-pointer outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 transition duration-300 hover:shadow-[0_0_10px_#3b82f6] hover:bg-violet-500"
        >
          copy
        </button>
      </div>
      <div>
        {/* range wala div  */}
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={4}
            max={20}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length : {Length} </label>
        </div>

        <br />

        {/* Numallow wala div  */}

        <div>
          <input type="checkbox" 
          className="cursor-pointer"
          defaultChecked={numAllowed}
          onChange={(e) => {
              setnumAllowed((prev)=>!prev);
            }}
          />
          <label htmlFor="NumberInput">Number Allowed</label>
        </div>

        <br />

        {/* Charallow wala div  */}

        <div>
          <input type="checkbox" 
          className="cursor-pointer"
          defaultChecked={charAllowed}
           onChange={(e) => {
              setcharAllowed((prev)=>!prev);
            }}
          />
          <label htmlFor="CharInput">Char Allowed</label>
        </div>
      </div>
    </div>
  );
}

export default App;
