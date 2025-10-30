import React, { useState } from 'react';
import { Download, FileText, Table, BarChart3, FileSpreadsheet } from 'lucide-react';
import { useToast } from './Toast';

interface ExportMenuProps {
  data: any[];
  filename: string;
}

const ExportMenu: React.FC<ExportMenuProps> = ({ data, filename }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { showToast } = useToast();

  const exportToCSV = () => {
    if (data.length === 0) {
      showToast('error', 'No Data', 'No data available to export');
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map((row) =>
        headers.map((header) => {
          const value = row[header];
          // Escape commas and quotes
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('success', 'Exported', `${filename}.csv downloaded successfully`);
    setIsOpen(false);
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('success', 'Exported', `${filename}.json downloaded successfully`);
    setIsOpen(false);
  };

  const copyToClipboard = () => {
    const text = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(text);
    showToast('success', 'Copied', 'Data copied to clipboard');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-lg text-dark-200 transition-all text-sm font-medium"
      >
        <Download className="h-4 w-4" />
        <span>Export</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-48 bg-dark-800 border border-dark-700 rounded-lg shadow-xl z-50 overflow-hidden animate-scale-in">
            <button
              onClick={exportToCSV}
              className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-dark-700 transition-colors text-left"
            >
              <FileSpreadsheet className="h-4 w-4 text-primary-400" />
              <div>
                <div className="text-sm font-medium text-dark-100">Export CSV</div>
                <div className="text-xs text-dark-500">Excel compatible</div>
              </div>
            </button>
            <button
              onClick={exportToJSON}
              className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-dark-700 transition-colors text-left border-t border-dark-700"
            >
              <FileText className="h-4 w-4 text-primary-400" />
              <div>
                <div className="text-sm font-medium text-dark-100">Export JSON</div>
                <div className="text-xs text-dark-500">Developer friendly</div>
              </div>
            </button>
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-dark-700 transition-colors text-left border-t border-dark-700"
            >
              <Table className="h-4 w-4 text-primary-400" />
              <div>
                <div className="text-sm font-medium text-dark-100">Copy Data</div>
                <div className="text-xs text-dark-500">To clipboard</div>
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ExportMenu;
