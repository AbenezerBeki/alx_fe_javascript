const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const importFile = document.getElementById('importFile');
const categoryFilter = document.getElementById('categoryFilter');

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

let categories = [];

function loadQuotesFromLocalStorage() {
  const storedData = localStorage.getItem('quoteData');
  if (storedData) {
    const savedData = JSON.parse(storedData);
    quotes = savedData.quotes;
    categories = savedData.categories;
  }
}

function saveQuotesToLocalStorage() {
  const dataToSave = { quotes, categories };
  localStorage.setItem('quoteData', JSON.stringify(dataToSave));
}

function showRandomQuote(filteredQuotes) {
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];
  quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.author}`;
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
    categories.push(quoteCategory);
    saveQuotesToLocalStorage();
    updateCategoryFilter();
    showRandomQuote();
  }
}

function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
  showRandomQuote(filteredQuotes);
  // Optional: Store selected category in session storage
  sessionStorage.setItem('selectedCategory', selectedCategory);
}

function updateCategoryFilter() {
  const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
  uniqueCategories.unshift('all');
  categoryFilter.innerHTML = '';
  uniqueCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent   
 = category;
    categoryFilter.appendChild(option);   

  });
}

function loadQuotesFromLocalStorage() {
  // ... existing code for loading quotes from local storage ...
  updateCategoryFilter();
  // Restore last selected category (optional)
  const lastCategory = sessionStorage.getItem('selectedCategory');
  if (lastCategory) {
    categoryFilter.value = lastCategory;
    filterQuotes();
  }
}

// Event listeners
newQuoteButton.addEventListener('click', addQuote);
categoryFilter.addEventListener('change', filterQuotes);

loadQuotesFromLocalStorage();
createAddQuoteForm();


let lastSync = 0;
const syncInterval = 5000; // Sync every 5 seconds

function loadQuotesFromLocalStorage() {
  // ... existing code for loading quotes from local storage ...
}

function saveQuotesToLocalStorage() {
  // ... existing code for saving quotes to local storage ...
}

function showRandomQuote(filteredQuotes) {
  // ... existing code for showing random quote ...
}

function createAddQuoteForm() {
  // ... existing code for creating add quote form ...
}

function addQuote() {
  // ... existing code for adding a new quote ...
}

function filterQuotes() {
  // ... existing code for filtering quotes ...
}

function updateCategoryFilter() {
  // ... existing code for updating category filter ...
}

function syncData() {
  const now = Date.now();
  if (now - lastSync < syncInterval) return;
  lastSync = now;

  fetch('https://jsonplaceholder.typicode.com/posts') // Replace with your actual API endpoint
    .then(response => response.json())
    .then(serverQuotes => {
      // Simulate server data (replace with your actual data parsing logic)
      const newQuotes = serverQuotes.map(post => ({ text: post.title, category: 'server' }));
      const mergedQuotes = [...quotes, ...newQuotes];
      quotes = mergedQuotes;
      saveQuotesToLocalStorage();
      updateCategoryFilter();
      showRandomQuote();
    })
    .catch(error => {
      console.error('Error syncing data:', error);
    });
}

// ... rest of the code ...

setInterval(syncData, syncInterval);