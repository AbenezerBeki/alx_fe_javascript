const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');

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