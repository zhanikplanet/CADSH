import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-projects',
  imports: [CardModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  items=[
    {
      imgSrc:'/assets/img/logo1.jpg',
      alt:'',
      title:'test',
      text:'dcfvgbhnjdrctfvygbunidEfyuhbjfwesdyubhjaewfsduyhbjwedsuiljefKDujF'
    },
    {
      imgSrc:'/assets/img/logo1.jpg',
      alt:'',
      title:'test 2',
      text:'wsexrcdvtbgyuhnjimok,p-y[p8olgudiWVJGJHOblUGK'
    },
    {
      imgSrc:'/assets/img/logo1.jpg',
      alt:'',
      title:'test 3',
      text:'sxdctfvyyfuezjbnmzbjhsuddhjbc,nJKHGFJVBsJFgHVsbjJUFGbj'
    }
  ]
}
