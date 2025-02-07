import { Component } from '@angular/core';
import { JumbotronComponent } from "./jumbotron/jumbotron.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { ServicesComponent } from "./services/services.component";
import { FooterComponent } from "./footer/footer.component";
import { ProjectsComponent } from "./projects/projects.component";

@Component({
  selector: 'app-main-page',
  imports: [JumbotronComponent, AboutUsComponent, ServicesComponent, FooterComponent, ProjectsComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
