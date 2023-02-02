import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      if(params['token'] !== undefined && params['token'] === '') {
        Swal.fire('Thank you...', 'Login Successful!', 'success');
      }
    });
  }
  
}
