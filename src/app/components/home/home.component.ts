import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { MovieService } from '../../services/movie/movie.service';
import { Movie } from '../../entities/movie';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { CategoryService } from '../../services/category/category.service';
import { StreamingService } from '../../services/streaming/streaming.service';
import { Category } from '../../entities/category';
import { Streaming } from '../../entities/streaming';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {

  constructor(private loginService: LoginService,
    private movieService: MovieService,
     ){}

  movies = new Array<Movie>();


  logout():void{    
    this.loginService.logout();
  }

  
ngOnInit(): void {
 this.listMovies();
}

listMovies(){
  this.movieService.listMovies().subscribe({
    next: (res) => {
      this.movies = res;
      console.log(this.movies);
    },
    error: (err) =>{
      alert(err);
    }
  })
}


  

}
 


