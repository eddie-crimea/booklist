// ES5 OOP Method application

// Book constructor
function Book(title, author, isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}


// UI constructor
function UI() { };

UI.prototype.addBookToList = function (book) {
	const list = document.getElementById('book-list');
	//Create tr element
	const row = document.createElement('tr');
	// Insert cols
	row.innerHTML = `
	<td>${book.title}</td>
	<td>${book.author}</td>
	<td>${book.isbn}</td>
	<td><a href="" class="delete">X</td>
	`;
	list.appendChild(row);
}

// Show Alert Error
UI.prototype.showAlert = function (message, className) {
	// Create div
	const div = document.createElement('div');
	// Add classname
	div.className = `alert ${className}`;
	// Add Text
	div.appendChild(document.createTextNode(message));
	// Get Parent
	const container = document.querySelector('.container');
	// Get form
	const form = document.querySelector('#book-form');
	// Insert Alert 
	container.insertBefore(div, form);

	setTimeout(function () {
		document.querySelector('.alert').remove();
	}, 3000);
}

// Delete book
UI.prototype.deleteBook = function(target) {
	if (target.className === 'delete') {
		target.parentElement.parentElement.remove();
	}
}

// Clear fields
UI.prototype.clearFields = function () {
	document.getElementById('title').value = '';
	document.getElementById('author').value = '';
	document.getElementById('isbn').value = '';
}

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function (e) {
	// get form vaules	
	const title = document.getElementById('title').value;
	const author = document.getElementById('author').value;
	const isbn = document.getElementById('isbn').value;

	// Instatiate book
	const book = new Book(title, author, isbn);
	
	// Instatiate UI
	const ui = new UI();

		// Validate
	if (title === '' || author === '' || isbn === '') {
		// Error alert
		ui.showAlert('Please fill in all fields', 'error');
	} else {
		// Add book to list
		ui.addBookToList(book);
		//Show Success
		ui.showAlert('Boook Added', 'success');
		// Clear Fields
		ui.clearFields();
	}
	e.preventDefault();
});

// Event Listener for delete book
document.getElementById('book-list').addEventListener('click', function (e) {
	const ui = new UI();

	// Delete book
	ui.deleteBook(e.target);

	// Show alert
	ui.showAlert('Book removed', 'success');

	e.preventDefault();
});

