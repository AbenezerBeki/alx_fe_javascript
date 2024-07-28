const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const importFile = document.getElementById('importFile');

let quotes = [
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { text: 'In the middle of difficulty lies opportunity.', author: 'Albert Einstein' },
  // ... more quotes
];

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.textContent = `"${randomQuote.text}"  
 - ${randomQuote.author}`;
}

function createAddQuoteForm() {
  const form = document.createElement('form');
  form.id = 'addQuoteForm';

  const quoteInput = document.createElement('input');
  quoteInput.type = 'text';
  quoteInput.placeholder = 'Enter quote';
  quoteInput.id = 'newQuoteText';

  const categoryInput = document.createElement('input');
  categoryInput.type = 'text';
  categoryInput.placeholder = 'Enter category';
  categoryInput.id = 'newQuoteCategory';

  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.addEventListener('click', addQuote);

  form.appendChild(quoteInput);
  form.appendChild(categoryInput);
  form.appendChild(addButton);
  document.body.appendChild(form);
}

function addQuote() {
  const quoteText = document.getElementById('newQuoteText').value;
  const quoteCategory = document.getElementById('newQuoteCategory').value;

  if (quoteText && quoteCategory) {
    const newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote);
    showRandomQuote();
  }
}

showRandomQuote();
createAddQuoteForm();


function loadQuotesFromLocalStorage() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

function saveQuotesToLocalStorage() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.textContent = `"${randomQuote.text}"   
 - ${randomQuote.author}`;
}

function createAddQuoteForm() {
  // ... existing code for creating the form ...
}

function addQuote() {
  const quoteText = document.getElementById('newQuoteText').value;
  const quoteCategory = document.getElementById('newQuoteCategory').value;

  if (quoteText && quoteCategory) {
    const newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote);
    saveQuotesToLocalStorage();
    showRandomQuote();
  }
}

function exportQuotesToJson() {
  const jsonQuotes = JSON.stringify(quotes);
  const blob = new Blob([jsonQuotes], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download   
 = 'quotes.json';
  link.click();
  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotesToLocalStorage();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

function getLastViewedQuote() {
  const storedQuote = sessionStorage.getItem('lastViewedQuote');
  return storedQuote ? JSON.parse(storedQuote) : null;
}

// Load quotes from local storage
loadQuotesFromLocalStorage();

// Event listeners
newQuoteButton.addEventListener('click', showRandomQuote);
document.body.appendChild(createAddQuoteForm());
importFile.addEventListener('change', importFromJsonFile);

// Show a random quote on page load (optional)
showRandomQuote();