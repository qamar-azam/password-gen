import { useState } from 'react';

import './password-generator.scss';
export default function PasswordGenerator() {
  const [length, setLength] = useState(10);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState('');

  const generatePassword = (e) => {
    e.preventDefault();
    let charset = '';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (!charset) return;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      generatedPassword += charset.charAt(
        Math.floor(Math.random() * charset.length)
      );
    }
    setPassword(generatedPassword);
  };

  const handleCheckboxChange = (setter, checked) => {
    const options = [
      includeLowercase,
      includeUppercase,
      includeNumbers,
      includeSymbols
    ];

    let selectedOptions = options.reduce(
      (total, value) => (value ? total + 1 : total),
      0
    );

    if (selectedOptions === 1 && !checked) {
    } else {
      setter((prev) => !prev);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <div className={'password-gen-form'}>
      <form onSubmit={generatePassword}>
        <div className='input-field'>
          <input type='text' value={password} readOnly />
          <button type='button' onClick={copyToClipboard} className='copy-btn'>
            Copy
          </button>
        </div>

        <label>
          Length:
          <input
            type='range'
            min='1'
            max='20'
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          {length}
        </label>

        <label>
          <input
            type='checkbox'
            checked={includeLowercase}
            onChange={() =>
              handleCheckboxChange(setIncludeLowercase, !includeLowercase)
            }
          />
          Include Lowercase
        </label>

        <label>
          <input
            type='checkbox'
            checked={includeUppercase}
            onChange={() =>
              handleCheckboxChange(setIncludeUppercase, !includeUppercase)
            }
          />
          Include Uppercase
        </label>

        <label>
          <input
            type='checkbox'
            checked={includeNumbers}
            onChange={() =>
              handleCheckboxChange(setIncludeNumbers, !includeNumbers)
            }
          />
          Include Numbers
        </label>

        <label>
          <input
            type='checkbox'
            checked={includeSymbols}
            onChange={() =>
              handleCheckboxChange(setIncludeSymbols, !includeSymbols)
            }
          />
          Include Symbols
        </label>

        <button type='submit'>Generate</button>
      </form>
    </div>
  );
}
