import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { News } from '../models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  readonly newsAPI = "http://localhost:3000/api/news";
  //readonly newsAPI = "/api/news";
  selectedNews: News;
  news: News[];

  constructor(private httpClient: HttpClient) {
    this.selectedNews = new News();
  }

  getAllNews(){
    return this.httpClient.get(this.newsAPI);
  }

  addNews(news: News){
    return this.httpClient.post(this.newsAPI, news);
  }

  updateNews(news: News){
    return this.httpClient.put(this.newsAPI + `/${news._id}`, news);
  }

  deleteNews(_id: String){
    return this.httpClient.delete(this.newsAPI + `/${_id}`);
  }

  getNewsDetails(_id: String){
    return this.httpClient.get(this.newsAPI + `/news-details/${_id}`);
  }
}
