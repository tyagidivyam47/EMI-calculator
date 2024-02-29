export const giveEMI = (principle, rateOfInterest, tenure, tenureType) =>{
    if (
        !Number(rateOfInterest) ||
        !Number(tenure) ||
        !Number(principle)
      ) {
        return;
      }
      if (tenure.toString().includes(".") && tenureType === "Years") {
          const tempArr = tenure.toString().split('.');
          const yrs = tempArr[0];
          const mns = tempArr[1];
          
          let interest = rateOfInterest / 12 / 100;
          const tenureInMonths = +yrs * 12 + +mns;
          let emi =
        (principle * interest * Math.pow(1 + interest, tenureInMonths)) /
        (Math.pow(1 + interest, tenureInMonths) - 1);
  
          let totalAmt = emi * tenureInMonths;
          let totalInt = totalAmt - principle;
          
          emi = emi.toFixed(2);
          totalInt = totalInt.toFixed(2);
          totalAmt = totalAmt.toFixed(2);
          return {emi, totalInt, totalAmt, tenureInMonths}
      }
      let tenureConvHelper = tenureType === "Years" ? 1 : 12;
  
      let interest = rateOfInterest / 12 / 100;
      let tenureInMonths = (tenure * 12) / tenureConvHelper;
  
      let emi =
        (principle * interest * Math.pow(1 + interest, tenureInMonths)) /
        (Math.pow(1 + interest, tenureInMonths) - 1);
  
      let totalAmt = emi * tenureInMonths;
      let totalInt = totalAmt - principle;
     emi = emi.toFixed(2);
    totalInt = totalInt.toFixed(2);
          totalAmt = totalAmt.toFixed(2);
      return {emi, totalInt, totalAmt, tenureInMonths}
}

export const toggleTenure = (tenureType, tenure) =>{
    // console.log(tenure.toString().includes("."))
    // console.log(tenure, " : ", tenureType)
    if (tenure.toString().includes(".")) {
        // console.log("here")
        const tempArr = tenure.toString().split('.');
          const yrs = tempArr[0];
          const mns = tempArr[1];
          const tenureInMonths = +yrs * 12 + +mns;
          return Math.floor(+tenureInMonths);
    }
    if(tenureType === "Years"){
        // console.log("yrs")
        var years = Math.floor(tenure / 12);
        var remainingMonths = tenure % 12;
        var result = years + "." + remainingMonths;
        return parseFloat(+result);
        // return (tenure / 12)
      }
      else{
      // console.log("mos")
        return(tenure * 12)
    } 
}