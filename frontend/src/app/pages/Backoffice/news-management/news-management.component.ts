import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../services/news.service';
import { News } from '../../../models/news';
import { ObjectID } from 'bson';

declare const M: any;

@Component({
  selector: 'app-news-management',
  templateUrl: './news-management.component.html',
  styleUrls: ['./news-management.component.css']
})
export class NewsManagementComponent implements OnInit {

  public newsAvailable: boolean = false;

  constructor(public newsService: NewsService) { }

  ngOnInit(): void {
    //Modals
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems);
    });

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

  addNews(form): void{

    console.log(form.value);
    let _idNews = new ObjectID().toString();
    let news = new News(_idNews, form.value.name, form.value.description, form.value.link);

    this.newsService.addNews(news).subscribe( res => {

      this.clearForm(form);
      M.toast({html: "Noticia creada"});
      this.getNews();

    }, ( err => {
      console.log("Error al crear la noticia.");
    }));

  }

  viewNewsDetails(news: News) {
    this.setNewsInfo(news);
  }

  editNews(form, news: News) {
    this.setFormValues(form, news);
  }

  updateNews(form) {

    console.log(form.value);
    this.newsService.updateNews(form.value).subscribe( res => {

      this.clearForm(form);
      M.toast({html: "Noticia actualizada"});
      this.getNews();
      
    }, ( err => {
      console.log("Error al actualizar los datos de la noticia.");
    }));

  }

  setNewsInfo(news: News){
    (<HTMLInputElement> document.getElementById("nameDetail")).innerHTML = news.name.toString();
    (<HTMLInputElement> document.getElementById("descriptionDetail")).innerHTML = news.description.toString();
    (<HTMLInputElement> document.getElementById("linkDetail")).innerHTML = news.link.toString();
    (<HTMLInputElement> document.getElementById("dateDetail")).innerHTML = news.name.toString();
  }

  showDeleteNewsConfirmation(id: string, name: string) {
    (<HTMLInputElement>document.querySelector('#newsID')).value = id;
    (<HTMLInputElement>document.querySelector('#newsNameDelete')).innerText = name;
    document.getElementById("deleteNewsAction").click();
  }

  deleteNews() {

    let newsId = (<HTMLInputElement>document.querySelector('#newsID')).value;
    this.newsService.deleteNews(newsId).subscribe( res => {

        M.toast({html: "Noticia borrada"});
        this.getNews(); 

    }, ( err => {
      console.log("Error al borrar la noticia.");
    }));

  }

  clearForm(form) {
    form.resetForm();
    this.newsService.selectedNews = new News();
    this.getNews();
  }

  setFormValues(form, news: News){
    form.resetForm();
    form.setValue({
      _id: news._id,
      name: news.name,
      description: news.description,
      link: news.link
    });
  }

}
