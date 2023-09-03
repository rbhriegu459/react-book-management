package com.rishita.bookmanagement;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
public class BookController {
	
	private BookRepository repository;
	
	public BookController(BookRepository repository) {
		super();
		this.repository = repository;
	}

//	Get All Books
	@GetMapping("/books")
	public List<Book> getAllBooks(){
		return repository.findAll();
	}
	
//	Get Book by ID
	@GetMapping("/books/{id}")
	public Optional<Book> getBook(@PathVariable int id) {
		return repository.findById(id);
	}
	
	@DeleteMapping("/books/{id}")
	public void deleteById(@PathVariable int id) {
		repository.deleteById(id);
	}
	
	@PostMapping("/books")
	public void saveBook(@RequestBody Book book) {
		repository.save(book);
	}
	
	@PutMapping("/books/{id}")
	public void updateBook(@PathVariable int id, @RequestBody Book book) {
		Optional<Book> b = repository.findById(id);
		if(b.isPresent()) {
			Book b1 = b.get();
			if(book.getAuthor() != null)
				b1.setAuthor(book.getAuthor());
			if(book.getGenres() != null)
				b1.setGenres(book.getGenres());
			if(book.getTitle() != null)
				b1.setTitle(book.getTitle());
			repository.save(b1);
		}
//		Book b = repository.findById(id)
//				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));
	}
}
