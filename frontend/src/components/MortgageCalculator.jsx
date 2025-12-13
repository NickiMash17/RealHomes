import React, { useState, useMemo } from 'react';
import { Modal, Button, Slider, NumberInput } from '@mantine/core';
import { motion } from 'framer-motion';
import { FaCalculator, FaHome, FaPercent, FaCalendarAlt, FaDollarSign, FaInfoCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const MortgageCalculator = ({ opened, onClose, propertyPrice = null }) => {
  const [homePrice, setHomePrice] = useState(propertyPrice || 5000000);
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(11.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const [monthlyInsurance, setMonthlyInsurance] = useState(500);
  const [monthlyTaxes, setMonthlyTaxes] = useState(1000);
  const [monthlyHOA, setMonthlyHOA] = useState(0);

  // Calculate mortgage details
  const calculations = useMemo(() => {
    const principal = homePrice * (1 - downPayment / 100);
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    // Calculate monthly payment using standard mortgage formula
    // M = P * [r(1+r)^n] / [(1+r)^n - 1]
    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      const numerator = monthlyRate * Math.pow(1 + monthlyRate, numPayments);
      const denominator = Math.pow(1 + monthlyRate, numPayments) - 1;
      monthlyPayment = principal * (numerator / denominator);
    } else {
      monthlyPayment = principal / numPayments;
    }

    const totalMonthlyPayment = monthlyPayment + monthlyInsurance + monthlyTaxes + monthlyHOA;
    const totalInterest = (monthlyPayment * numPayments) - principal;
    const totalCost = homePrice + totalInterest + (monthlyInsurance * numPayments) + (monthlyTaxes * numPayments) + (monthlyHOA * numPayments);

    return {
      principal,
      monthlyPayment: Math.round(monthlyPayment),
      totalMonthlyPayment: Math.round(totalMonthlyPayment),
      totalInterest: Math.round(totalInterest),
      totalCost: Math.round(totalCost),
      downPaymentAmount: Math.round(homePrice * (downPayment / 100))
    };
  }, [homePrice, downPayment, interestRate, loanTerm, monthlyInsurance, monthlyTaxes, monthlyHOA]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleReset = () => {
    setHomePrice(propertyPrice || 5000000);
    setDownPayment(20);
    setInterestRate(11.5);
    setLoanTerm(20);
    setMonthlyInsurance(500);
    setMonthlyTaxes(1000);
    setMonthlyHOA(0);
  };

  const handleShareResults = () => {
    const results = `
Mortgage Calculation Results:
• Home Price: ${formatCurrency(homePrice)}
• Down Payment: ${downPayment}% (${formatCurrency(calculations.downPaymentAmount)})
• Loan Amount: ${formatCurrency(calculations.principal)}
• Interest Rate: ${interestRate}%
• Loan Term: ${loanTerm} years
• Monthly Payment: ${formatCurrency(calculations.monthlyPayment)}
• Total Monthly (with taxes/insurance): ${formatCurrency(calculations.totalMonthlyPayment)}
• Total Interest: ${formatCurrency(calculations.totalInterest)}
• Total Cost: ${formatCurrency(calculations.totalCost)}
    `.trim();

    if (navigator.share) {
      navigator.share({
        title: 'Mortgage Calculation Results',
        text: results,
      }).catch(() => {
        navigator.clipboard.writeText(results);
        toast.success('Results copied to clipboard!');
      });
    } else {
      navigator.clipboard.writeText(results);
      toast.success('Results copied to clipboard!');
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <FaCalculator className="text-amber-600 text-2xl" />
          <span className="text-2xl font-bold text-gray-900">Mortgage Calculator</span>
        </div>
      }
      size="xl"
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      transitionProps={{ transition: 'pop', duration: 200 }}
      classNames={{
        content: 'rounded-2xl shadow-2xl',
        header: 'px-6 py-4 border-b border-gray-200',
        body: 'p-0',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-b-2xl p-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FaHome className="text-amber-600" />
              Loan Details
            </h3>

            {/* Home Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Home Price
              </label>
              <NumberInput
                value={homePrice}
                onChange={(value) => setHomePrice(value || 0)}
                min={0}
                max={100000000}
                step={100000}
                prefix="R "
                thousandSeparator=" "
                className="w-full"
                classNames={{
                  input: 'input-enhanced',
                }}
              />
            </div>

            {/* Down Payment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Down Payment: {downPayment}% ({formatCurrency(calculations.downPaymentAmount)})
              </label>
              <Slider
                value={downPayment}
                onChange={setDownPayment}
                min={0}
                max={50}
                step={1}
                marks={[
                  { value: 0, label: '0%' },
                  { value: 10, label: '10%' },
                  { value: 20, label: '20%' },
                  { value: 30, label: '30%' },
                  { value: 50, label: '50%' },
                ]}
                color="amber"
                className="mt-2"
              />
            </div>

            {/* Interest Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate: {interestRate}%
              </label>
              <Slider
                value={interestRate}
                onChange={setInterestRate}
                min={5}
                max={20}
                step={0.1}
                marks={[
                  { value: 5, label: '5%' },
                  { value: 10, label: '10%' },
                  { value: 15, label: '15%' },
                  { value: 20, label: '20%' },
                ]}
                color="amber"
                className="mt-2"
              />
            </div>

            {/* Loan Term */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Term: {loanTerm} years
              </label>
              <Slider
                value={loanTerm}
                onChange={setLoanTerm}
                min={5}
                max={30}
                step={1}
                marks={[
                  { value: 5, label: '5y' },
                  { value: 10, label: '10y' },
                  { value: 15, label: '15y' },
                  { value: 20, label: '20y' },
                  { value: 30, label: '30y' },
                ]}
                color="amber"
                className="mt-2"
              />
            </div>

            {/* Additional Monthly Costs */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <FaInfoCircle className="text-gray-400" />
                Additional Monthly Costs
              </h4>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Home Insurance
                  </label>
                  <NumberInput
                    value={monthlyInsurance}
                    onChange={(value) => setMonthlyInsurance(value || 0)}
                    min={0}
                    prefix="R "
                    thousandSeparator=" "
                    className="w-full"
                    classNames={{
                      input: 'input-enhanced text-sm',
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Property Taxes
                  </label>
                  <NumberInput
                    value={monthlyTaxes}
                    onChange={(value) => setMonthlyTaxes(value || 0)}
                    min={0}
                    prefix="R "
                    thousandSeparator=" "
                    className="w-full"
                    classNames={{
                      input: 'input-enhanced text-sm',
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    HOA Fees (if applicable)
                  </label>
                  <NumberInput
                    value={monthlyHOA}
                    onChange={(value) => setMonthlyHOA(value || 0)}
                    min={0}
                    prefix="R "
                    thousandSeparator=" "
                    className="w-full"
                    classNames={{
                      input: 'input-enhanced text-sm',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FaDollarSign className="text-green-600" />
              Payment Summary
            </h3>

            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border-2 border-amber-200">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 mb-1">Monthly Payment</p>
                <p className="text-4xl font-bold text-amber-700">
                  {formatCurrency(calculations.monthlyPayment)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Principal & Interest only
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Principal & Interest</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(calculations.monthlyPayment)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Home Insurance</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(monthlyInsurance)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property Taxes</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(monthlyTaxes)}
                    </span>
                  </div>
                  {monthlyHOA > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">HOA Fees</span>
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(monthlyHOA)}
                      </span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Total Monthly Payment</span>
                      <span className="font-bold text-lg text-amber-700">
                        {formatCurrency(calculations.totalMonthlyPayment)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Loan Breakdown */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <h4 className="font-semibold text-gray-900 text-sm mb-3">Loan Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Home Price</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(homePrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Down Payment ({downPayment}%)</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(calculations.downPaymentAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Amount</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(calculations.principal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Interest</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(calculations.totalInterest)}
                  </span>
                </div>
                <div className="border-t border-gray-300 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total Cost</span>
                    <span className="font-bold text-amber-700">
                      {formatCurrency(calculations.totalCost)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleReset}
                variant="light"
                color="gray"
                className="flex-1"
              >
                Reset
              </Button>
              <Button
                onClick={handleShareResults}
                variant="light"
                color="blue"
                className="flex-1"
              >
                Share Results
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
};

export default MortgageCalculator;

