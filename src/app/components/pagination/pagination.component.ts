import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {

  @Input() totalItems: number; // how many total items there are in all pages
  @Output() goPrev = new EventEmitter<number>();
  @Output() goNext = new EventEmitter<number>();
  @Output() goPage = new EventEmitter<number>();
  currentPage = 1;
  pageSize = 10;
  totalPages: number;
  pagesArray: any[];
  endPage: number;
  startPage: number;

  ngOnChanges(): void {
    this.currentPage = 1;
    this.getPager();
  }

  /**
   * @method getPager()
   * @desc used to get page indexes.
   */
  getPager(): void {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.pagesArray = [];
    if (this.totalPages === 0) {
      this.endPage = 1;
    } else if (this.totalPages <= 5) {
      this.startPage = 1;
      this.endPage = this.totalPages;
    } else {
      if (this.currentPage <= 3) {
        this.startPage = 1;
        this.endPage = 5;
      } else if (this.currentPage + 2 >= this.totalPages) {
        this.startPage = this.currentPage - (4 - (this.totalPages - this.currentPage));
        this.endPage = this.totalPages;
        console.log(this.startPage, this.endPage);
      } else {
        this.startPage = this.currentPage - 2;
        this.endPage = this.currentPage + 2;
      }
    }
    for (let i = this.startPage; i <= this.endPage; i++) {
      this.pagesArray.push(i);
    }
  }

  /**
   * @method onPage()
   * @desc used for current page.
   * @param page: number- contains table related info like page number.
   */
  onPage(n: number): void {
    this.currentPage = n;
    this.goPage.emit(this.currentPage);
    this.getPager();
  }

  /**
   * @method onPrev()
   * @desc used to update pagination data on clicking prev page.
   */
  onPrev(): void {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
    }
    this.goPrev.emit(this.currentPage);
    this.getPager();
  }

  /**
   * @method onNext()
   * @desc used to update pagination data on clicking next page.
   */
  onNext(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.currentPage + 1;
    }
    this.goNext.emit(this.currentPage);
    this.getPager();
  }

}
