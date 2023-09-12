import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/Service/event.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-categories-tab',
  templateUrl: './categories-tab.component.html',
  styleUrls: ['./categories-tab.component.scss']
})
export class CategoriesTabComponent implements OnInit {

  categories: string[] = [];

  constructor(private eventService: EventService,   private router: Router) { }

  ngOnInit(): void {
    this.eventService.getAvailableCategories().subscribe(cats => {
      this.categories = cats;
    });
  }

  onCategorySelect(category: string) {
    this.router.navigate(['/category-events', category]);
  }

}
