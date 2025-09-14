import React, { useState } from 'react';

const CostCalculator = () => {
  const [businessType, setBusinessType] = useState('srl_simplified');
  const [employees, setEmployees] = useState(1);
  const [revenue, setRevenue] = useState(50000);

  // Funzione per ottimizzare le immagini
  const getOptimizedImageUrl = (url, width = 400) => {
    if (!url) return '';
    // Se è un'immagine locale, aggiungi dimensioni
    if (url.startsWith('/')) {
      return `${url}?w=${width}&q=80`;
    }
    return url;
  };

  const calculateCosts = () => {
    const costs = {
      srl_simplified: {
        formation: 1500,
        notary: 800,
        annual: 2000,
        taxRate: 0.24
      },
      srl_standard: {
        formation: 2500,
        notary: 1200,
        annual: 3000,
        taxRate: 0.24
      },
      partita_iva: {
        formation: 500,
        notary: 0,
        annual: 1500,
        taxRate: 0.43
      }
    };

    const selected = costs[businessType];
    const annualTax = revenue * selected.taxRate;
    const totalFirstYear = selected.formation + selected.notary + selected.annual + annualTax;
    const monthlyCost = (selected.annual + annualTax) / 12;

    return { totalFirstYear, monthlyCost, annualTax };
  };

  const { totalFirstYear, monthlyCost, annualTax } = calculateCosts();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4">💰 Business Cost Calculator</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Business Type</label>
          <select 
            value={businessType} 
            onChange={(e) => setBusinessType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="srl_simplified">SRL Simplified (€1 capital)</option>
            <option value="srl_standard">SRL Standard (€10k capital)</option>
            <option value="partita_iva">Partita IVA (Freelancer)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Expected Annual Revenue (€)
          </label>
          <input
            type="number"
            value={revenue}
            onChange={(e) => setRevenue(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md"
            min="0"
          />
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 mb-4">
        <h4 className="font-semibold mb-2">Estimated Costs:</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-600">First Year Total:</span>
            <div className="text-xl font-bold text-blue-700">
              €{totalFirstYear.toLocaleString()}
            </div>
          </div>
          <div>
            <span className="text-sm text-gray-600">Monthly Ongoing:</span>
            <div className="text-xl font-bold text-blue-700">
              €{monthlyCost.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Includes formation costs, notary fees, accounting, and estimated taxes
        </div>
      </div>

      <div className="text-sm text-gray-600">
        💡 <strong>Note:</strong> These are estimates. Actual costs may vary based on specific 
        circumstances and professional service fees.
      </div>
    </div>
  );
};

export default CostCalculator;