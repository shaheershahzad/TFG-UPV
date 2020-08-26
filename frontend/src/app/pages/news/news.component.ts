import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public newsAvailable: boolean = false;

  constructor(public newsService: NewsService) { }

  ngOnInit(): void {
    this.getNews();
  }

  getNews(){
    this.newsService.getAllNews().subscribe(res => {
      this.newsService.news = res as News[];

      if(this.newsService.news.length > 0){
        this.newsAvailable = true;
      }else{
        this.newsAvailable = false;
      }
    });
  }

}
