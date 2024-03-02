export const calcAmortization = (
  totalPrincipal: any,
  rateOfInterest: any,
  monTenure: any,
  emi: any
) => {

  let output = [
    {
      payment: 0,
      interest: 0,
      principal: 0,
      unpaid: totalPrincipal,
    },
  ];
  const monInterest = rateOfInterest / 100 / 12;

  for (let i = 1; i <= monTenure; i++) {
    const prevUnpaid = output[i - 1].unpaid;
    const currInterest = parseFloat((monInterest * prevUnpaid).toFixed(2));
    const currPrincipal = parseFloat((emi - currInterest).toFixed(2));
    const currBalance = parseFloat((prevUnpaid - currPrincipal).toFixed(2));
    output.push({
      payment: emi,
      interest: currInterest,
      principal: currPrincipal,
      unpaid: currBalance,
    });
}
return output;
};
