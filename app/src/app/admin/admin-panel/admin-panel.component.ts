import { Component, OnInit } from '@angular/core';
import { DatabaseAdminService } from 'src/app/services/database-admin.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private dbAdmin: DatabaseAdminService) { }

  ngOnInit(): void {
  }

}
