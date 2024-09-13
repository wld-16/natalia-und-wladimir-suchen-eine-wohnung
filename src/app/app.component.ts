import {Component, HostListener, inject, OnDestroy} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgOptimizedImage} from "@angular/common";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIcon} from "@angular/material/icon";
import {MatDivider} from "@angular/material/divider";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, MatGridList, MatGridTile, MatCheckbox, MatIcon, MatDivider],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy {
  title = 'natalia-und-wladimir-suchen-eine-wohnung';
  destroyed = new Subject<void>()
  currentScreenSize: string = "Unknown";

  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  public innerWidth: any;
  public jumbotronRowHeight: number = 600;
  public contentCols: number = 2;

  ngOnDestroy() {
    this.destroyed.next()
    this.destroyed.complete()
  }

  constructor() {
    inject(BreakpointObserver)
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
            console.log(this.displayNameMap.get(query))

            if(this.displayNameMap.get(query) == "XSmall") {
              this.jumbotronRowHeight = 100
              this.contentCols = 1
            } else if (this.displayNameMap.get(query) == "Small") {
              this.jumbotronRowHeight = 300
              this.contentCols = 1
            } else if (this.displayNameMap.get(query) == "Medium") {

            } else if (this.displayNameMap.get(query) == "Large") {
              this.jumbotronRowHeight = 600
              this.contentCols = 2
            } else if (this.displayNameMap.get(query) == "XLarge") {

            } else {

            }
          }
        }
      });
  }
}
