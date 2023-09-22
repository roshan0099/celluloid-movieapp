// import { useEffect } from "react";

// export default function useOnchange(param){

//     useEffect(
//         ()=>{console.log("yoo its changing frr")}
        
//         , [param])

// }

import { useEffect } from 'react';

/**
 * Custom hook that triggers an effect whenever the specified value changes.
 * @param {any} value - The value to monitor for changes.
 */
function useValueChanged(value) {
  useEffect(() => {
    // Your code here to handle the effect when 'value' changes
    // This function will be called whenever 'value' changes.
    console.log(`Value changed to ${value}`);
  }, [value]);
}

export default useValueChanged;
