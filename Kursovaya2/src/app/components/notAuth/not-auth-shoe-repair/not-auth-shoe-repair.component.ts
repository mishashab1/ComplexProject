import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/Service/service.service';
import { ServiceResponse } from "../../../models/ServiceResponse";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ShoeService} from "../../../services/Shoe/shoe.service";

@Component({
  selector: 'app-not-auth-shoe-repair',
  templateUrl: './not-auth-shoe-repair.component.html',
  styleUrls: ['./not-auth-shoe-repair.component.css'],
})
export class NotAuthShoeRepairComponent implements OnInit {
  services: ServiceResponse[] = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    this.serviceService.getAllServices().subscribe(
      (response: ServiceResponse[]) => {
        this.services = response;
      },
      (error: any) => {
        console.error(error);
      },
    );
  }
}
