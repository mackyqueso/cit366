import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document(1, 'How to Be a Better Person', 'How do you be a good person? Dont do anything stupid', null, null),
    new Document(2, 'Krusty Krab Employee Handbook', 'Remember POOP: People Order Our Patties', null, null),
    new Document(3, 'Tacos', 'Ingredients: Taco meat, taco seasoning, taco lettuce, taco cheese', null, null),
    new Document(4, 'How to Be a Better Person 2', 'Same thing; Dont do anything stupid', null, null),
  ]

  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
